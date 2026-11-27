/**
 * Personal Reading Shelf — Pure schema, validation, status derivation, and filtering helpers.
 *
 * Stored exclusively in browser localStorage under a versioned key.
 * Privacy invariant: NEVER persists article body text or decrypted content, and never sends
 * saved data to any external server.
 */

import { isEntryCompleted, type ReadingHistoryEntry } from '@lib/reading-history';

export const SAVED_ARTICLES_STORAGE_KEY = 'rocky-blog:saved-articles:v1';
export const SAVED_ARTICLES_VERSION = 1;
export const SAVED_ARTICLES_MAX_ITEMS = 120;

export type SavedReadingStatus = 'to-read' | 'in-progress' | 'completed';
export type ShelfFilterStatus = 'all' | SavedReadingStatus;
export type ShelfSortOrder = 'saved-desc' | 'saved-asc' | 'title-asc';

export interface SavedArticleEntry {
  /** Locale-free canonical post slug */
  slug: string;
  /** Display title at time of saving */
  title: string;
  /** Localized URL path (e.g., '/post/foo' or '/en/post/foo') */
  url: string;
  /** Locale code of the saved entry */
  locale: string;
  /** Epoch milliseconds when saved */
  savedAt: number;
  /** Optional display category */
  category?: string;
  /** Optional concise description */
  description?: string;
  /** Optional cover image path */
  cover?: string;
  /** Optional original publication date string (ISO yyyy-MM-dd) */
  publishedAt?: string;
  /** Optional formatted reading time (e.g., '6 min read') */
  readingTime?: string;
}

export interface SaveArticleInput {
  slug: string;
  title: string;
  url: string;
  locale: string;
  category?: string;
  description?: string;
  cover?: string;
  publishedAt?: string;
  readingTime?: string;
  now?: number;
}

export interface SavedArticlesPayload {
  version: number;
  entries: SavedArticleEntry[];
}

export interface EnrichedSavedArticle extends SavedArticleEntry {
  status: SavedReadingStatus;
  progress: number;
  scrollY: number;
  lastReadAt?: number;
}

/** Stable composite identity distinguishing localized variants of the same post slug. */
export function getSavedArticleKey(slug: string, locale: string): string {
  return `${locale.trim()}:${slug.trim()}`;
}

function isSafePath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');
}

function isValidCover(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return (trimmed.startsWith('/') && !trimmed.startsWith('//')) || trimmed.startsWith('https://');
}

function isValidSavedEntry(raw: unknown): raw is SavedArticleEntry {
  if (typeof raw !== 'object' || raw === null) return false;
  const candidate = raw as Record<string, unknown>;
  return (
    typeof candidate.slug === 'string' &&
    candidate.slug.trim().length > 0 &&
    typeof candidate.title === 'string' &&
    candidate.title.trim().length > 0 &&
    isSafePath(candidate.url) &&
    typeof candidate.locale === 'string' &&
    candidate.locale.trim().length > 0 &&
    typeof candidate.savedAt === 'number' &&
    Number.isFinite(candidate.savedAt) &&
    candidate.savedAt > 0
  );
}

function normalizeSavedEntry(raw: SavedArticleEntry): SavedArticleEntry {
  const category = typeof raw.category === 'string' && raw.category.trim() ? raw.category.trim().slice(0, 80) : undefined;
  const description =
    typeof raw.description === 'string' && raw.description.trim() ? raw.description.trim().slice(0, 260) : undefined;
  const cover = isValidCover(raw.cover) ? raw.cover.trim().slice(0, 300) : undefined;
  const publishedAt =
    typeof raw.publishedAt === 'string' && raw.publishedAt.trim() ? raw.publishedAt.trim().slice(0, 40) : undefined;
  const readingTime =
    typeof raw.readingTime === 'string' && raw.readingTime.trim() ? raw.readingTime.trim().slice(0, 40) : undefined;

  return {
    slug: raw.slug.trim(),
    title: raw.title.trim().slice(0, 200),
    url: raw.url.trim(),
    locale: raw.locale.trim(),
    savedAt: Math.round(raw.savedAt),
    ...(category ? { category } : {}),
    ...(description ? { description } : {}),
    ...(cover ? { cover } : {}),
    ...(publishedAt ? { publishedAt } : {}),
    ...(readingTime ? { readingTime } : {}),
  };
}

/**
 * Safely parse and validate serialized Reading Shelf JSON.
 * Gracefully recovers to an empty list on corrupted JSON, mismatched version, or invalid items.
 */
export function parseSavedArticles(raw: string | null | undefined): SavedArticleEntry[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return [];
    const payload = parsed as Partial<SavedArticlesPayload>;
    if (payload.version !== SAVED_ARTICLES_VERSION || !Array.isArray(payload.entries)) return [];

    const seen = new Set<string>();
    const valid: SavedArticleEntry[] = [];
    for (const item of payload.entries) {
      if (!isValidSavedEntry(item)) continue;
      const normalized = normalizeSavedEntry(item);
      const key = getSavedArticleKey(normalized.slug, normalized.locale);
      if (seen.has(key)) continue;
      seen.add(key);
      valid.push(normalized);
    }

    return valid.sort((a, b) => b.savedAt - a.savedAt).slice(0, SAVED_ARTICLES_MAX_ITEMS);
  } catch {
    return [];
  }
}

/** Serialize saved articles with schema version wrapper. */
export function serializeSavedArticles(entries: SavedArticleEntry[]): string {
  const payload: SavedArticlesPayload = {
    version: SAVED_ARTICLES_VERSION,
    entries: entries.slice(0, SAVED_ARTICLES_MAX_ITEMS),
  };
  return JSON.stringify(payload);
}

/** Check whether a specific localized article is currently saved. */
export function isArticleSaved(entries: readonly SavedArticleEntry[], slug: string, locale: string): boolean {
  const targetKey = getSavedArticleKey(slug, locale);
  return entries.some((item) => getSavedArticleKey(item.slug, item.locale) === targetKey);
}

/** Toggle an article in the Reading Shelf (adds when absent, removes when present). */
export function toggleSavedArticle(
  entries: readonly SavedArticleEntry[],
  input: SaveArticleInput,
  maxItems: number = SAVED_ARTICLES_MAX_ITEMS,
): { entries: SavedArticleEntry[]; saved: boolean } {
  const slug = input.slug.trim();
  const title = input.title.trim();
  const locale = input.locale.trim();
  if (!slug || !title || !locale || !isSafePath(input.url)) {
    return { entries: [...entries], saved: false };
  }

  const targetKey = getSavedArticleKey(slug, locale);
  if (entries.some((item) => getSavedArticleKey(item.slug, item.locale) === targetKey)) {
    return {
      entries: entries.filter((item) => getSavedArticleKey(item.slug, item.locale) !== targetKey),
      saved: false,
    };
  }

  const nextEntry = normalizeSavedEntry({
    slug,
    title,
    url: input.url,
    locale,
    savedAt: input.now ?? Date.now(),
    category: input.category,
    description: input.description,
    cover: input.cover,
    publishedAt: input.publishedAt,
    readingTime: input.readingTime,
  });

  const next = [nextEntry, ...entries].sort((a, b) => b.savedAt - a.savedAt).slice(0, Math.max(1, maxItems));
  return { entries: next, saved: true };
}

/** Remove one saved entry by slug and locale. */
export function removeSavedArticle(entries: readonly SavedArticleEntry[], slug: string, locale: string): SavedArticleEntry[] {
  const targetKey = getSavedArticleKey(slug, locale);
  return entries.filter((item) => getSavedArticleKey(item.slug, item.locale) !== targetKey);
}

/**
 * Derive Reading Shelf status solely from existing Reading History progress.
 * Never creates or mutates duplicate reading-progress state.
 */
export function deriveSavedArticleStatus(historyEntry: Pick<ReadingHistoryEntry, 'progress'> | undefined): SavedReadingStatus {
  if (!historyEntry || historyEntry.progress <= 0) return 'to-read';
  if (isEntryCompleted(historyEntry)) return 'completed';
  return 'in-progress';
}

/** Merge saved articles with live Reading History entries without duplicating progress data. */
export function enrichSavedArticles(
  saved: readonly SavedArticleEntry[],
  history: readonly ReadingHistoryEntry[],
): EnrichedSavedArticle[] {
  const historyBySlug = new Map<string, ReadingHistoryEntry>();
  for (const item of history) {
    if (!historyBySlug.has(item.slug)) {
      historyBySlug.set(item.slug, item);
    }
  }

  return saved.map((item) => {
    const record = historyBySlug.get(item.slug);
    return {
      ...item,
      status: deriveSavedArticleStatus(record),
      progress: record?.progress ?? 0,
      scrollY: record?.scrollY ?? 0,
      ...(record ? { lastReadAt: record.lastReadAt } : {}),
    };
  });
}

/** Count entries in each Reading Shelf status bucket. */
export function countShelfStatuses(items: readonly EnrichedSavedArticle[]): Record<ShelfFilterStatus, number> {
  const counts: Record<ShelfFilterStatus, number> = {
    all: items.length,
    'to-read': 0,
    'in-progress': 0,
    completed: 0,
  };
  for (const item of items) {
    counts[item.status] += 1;
  }
  return counts;
}

/** Filter enriched shelf items by reading status + search query and sort deterministically. */
export function filterAndSortSavedArticles(
  items: readonly EnrichedSavedArticle[],
  options: { status: ShelfFilterStatus; query: string; sort: ShelfSortOrder; locale?: string },
): EnrichedSavedArticle[] {
  const { status, query, sort, locale = 'zh' } = options;
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const filtered = items.filter((item) => {
    if (status !== 'all' && item.status !== status) return false;
    if (tokens.length === 0) return true;
    const haystack = `${item.title} ${item.category ?? ''} ${item.description ?? ''} ${item.slug}`.toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });

  const sorted = [...filtered];
  if (sort === 'saved-desc') {
    sorted.sort((a, b) => b.savedAt - a.savedAt);
  } else if (sort === 'saved-asc') {
    sorted.sort((a, b) => a.savedAt - b.savedAt);
  } else {
    sorted.sort((a, b) => a.title.localeCompare(b.title, locale));
  }
  return sorted;
}
