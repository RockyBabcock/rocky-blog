/**
 * Content utilities - Index file
 *
 * Re-exports all content-related utilities from modular files.
 * This maintains backward compatibility while organizing code better.
 */

// =============================================================================
// Category Utilities
// =============================================================================
export {
  addCategoryRecursively,
  buildCategoryPath,
  getCategoryArr,
  getCategoryByLink,
  getCategoryLinks,
  getCategoryList,
  getCategoryNameByLink,
  getParentCategory,
  translateCategoryName,
  translateSeriesField,
} from './content/categories';

// =============================================================================
// Home Page Utilities
// =============================================================================
export { getHomePagePosts, getNonFeaturedPosts } from './content/home';
// =============================================================================
// Locale Utilities
// =============================================================================
export { getPostLocale, getPostSlug } from './content/locale';
// =============================================================================
// Post Utilities
// =============================================================================
export {
  getPostById,
  getPostCount,
  getPostDescription,
  getPostLastCategory,
  getPostReadingTime,
  getPostsByCategory,
  getPostsBySticky,
  getSortedPosts,
} from './content/posts';
// =============================================================================
// Series Utilities
// =============================================================================
export {
  getAdjacentSeriesPosts,
  getEnabledSeries,
  getFeaturedCategoryNames,
  getPostsBySeriesSlug,
  getSeriesBySlug,
  getSeriesPosts,
} from './content/series';

// =============================================================================
// Tag Utilities
// =============================================================================
export { buildTagPath, getAllTags, normalizeTag, tagToSlug } from './content/tags';

// =============================================================================
// Types
// =============================================================================
export type { Category, CategoryListResult } from './content/types';
