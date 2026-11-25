import { defaultLocale, enabledLocales } from '@/i18n';
import type { BlogPost } from '@/types/blog';
import { resolvePostSlug } from './pure';

export function getPostSlug(post: BlogPost): string {
  return resolvePostSlug(post.id, post.data.link, enabledLocales, defaultLocale);
}

export function getSlugLocaleInfo(id: string): { locale: string; baseSlug: string } {
  const clean = id.replace(/\.(md|mdx)$/i, '');
  const parts = clean.split('/');
  if (parts.length > 1 && parts[0] !== defaultLocale && enabledLocales.includes(parts[0])) {
    return { locale: parts[0], baseSlug: parts.slice(1).join('/') };
  }
  return { locale: defaultLocale, baseSlug: clean };
}

export function filterPostsByLocale(posts: BlogPost[], locale: string = defaultLocale): BlogPost[] {
  const published = posts.filter((p) => !p.data.draft);
  if (locale === defaultLocale) {
    return published.filter((p) => getSlugLocaleInfo(p.id).locale === defaultLocale);
  }

  const byBase = new Map<string, BlogPost>();
  for (const post of published) {
    const info = getSlugLocaleInfo(post.id);
    if (info.locale === defaultLocale && !byBase.has(info.baseSlug)) {
      byBase.set(info.baseSlug, post);
    }
  }
  for (const post of published) {
    const info = getSlugLocaleInfo(post.id);
    if (info.locale === locale) {
      byBase.set(info.baseSlug, post);
    }
  }
  return [...byBase.values()];
}
