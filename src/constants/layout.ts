/**
 * Unified layout spacing constants
 *
 * This file defines standardized spacing values for consistent horizontal
 * and vertical spacing across all pages and components.
 */

/**
 * Content area padding for main content blocks
 */
export const CONTENT_PADDING = {
  // Standard content with top spacing
  standard: 'px-10 py-8 tablet:px-6 tablet:pt-6 tablet:pb-2 md:px-4',
  // Editorial homepage main surface
  editorial: 'px-8 py-7 tablet:px-6 tablet:py-5 md:px-4 md:py-4',
  // Content without extra top spacing
  normal: 'px-6 py-4 tablet:px-6 md:px-4',
  // Compact content (for nested items)
  compact: 'px-4 py-2 tablet:px-2 tablet:py-1',
} as const;

/**
 * Max width constraints
 */
export const MAX_WIDTH = {
  // Standard 2-column content container (1344px)
  content: 'max-w-[84rem]',
  // Wide 3-column homepage editorial container (1472px)
  editorial: 'max-w-[92rem]',
} as const;

/**
 * Pagination settings
 */
export const PAGINATION = {
  // Posts per page for homepage and post listing
  pageSize: 10,
} as const;
