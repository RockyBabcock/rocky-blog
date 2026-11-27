/**
 * Pure matching & ordering helpers for lightweight in-page collection controls
 * (Archives and Category pages): instant text filter + Newest/Oldest sort.
 */

export type CollectionSortDirection = 'newest' | 'oldest';

export interface FilterableRowMeta {
  filterKey?: string;
  searchText: string;
}

/** Check whether a row matches both the optional category sub-filter and multi-token search query. */
export function matchesCollectionFilter(row: FilterableRowMeta, categoryKey: string, query: string): boolean {
  if (categoryKey !== '' && row.filterKey !== categoryKey) return false;
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = row.searchText.toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

/** Compare two numeric or ISO date keys according to newest-first or oldest-first sort direction. */
export function compareCollectionKeys(a: string, b: string, direction: CollectionSortDirection): number {
  return direction === 'newest' ? b.localeCompare(a) : a.localeCompare(b);
}
