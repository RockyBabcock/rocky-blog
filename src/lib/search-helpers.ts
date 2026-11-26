/**
 * Pure helper utilities for Pagefind search filtering, excerpt parsing, and metadata formatting.
 */

export interface SearchFiltersState {
  category: string | null;
  tag: string | null;
  language: string | null;
}

export interface ExcerptSegment {
  text: string;
  highlighted: boolean;
}

/**
 * Convert UI filter state into the Pagefind `filters` query object.
 * Returns `undefined` when no filters are active.
 */
export function buildPagefindFilters(state: SearchFiltersState): Record<string, string[]> | undefined {
  const filters: Record<string, string[]> = {};
  if (state.category) filters.category = [state.category];
  if (state.tag) filters.tag = [state.tag];
  if (state.language) filters.language = [state.language];
  return Object.keys(filters).length > 0 ? filters : undefined;
}

/** Count how many filter facets are currently active. */
export function countActiveFilters(state: SearchFiltersState): number {
  return Number(Boolean(state.category)) + Number(Boolean(state.tag)) + Number(Boolean(state.language));
}

/**
 * Safely parse a Pagefind HTML excerpt containing `<mark>...</mark>` into plain React-safe segments.
 * Strips all other HTML tags and decodes basic HTML entities without using `dangerouslySetInnerHTML`.
 */
export function parseHighlightedExcerpt(rawExcerpt: string): ExcerptSegment[] {
  if (!rawExcerpt) return [];

  const decodeEntities = (input: string) =>
    input
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;', "'")
      .replaceAll('&#x27;', "'");

  const segments: ExcerptSegment[] = [];
  const regex = /<mark>([\s\S]*?)<\/mark>/gi;
  let lastIndex = 0;

  for (const match of rawExcerpt.matchAll(regex)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      const plain = decodeEntities(rawExcerpt.slice(lastIndex, start).replace(/<[^>]+>/g, ''));
      if (plain) segments.push({ text: plain, highlighted: false });
    }
    const inner = decodeEntities((match[1] ?? '').replace(/<[^>]+>/g, ''));
    if (inner) segments.push({ text: inner, highlighted: true });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < rawExcerpt.length) {
    const tail = decodeEntities(rawExcerpt.slice(lastIndex).replace(/<[^>]+>/g, ''));
    if (tail) segments.push({ text: tail, highlighted: false });
  }

  return segments;
}

/** Parse comma-separated tag metadata into a clean, deduplicated array. */
export function parseMetaList(raw: string | undefined): string[] {
  if (!raw) return [];
  return [
    ...new Set(
      raw
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

/** Sort facet entries by count descending, then alphabetically. */
export function sortFacetEntries(facet: Record<string, number> | undefined, limit = 16): [string, number][] {
  if (!facet) return [];
  return Object.entries(facet)
    .filter(([key, count]) => key.trim().length > 0 && count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit);
}
