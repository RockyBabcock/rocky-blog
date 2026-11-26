/**
 * Series Reading Route & Progress Computation
 *
 * Pure functions deriving per-series completion progress and next recommended
 * issue directly from local reading history (single source of truth).
 */

import { isEntryCompleted, type ReadingHistoryEntry } from './reading-history';

export interface SeriesRouteItem {
  slug: string;
  title: string;
  href: string;
}

export interface SeriesProgressSummary {
  total: number;
  completedCount: number;
  inProgressCount: number;
  percent: number;
  /** The recommended next issue to continue or start reading */
  recommendedItem: SeriesRouteItem | null;
  /** Whether the user has started any post in this series */
  hasStarted: boolean;
  /** Map of canonical slug → reading progress (0..100) */
  progressBySlug: Record<string, number>;
  /** Set of canonical slugs considered completed */
  completedSlugs: string[];
}

/**
 * Compute series progress from an ordered list of series posts and local reading history.
 *
 * `orderedItems` is expected in reading order (e.g. oldest → newest or displayed order).
 * Recommendation strategy:
 * 1. Most recently read in-progress item in this series.
 * 2. First unread item after the most recently completed item in this series.
 * 3. First item in the series when nothing has been started yet.
 */
export function computeSeriesProgress(
  orderedItems: SeriesRouteItem[],
  historyEntries: ReadingHistoryEntry[],
): SeriesProgressSummary {
  const total = orderedItems.length;
  if (total === 0) {
    return {
      total: 0,
      completedCount: 0,
      inProgressCount: 0,
      percent: 0,
      recommendedItem: null,
      hasStarted: false,
      progressBySlug: {},
      completedSlugs: [],
    };
  }

  const historyBySlug = new Map<string, ReadingHistoryEntry>();
  for (const entry of historyEntries) {
    if (!historyBySlug.has(entry.slug)) {
      historyBySlug.set(entry.slug, entry);
    }
  }

  const progressBySlug: Record<string, number> = {};
  const completedSlugs: string[] = [];
  let inProgressCount = 0;
  let latestInProgress: { item: SeriesRouteItem; lastReadAt: number } | null = null;

  for (const item of orderedItems) {
    const record = historyBySlug.get(item.slug);
    if (!record) continue;
    progressBySlug[item.slug] = record.progress;
    if (isEntryCompleted(record)) {
      completedSlugs.push(item.slug);
    } else if (record.progress > 0) {
      inProgressCount += 1;
      if (!latestInProgress || record.lastReadAt > latestInProgress.lastReadAt) {
        latestInProgress = { item, lastReadAt: record.lastReadAt };
      }
    }
  }

  const completedSet = new Set(completedSlugs);
  const completedCount = completedSlugs.length;
  const hasStarted = completedCount > 0 || inProgressCount > 0;
  const percent = Math.round((completedCount / total) * 100);

  let recommendedItem: SeriesRouteItem | null = null;
  if (latestInProgress) {
    recommendedItem = latestInProgress.item;
  } else {
    recommendedItem = orderedItems.find((item) => !completedSet.has(item.slug)) ?? orderedItems[0];
  }

  return {
    total,
    completedCount,
    inProgressCount,
    percent,
    recommendedItem,
    hasStarted,
    progressBySlug,
    completedSlugs,
  };
}
