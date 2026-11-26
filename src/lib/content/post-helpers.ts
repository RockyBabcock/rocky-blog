/**
 * Pure post categorization, adjacency, and home-page partitioning helpers.
 *
 * Kept free of `astro:content` and YAML imports so logic can be unit-tested
 * directly with `node:test`.
 */

import type { FeaturedSeriesItem } from '@lib/config/types';

export interface CategorizedPostLike {
  data: {
    categories?: string[] | string[][];
    sticky?: boolean;
  };
}

/**
 * Check whether a post belongs to the given category name
 * (matching either a flat `'Tools'` category or any segment in `['Notes', 'Frontend']`).
 */
export function isPostInCategory(post: CategorizedPostLike, categoryName: string): boolean {
  const { categories } = post.data;
  if (!categories?.length) return false;

  const firstCategory = categories[0];
  if (Array.isArray(firstCategory)) {
    return firstCategory.includes(categoryName);
  }
  if (typeof firstCategory === 'string') {
    return firstCategory === categoryName;
  }
  return false;
}

/**
 * Find the previous (newer, index - 1) and next (older, index + 1) items
 * in a descending-date-sorted list by slug.
 */
export function findAdjacentBySlug<T>(
  posts: readonly T[],
  currentSlug: string,
  getSlug: (post: T) => string,
): { prevPost: T | null; nextPost: T | null } {
  if (posts.length === 0) {
    return { prevPost: null, nextPost: null };
  }

  const currentIndex = posts.findIndex((post) => getSlug(post) === currentSlug);
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  return {
    prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}

/**
 * Single-pass partition of sorted posts into home-page sections:
 * - `highlightedPosts`: latest post for each enabled highlighted series (preserving series order)
 * - `stickyPosts`: non-featured posts with `sticky: true`
 * - `regularPosts`: remaining non-featured posts
 */
export function partitionHomePosts<T extends CategorizedPostLike>(
  allPosts: readonly T[],
  enabledSeries: readonly Pick<FeaturedSeriesItem, 'categoryName' | 'highlightOnHome'>[],
): {
  highlightedPosts: T[];
  stickyPosts: T[];
  regularPosts: T[];
} {
  const highlightedSeries = enabledSeries.filter((series) => series.highlightOnHome !== false);
  const categoryNames = enabledSeries.map((series) => series.categoryName);

  const seriesLatestMap = new Map<string, T>();
  const stickyPosts: T[] = [];
  const regularPosts: T[] = [];

  for (const post of allPosts) {
    const isFeatured = categoryNames.some((catName) => isPostInCategory(post, catName));

    if (isFeatured) {
      for (const series of highlightedSeries) {
        if (isPostInCategory(post, series.categoryName)) {
          if (!seriesLatestMap.has(series.categoryName)) {
            seriesLatestMap.set(series.categoryName, post);
          }
          break;
        }
      }
      continue;
    }

    if (post.data?.sticky) {
      stickyPosts.push(post);
    } else {
      regularPosts.push(post);
    }
  }

  const highlightedPosts: T[] = [];
  for (const series of highlightedSeries) {
    const post = seriesLatestMap.get(series.categoryName);
    if (post) {
      highlightedPosts.push(post);
    }
  }

  return { highlightedPosts, stickyPosts, regularPosts };
}
