/**
 * Pure parser for in-article HTML5 audio player track definitions.
 *
 * Supports direct audio URLs (http/https or site-relative `/...`) in either
 * flat track items or titled groups, without relying on third-party playlist APIs.
 */

export interface AudioTrack {
  name: string;
  artist: string;
  url: string;
  pic?: string;
  lrc?: string;
}

export interface AudioPlaylistGroup {
  title?: string;
  startIndex: number;
  count: number;
}

export interface RawAudioInputGroup {
  title?: string;
  list?: unknown[];
  name?: string;
  artist?: string;
  url?: string;
  pic?: string;
  lrc?: string;
}

const STREAMING_PAGE_HOSTS = new Set(['music.163.com', 'y.music.163.com', 'y.qq.com', 'i.y.qq.com']);

/** Allow only safe http(s) or root-relative URLs, excluding third-party playlist web pages. */
export function isDirectAudioUrl(raw: unknown): raw is string {
  if (typeof raw !== 'string') return false;
  const trimmed = raw.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    if (STREAMING_PAGE_HOSTS.has(parsed.hostname.toLowerCase())) return false;
    return true;
  } catch {
    return false;
  }
}

/** Allow only safe http(s) or root-relative asset URLs for cover art or LRC files. */
export function sanitizeMediaAssetUrl(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return trimmed;
  } catch {
    return undefined;
  }
  return undefined;
}

/** Derive a human-readable track title from an audio URL when none is provided. */
export function deriveTrackNameFromUrl(url: string): string {
  const clean = url.split(/[?#]/, 1)[0] ?? '';
  const segment = clean.split('/').filter(Boolean).at(-1) ?? '';
  if (!segment) return 'Audio';
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    // Keep raw segment if percent-encoding is malformed.
  }
  return decoded.replace(/\.[a-z0-9]{1,5}$/i, '') || decoded;
}

function normalizeTrackItem(raw: unknown): AudioTrack | null {
  if (typeof raw === 'string') {
    if (!isDirectAudioUrl(raw)) return null;
    const url = raw.trim();
    return {
      name: deriveTrackNameFromUrl(url),
      artist: '',
      url,
    };
  }
  if (!raw || typeof raw !== 'object') return null;
  const item = raw as Record<string, unknown>;
  if (!isDirectAudioUrl(item.url)) return null;
  const url = item.url.trim();
  const name = typeof item.name === 'string' && item.name.trim() ? item.name.trim() : deriveTrackNameFromUrl(url);
  const artist = typeof item.artist === 'string' ? item.artist.trim() : '';
  const pic = sanitizeMediaAssetUrl(item.pic);
  const lrc =
    typeof item.lrc === 'string' && item.lrc.trim()
      ? item.lrc.trim().startsWith('[')
        ? item.lrc
        : sanitizeMediaAssetUrl(item.lrc)
      : undefined;
  return {
    name,
    artist,
    url,
    ...(pic ? { pic } : {}),
    ...(lrc ? { lrc } : {}),
  };
}

/** Parse `data-src` JSON from `<div data-audio-player data-src="...">` into tracks and groups. */
export function parseAudioTracksFromJson(rawJson: string | undefined | null): {
  tracks: AudioTrack[];
  groups: AudioPlaylistGroup[];
} {
  if (!rawJson) return { tracks: [], groups: [] };
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { tracks: [], groups: [] };
  }
  if (!Array.isArray(parsed)) return { tracks: [], groups: [] };

  const tracks: AudioTrack[] = [];
  const groups: AudioPlaylistGroup[] = [];

  for (const entry of parsed as RawAudioInputGroup[]) {
    if (!entry || typeof entry !== 'object') continue;
    if (Array.isArray(entry.list)) {
      const startIndex = tracks.length;
      for (const item of entry.list) {
        const track = normalizeTrackItem(item);
        if (track) tracks.push(track);
      }
      const count = tracks.length - startIndex;
      if (count > 0) {
        groups.push({
          title: typeof entry.title === 'string' && entry.title.trim() ? entry.title.trim() : undefined,
          startIndex,
          count,
        });
      }
    } else {
      const track = normalizeTrackItem(entry);
      if (track) {
        const startIndex = tracks.length;
        tracks.push(track);
        groups.push({
          title: typeof entry.title === 'string' && entry.title.trim() ? entry.title.trim() : undefined,
          startIndex,
          count: 1,
        });
      }
    }
  }

  return { tracks, groups };
}
