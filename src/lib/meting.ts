/**
 * Meting API client & direct audio URL resolver for in-article AudioPlayer.
 *
 * Parses NetEase / QQ Music / Kugou / Xiami / Baidu music URLs via Meting API
 * (with fallback endpoints and in-memory caching), while also supporting
 * direct HTML5 audio URLs and grouped playlists from `{% media audio %}` tags.
 */

export type MetingServer = 'netease' | 'tencent' | 'kugou' | 'xiami' | 'baidu';
export type MetingType = 'song' | 'playlist' | 'album' | 'artist';

export interface MetingSong {
  name: string;
  artist: string;
  url: string;
  pic: string;
  lrc: string;
}

export interface MetingReference {
  server: MetingServer;
  type: MetingType;
  id: string;
}

export interface AudioPlaylistGroup {
  title: string;
  startIndex: number;
  count: number;
}

export interface ResolvedAudioData {
  songs: MetingSong[];
  groups: AudioPlaylistGroup[];
}

export const DEFAULT_METING_APIS = [
  'https://api.injahow.cn/meting/?type=:type&id=:id&server=:server',
  'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id',
];

const DIRECT_AUDIO_EXT_RE = /\.(?:mp3|m4a|ogg|oga|opus|wav|flac|aac|webm)(?:$|[?#])/i;
const REQUEST_TIMEOUT_MS = 8000;
const responseCache = new Map<string, MetingSong[]>();

/** Parse a NetEase / QQ Music / Kugou / Xiami / Baidu URL into a Meting reference. */
export function parseMetingUrl(rawUrl: string): MetingReference | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // NetEase Cloud Music: https://music.163.com/#/playlist?id=123 or /song?id=123
  const neteaseMatch = trimmed.match(/music\.163\.com\/(?:#\/)?(song|playlist|album|artist)\?[^#]*\bid=(\d+)/i);
  if (neteaseMatch) {
    return {
      server: 'netease',
      type: neteaseMatch[1].toLowerCase() as MetingType,
      id: neteaseMatch[2],
    };
  }

  // QQ Music (y.qq.com)
  const qqMatch = trimmed.match(
    /y\.qq\.com\/n\/(?:ryqq|yqq)\/(songDetail|playlist|albumDetail|singer)\/([a-zA-Z0-9]+)/i,
  );
  if (qqMatch) {
    const rawType = qqMatch[1].toLowerCase();
    const type: MetingType =
      rawType === 'songdetail'
        ? 'song'
        : rawType === 'albumdetail'
          ? 'album'
          : rawType === 'singer'
            ? 'artist'
            : 'playlist';
    return { server: 'tencent', type, id: qqMatch[2] };
  }

  return null;
}

/** Check whether a URL is a direct HTML5 audio resource. */
export function isDirectAudioUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed || parseMetingUrl(trimmed)) return false;

  if (trimmed.startsWith('/')) {
    return !trimmed.startsWith('//') && DIRECT_AUDIO_EXT_RE.test(trimmed);
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    return DIRECT_AUDIO_EXT_RE.test(`${parsed.pathname}${parsed.search}`);
  } catch {
    return false;
  }
}

/** Derive a human-readable track title from an audio URL filename. */
export function deriveTrackName(rawUrl: string): string {
  try {
    const parsed = rawUrl.startsWith('/') ? new URL(rawUrl, 'https://localhost') : new URL(rawUrl);
    const segment = parsed.pathname.split('/').filter(Boolean).pop() ?? '';
    const decoded = decodeURIComponent(segment).replace(/\.[a-z0-9]+$/i, '');
    return decoded || rawUrl;
  } catch {
    return rawUrl;
  }
}

/** Build a Meting request URL from a template. */
export function buildMetingApiUrl(template: string, ref: MetingReference): string {
  return template
    .replace(':server', encodeURIComponent(ref.server))
    .replace(':type', encodeURIComponent(ref.type))
    .replace(':id', encodeURIComponent(ref.id));
}

function normalizeMetingItem(raw: unknown): MetingSong | null {
  if (!raw || typeof raw !== 'object') return null;
  const item = raw as Record<string, unknown>;
  const url = typeof item.url === 'string' ? item.url.trim() : '';
  if (!url) return null;

  const name =
    (typeof item.name === 'string' && item.name.trim()) ||
    (typeof item.title === 'string' && item.title.trim()) ||
    deriveTrackName(url);
  const artist =
    (typeof item.artist === 'string' && item.artist.trim()) ||
    (typeof item.author === 'string' && item.author.trim()) ||
    '';
  const pic = typeof item.pic === 'string' ? item.pic.trim() : '';
  const lrc = typeof item.lrc === 'string' ? item.lrc.trim() : '';

  return { name, artist, url, pic, lrc };
}

/** Fetch song list from Meting API with endpoint fallback and in-memory cache. */
export async function fetchMetingSongs(
  ref: MetingReference,
  options?: { apis?: string[]; fetchImpl?: typeof fetch; signal?: AbortSignal },
): Promise<MetingSong[]> {
  const cacheKey = `${ref.server}:${ref.type}:${ref.id}`;
  const cached = responseCache.get(cacheKey);
  if (cached) return cached;

  const apis = options?.apis && options.apis.length > 0 ? options.apis : DEFAULT_METING_APIS;
  const fetchFn = options?.fetchImpl ?? fetch;
  let lastError: Error | null = null;

  for (const template of apis) {
    const endpoint = buildMetingApiUrl(template, ref);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const onExternalAbort = () => controller.abort();
    options?.signal?.addEventListener('abort', onExternalAbort, { once: true });

    try {
      const response = await fetchFn(endpoint, { signal: controller.signal });
      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status}`);
        continue;
      }
      const data: unknown = await response.json();
      const rawList = Array.isArray(data) ? data : [data];
      const songs = rawList.map(normalizeMetingItem).filter((s): s is MetingSong => s !== null);
      if (songs.length > 0) {
        responseCache.set(cacheKey, songs);
        return songs;
      }
      lastError = new Error('Empty Meting response');
    } catch (error) {
      if (options?.signal?.aborted) {
        throw error;
      }
      lastError = error instanceof Error ? error : new Error(String(error));
    } finally {
      clearTimeout(timer);
      options?.signal?.removeEventListener('abort', onExternalAbort);
    }
  }

  throw lastError ?? new Error('Failed to load Meting audio source');
}

export function clearMetingCache(): void {
  responseCache.clear();
}

interface RawMediaObject {
  title?: unknown;
  name?: unknown;
  artist?: unknown;
  author?: unknown;
  url?: unknown;
  pic?: unknown;
  cover?: unknown;
  lrc?: unknown;
  list?: unknown;
}

async function resolveSingleEntry(
  entry: unknown,
  options?: { apis?: string[]; fetchImpl?: typeof fetch; signal?: AbortSignal },
): Promise<MetingSong[]> {
  if (typeof entry === 'string') {
    const trimmed = entry.trim();
    const metingRef = parseMetingUrl(trimmed);
    if (metingRef) {
      return fetchMetingSongs(metingRef, options);
    }
    if (isDirectAudioUrl(trimmed)) {
      return [{ name: deriveTrackName(trimmed), artist: '', url: trimmed, pic: '', lrc: '' }];
    }
    return [];
  }

  if (!entry || typeof entry !== 'object') return [];
  const obj = entry as RawMediaObject;
  const rawUrl = typeof obj.url === 'string' ? obj.url.trim() : '';
  if (!rawUrl) return [];

  const metingRef = parseMetingUrl(rawUrl);
  if (metingRef) {
    const resolved = await fetchMetingSongs(metingRef, options);
    const customName = typeof obj.name === 'string' && obj.name.trim() ? obj.name.trim() : '';
    const customArtist =
      (typeof obj.artist === 'string' && obj.artist.trim()) ||
      (typeof obj.author === 'string' && obj.author.trim()) ||
      '';
    if (resolved.length === 1 && (customName || customArtist)) {
      return [
        {
          ...resolved[0],
          name: customName || resolved[0].name,
          artist: customArtist || resolved[0].artist,
        },
      ];
    }
    return resolved;
  }

  if (!isDirectAudioUrl(rawUrl)) return [];

  const name =
    (typeof obj.name === 'string' && obj.name.trim()) ||
    (typeof obj.title === 'string' && obj.title.trim()) ||
    deriveTrackName(rawUrl);
  const artist =
    (typeof obj.artist === 'string' && obj.artist.trim()) ||
    (typeof obj.author === 'string' && obj.author.trim()) ||
    '';
  const pic =
    (typeof obj.pic === 'string' && obj.pic.trim()) || (typeof obj.cover === 'string' && obj.cover.trim()) || '';
  const lrc = typeof obj.lrc === 'string' ? obj.lrc.trim() : '';

  return [{ name, artist, url: rawUrl, pic, lrc }];
}

/**
 * Resolve the JSON payload serialized in `[data-audio-player][data-src]`
 * into flat playable tracks plus playlist tab groups.
 */
export async function resolveAudioPlaylist(
  rawJson: string | undefined,
  options?: { apis?: string[]; fetchImpl?: typeof fetch; signal?: AbortSignal },
): Promise<ResolvedAudioData> {
  if (!rawJson) return { songs: [], groups: [] };

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { songs: [], groups: [] };
  }

  const items = Array.isArray(parsed) ? parsed : [parsed];
  const songs: MetingSong[] = [];
  const groups: AudioPlaylistGroup[] = [];

  for (const item of items) {
    if (item && typeof item === 'object' && Array.isArray((item as RawMediaObject).list)) {
      const groupObj = item as RawMediaObject;
      const title = typeof groupObj.title === 'string' ? groupObj.title.trim() : '';
      const startIndex = songs.length;

      for (const child of groupObj.list as unknown[]) {
        const resolved = await resolveSingleEntry(child, options);
        songs.push(...resolved);
      }

      const count = songs.length - startIndex;
      if (count > 0) {
        groups.push({ title, startIndex, count });
      }
      continue;
    }

    const resolved = await resolveSingleEntry(item, options);
    songs.push(...resolved);
  }

  if (groups.length === 0 && songs.length > 0) {
    groups.push({ title: '', startIndex: 0, count: songs.length });
  }

  return { songs, groups };
}
