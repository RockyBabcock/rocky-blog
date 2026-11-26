/**
 * Pure YAML-free content locale mapping and fallback logic.
 * Separated from `locale.ts` so `node:test` can verify locale behavior without Vite YAML plugins.
 */

export interface LocalePostLike {
  id: string;
  data: {
    date: Date;
    link?: string;
    translationKey?: string;
  };
}

export interface SlugLocaleInfo {
  /** Detected locale code (e.g., 'en') or defaultLocale if none found */
  locale: string;
  /** Slug with locale prefix stripped (e.g., 'tools/getting-started') */
  localeFreeSlug: string;
}

export interface LocaleRuntimeOptions {
  defaultLocale: string;
  knownLocales: ReadonlySet<string>;
  transliterate?: (slug: string) => string;
}

export function getSlugLocaleInfoCore(slug: string, defaultLocale: string, knownLocales: ReadonlySet<string>): SlugLocaleInfo {
  const firstSlash = slug.indexOf('/');
  if (firstSlash === -1) {
    return { locale: defaultLocale, localeFreeSlug: slug };
  }

  const firstSegment = slug.slice(0, firstSlash);

  if (firstSegment !== defaultLocale && knownLocales.has(firstSegment)) {
    return {
      locale: firstSegment,
      localeFreeSlug: slug.slice(firstSlash + 1),
    };
  }

  return { locale: defaultLocale, localeFreeSlug: slug };
}

export function getPostLocaleCore(post: LocalePostLike, options: LocaleRuntimeOptions): string {
  return getSlugLocaleInfoCore(post.id, options.defaultLocale, options.knownLocales).locale;
}

export function getPostSlugCore(post: LocalePostLike, options: LocaleRuntimeOptions): string {
  const rawSlug = getSlugLocaleInfoCore(post.id, options.defaultLocale, options.knownLocales).localeFreeSlug;
  if (post.data.link) return post.data.link;
  return options.transliterate ? options.transliterate(rawSlug) : rawSlug;
}

export function getPostTranslationKeyCore(post: LocalePostLike, options: LocaleRuntimeOptions): string {
  const explicit = post.data.translationKey?.trim();
  return explicit ? explicit : getPostSlugCore(post, options);
}

export function getAvailablePostLocalesCore<T extends LocalePostLike>(
  targetPost: T,
  allPosts: T[],
  enabledLocales: string[],
  options: LocaleRuntimeOptions,
): string[] {
  const targetKey = getPostTranslationKeyCore(targetPost, options);
  const found = new Set<string>();
  for (const post of allPosts) {
    if (getPostTranslationKeyCore(post, options) === targetKey) {
      found.add(getPostLocaleCore(post, options));
    }
  }
  return enabledLocales.filter((loc) => found.has(loc));
}

export function filterPostsByLocaleCore<T extends LocalePostLike>(
  posts: T[],
  locale: string | undefined,
  options: LocaleRuntimeOptions,
): T[] {
  if (locale === undefined) return posts;

  if (locale === options.defaultLocale) {
    return posts.filter((post) => getPostLocaleCore(post, options) === options.defaultLocale);
  }

  const translatedKeys = new Set<string>();
  const translated: T[] = [];
  const defaultPosts: T[] = [];

  for (const post of posts) {
    const postLocale = getPostLocaleCore(post, options);
    if (postLocale === locale) {
      translated.push(post);
      translatedKeys.add(getPostTranslationKeyCore(post, options));
    } else if (postLocale === options.defaultLocale) {
      defaultPosts.push(post);
    }
  }

  const fallback = defaultPosts.filter((post) => !translatedKeys.has(getPostTranslationKeyCore(post, options)));
  const merged = [...translated, ...fallback];
  merged.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return merged;
}
