/**
 * Local Reading History — Pure schema, validation, and list transformations.
 *
 * Stored exclusively in browser localStorage under a versioned key.
 * Privacy invariant: NEVER persists article body text or decrypted content.
 */

export const READING_HISTORY_STORAGE_KEY = 'rocky-blog:reading-history:v1';
export const READING_HISTORY_VERSION = 1;
export const READING_HISTORY_MAX_ITEMS = 30;
/** Minimum reading progress (%) required to consider an article completed. */
export const READING_COMPLETED_THRESHOLD = 85;

export interface ReadingHistoryEntry {
  /** Locale-free canonical post slug (e.g., 'tools/getting-started' or 'getting-started') */
  slug: string;
  /** Localized URL path last visited (e.g., '/post/getting-started' or '/en/post/getting-started') */
  url: string;
  /** Display title at time of visit */
  title: string;
  /** Locale code active when read */
  locale: string;
  /** Optional display category */
  category?: string;
  /** Reading progress percentage in [0, 100] */
  progress: number;
  /** Last known scrollY position in pixels (>= 0) */
  scrollY: number;
  /** Epoch milliseconds of most recent read/update */
  lastReadAt: number;
  /** Whether the post is password-encrypted (metadata only; body never stored) */
  isEncrypted?: boolean;
}

export interface ReadingHistoryPayload {
  version: number;
  entries: ReadingHistoryEntry[];
}

export interface UpsertHistoryInput {
  slug: string;
  url: string;
  title: string;
  locale: string;
  category?: string;
  progress?: number;
  scrollY?: number;
  isEncrypted?: boolean;
  now?: number;
}

/** Clamp a numeric progress percentage to an integer in [0, 100]. */
export function clampProgress(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** Clamp scrollY to a non-negative integer. */
export function clampScrollY(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.round(value));
}

/** Compute scroll reading progress percentage [0, 100] from scroll metrics. */
export function calculateScrollProgress(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  if (!Number.isFinite(scrollY) || !Number.isFinite(scrollHeight) || !Number.isFinite(viewportHeight)) {
    return 0;
  }
  const scrollable = scrollHeight - viewportHeight;
  if (scrollable <= 0) {
    // Very short page that fits entirely in viewport: count as progress only after slight scroll or non-zero viewport
    return scrollY > 0 ? 100 : 0;
  }
  return clampProgress((Math.max(0, scrollY) / scrollable) * 100);
}

/** Whether a reading history entry meets the completion threshold. */
export function isEntryCompleted(entry: Pick<ReadingHistoryEntry, 'progress'>): boolean {
  return clampProgress(entry.progress) >= READING_COMPLETED_THRESHOLD;
}

function isValidEntry(raw: unknown): raw is ReadingHistoryEntry {
  if (typeof raw !== 'object' || raw === null) return false;
  const candidate = raw as Record<string, unknown>;
  return (
    typeof candidate.slug === 'string' &&
    candidate.slug.trim().length > 0 &&
    typeof candidate.url === 'string' &&
    candidate.url.startsWith('/') &&
    typeof candidate.title === 'string' &&
    candidate.title.trim().length > 0 &&
    typeof candidate.locale === 'string' &&
    candidate.locale.trim().length > 0 &&
    typeof candidate.lastReadAt === 'number' &&
    Number.isFinite(candidate.lastReadAt) &&
    candidate.lastReadAt > 0
  );
}

function normalizeEntry(raw: ReadingHistoryEntry): ReadingHistoryEntry {
  return {
    slug: raw.slug.trim(),
    url: raw.url.trim(),
    title: raw.title.trim().slice(0, 200),
    locale: raw.locale.trim(),
    ...(typeof raw.category === 'string' && raw.category.trim() ? { category: raw.category.trim().slice(0, 80) } : {}),
    progress: clampProgress(raw.progress),
    scrollY: clampScrollY(raw.scrollY),
    lastReadAt: Math.round(raw.lastReadAt),
    ...(raw.isEncrypted ? { isEncrypted: true } : {}),
  };
}

/**
 * Safely parse and validate serialized reading history JSON.
 * Gracefully recovers to an empty array on corrupted JSON, wrong version, or malformed entries.
 */
export function parseReadingHistory(raw: string | null | undefined): ReadingHistoryEntry[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return [];
    const payload = parsed as Partial<ReadingHistoryPayload>;
    if (payload.version !== READING_HISTORY_VERSION || !Array.isArray(payload.entries)) return [];

    const seen = new Set<string>();
    const valid: ReadingHistoryEntry[] = [];
    for (const item of payload.entries) {
      if (!isValidEntry(item)) continue;
      const normalized = normalizeEntry(item);
      if (seen.has(normalized.slug)) continue;
      seen.add(normalized.slug);
      valid.push(normalized);
    }

    return valid.sort((a, b) => b.lastReadAt - a.lastReadAt).slice(0, READING_HISTORY_MAX_ITEMS);
  } catch {
    return [];
  }
}

/** Serialize reading history entries with schema version wrapper. */
export function serializeReadingHistory(entries: ReadingHistoryEntry[]): string {
  const payload: ReadingHistoryPayload = {
    version: READING_HISTORY_VERSION,
    entries: entries.slice(0, READING_HISTORY_MAX_ITEMS),
  };
  return JSON.stringify(payload);
}

/**
 * Insert or update a reading history entry by canonical `slug`.
 * Preserves the highest reached progress for completion continuity while updating latest scrollY & timestamp.
 */
export function upsertReadingHistory(
  entries: ReadingHistoryEntry[],
  input: UpsertHistoryInput,
  maxItems: number = READING_HISTORY_MAX_ITEMS,
): ReadingHistoryEntry[] {
  const slug = input.slug.trim();
  const title = input.title.trim();
  if (!slug || !title || !input.url.startsWith('/')) return entries;

  const existing = entries.find((item) => item.slug === slug);
  const nextProgress = Math.max(existing?.progress ?? 0, clampProgress(input.progress ?? existing?.progress ?? 0));
  const nextScrollY = input.scrollY !== undefined ? clampScrollY(input.scrollY) : (existing?.scrollY ?? 0);
  const updated: ReadingHistoryEntry = normalizeEntry({
    slug,
    url: input.url,
    title,
    locale: input.locale,
    category: input.category ?? existing?.category,
    progress: nextProgress,
    scrollY: nextScrollY,
    lastReadAt: input.now ?? Date.now(),
    isEncrypted: input.isEncrypted ?? existing?.isEncrypted,
  });

  const rest = entries.filter((item) => item.slug !== slug);
  return [updated, ...rest].sort((a, b) => b.lastReadAt - a.lastReadAt).slice(0, Math.max(1, maxItems));
}

/** Remove a single entry by canonical slug. */
export function removeReadingHistoryEntry(entries: ReadingHistoryEntry[], slug: string): ReadingHistoryEntry[] {
  return entries.filter((item) => item.slug !== slug);
}

/** Format a human-friendly relative time token for a history timestamp. */
export function getRelativeTimeToken(
  lastReadAt: number,
  now: number = Date.now(),
): { key: 'history.justNow' | 'history.minutesAgo' | 'history.hoursAgo' | 'history.daysAgo'; count?: number } {
  const diffMs = Math.max(0, now - lastReadAt);
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return { key: 'history.justNow' };
  if (minutes < 60) return { key: 'history.minutesAgo', count: minutes };
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return { key: 'history.hoursAgo', count: hours };
  const days = Math.floor(hours / 24);
  return { key: 'history.daysAgo', count: days };
}
