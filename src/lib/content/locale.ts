/**
 * Content locale utilities
 *
 * Detects locale from content collection IDs and provides
 * locale-aware filtering with fallback support.
 */

import type { BlogPost } from 'types/blog';
import { allKnownLocales, defaultLocale } from '@/i18n/config';
import { transliterateSlug } from '@/lib/slug';
import {
  filterPostsByLocaleCore,
  getAvailablePostLocalesCore,
  getPostLocaleCore,
  getPostSlugCore,
  getPostTranslationKeyCore,
  getSlugLocaleInfoCore,
  type LocaleRuntimeOptions,
  type SlugLocaleInfo,
} from './locale-core';

export type { SlugLocaleInfo };

const runtimeOptions: LocaleRuntimeOptions = {
  defaultLocale,
  knownLocales: allKnownLocales,
  transliterate: transliterateSlug,
};

/**
 * Extract locale info from a content collection ID.
 */
export function getSlugLocaleInfo(slug: string): SlugLocaleInfo {
  return getSlugLocaleInfoCore(slug, defaultLocale, allKnownLocales);
}

/**
 * Get the locale of a blog post.
 */
export function getPostLocale(post: BlogPost): string {
  return getPostLocaleCore(post, runtimeOptions);
}

/**
 * Get the locale-free slug for a blog post.
 */
export function getPostSlug(post: BlogPost): string {
  return getPostSlugCore(post, runtimeOptions);
}

/**
 * Get the canonical translation key for a post.
 */
export function getPostTranslationKey(post: BlogPost): string {
  return getPostTranslationKeyCore(post, runtimeOptions);
}

/**
 * Return the list of enabled locales that actually have a native translation
 * matching `targetPost` (by `translationKey` or locale-free slug).
 */
export function getAvailablePostLocales(targetPost: BlogPost, allPosts: BlogPost[], enabledLocales: string[]): string[] {
  return getAvailablePostLocalesCore(targetPost, allPosts, enabledLocales, runtimeOptions);
}

/**
 * Filter posts by locale with fallback support.
 */
export function filterPostsByLocale(posts: BlogPost[], locale?: string): BlogPost[] {
  return filterPostsByLocaleCore(posts, locale, runtimeOptions);
}
