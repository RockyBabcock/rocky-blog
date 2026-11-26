/**
 * Pure editorial layout & aggregation helpers for the homepage and discovery modules.
 *
 * Kept strictly YAML-free so it can be unit-tested directly with `node:test`.
 */

export interface WeightedTag {
  name: string;
  count: number;
  /** Visual emphasis tier: 3 = prominent, 2 = medium, 1 = subtle */
  tier: 1 | 2 | 3;
}

export interface TimelineYearSlice<T> {
  year: number;
  totalInYear: number;
  posts: T[];
}

/**
 * Sort tags by descending frequency (ties broken alphabetically), slice to `limit`,
 * and assign a normalized visual weight tier (`1 | 2 | 3`) using real counts only.
 */
export function computeTagTiers(tagCounts: Record<string, number>, limit = 18): WeightedTag[] {
  const entries = Object.entries(tagCounts)
    .filter(([, count]) => Number.isFinite(count) && count > 0)
    .sort((a, b) => (b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])))
    .slice(0, Math.max(0, limit));

  if (entries.length === 0) return [];

  const maxCount = entries[0][1];
  const minCount = entries[entries.length - 1][1];
  const span = maxCount - minCount;

  return entries.map(([name, count]) => {
    if (span === 0) {
      return { name, count, tier: count >= 2 ? 2 : 1 };
    }
    const ratio = (count - minCount) / span;
    const tier: 1 | 2 | 3 = ratio >= 0.65 ? 3 : ratio >= 0.25 ? 2 : 1;
    return { name, count, tier };
  });
}

/**
 * Split a post stream into prominent visual cards and compact editorial rows
 * to create rhythm on the homepage without duplicating or dropping items.
 */
export function splitLatestPosts<T>(posts: readonly T[], visualCardCount = 3): { featuredCards: T[]; compactRows: T[] } {
  const safeCount = Math.max(0, visualCardCount);
  return {
    featuredCards: posts.slice(0, safeCount),
    compactRows: posts.slice(safeCount),
  };
}

/**
 * Extract a chronological preview across year buckets up to `maxItems` total posts,
 * preserving each year's real total post count for accurate archive indicators.
 */
export function buildTimelinePreview<T>(
  yearGroups: readonly { year: number; posts: readonly T[] }[],
  maxItems = 7,
): TimelineYearSlice<T>[] {
  if (maxItems <= 0) return [];
  const result: TimelineYearSlice<T>[] = [];
  let remaining = maxItems;

  for (const group of yearGroups) {
    if (remaining <= 0) break;
    if (group.posts.length === 0) continue;
    const slice = group.posts.slice(0, remaining);
    result.push({
      year: group.year,
      totalInYear: group.posts.length,
      posts: slice,
    });
    remaining -= slice.length;
  }

  return result;
}
