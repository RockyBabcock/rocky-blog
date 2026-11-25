import { categoryMap, i18nContentConfig } from '@lib/config/site';
import { defaultLocale } from '@/i18n';
import type { BlogPost } from '@/types/blog';
import {
  buildCategoryTree,
  buildCategoryUrl,
  type CategoryNode,
  collectCategoryLinks,
  findCategoryBySlug,
  normalizeCategoryPath,
} from './pure';
import { getSortedPosts } from './posts';

export type Category = CategoryNode;

export function getCategoryArr(category?: string | string[]): string[] {
  if (!category) return [];
  return Array.isArray(category) ? category : [category];
}

export function buildCategoryPath(categories: string[]): string {
  return buildCategoryUrl(categories, categoryMap);
}

export function getCategorySlug(name: string): string {
  return categoryMap[name] ?? name.toLowerCase().replace(/\s+/g, '-');
}

export function translateCategoryName(name: string, locale: string = defaultLocale): string {
  if (locale === defaultLocale) return name;
  const slug = categoryMap[name] ?? name.toLowerCase();
  const translated = i18nContentConfig?.[locale]?.categories?.[slug];
  return typeof translated === 'string' && translated.length > 0 ? translated : name;
}

export function getContentFeaturedCategoryField(
  link: string,
  field: 'label' | 'description',
  fallback: string,
  locale: string = defaultLocale,
): string {
  if (locale === defaultLocale) return fallback;
  const value = i18nContentConfig?.[locale]?.featuredCategories?.[link]?.[field];
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

export function getContentSeriesField(
  slug: string,
  field: 'label' | 'fullName' | 'description',
  fallback: string,
  locale: string = defaultLocale,
): string {
  if (locale === defaultLocale) return fallback;
  const value = i18nContentConfig?.[locale]?.series?.[slug]?.[field];
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

export async function getCategoryList(locale: string = defaultLocale) {
  const posts = await getSortedPosts(locale);
  return buildCategoryTree(posts);
}

export function getCategoryLinks(categories: Category[], prefix = ''): string[] {
  return collectCategoryLinks(categories, categoryMap, prefix);
}

export function getCategoryByLink(categories: Category[], slugPath: string) {
  return findCategoryBySlug(categories, slugPath, categoryMap);
}

export function postsInCategoryPath(posts: BlogPost[], targetPath: string[]): BlogPost[] {
  if (targetPath.length === 0) return posts;
  return posts.filter((post) => {
    const path = normalizeCategoryPath(post.data.categories);
    if (path.length < targetPath.length) return false;
    return targetPath.every((seg, idx) => path[idx] === seg);
  });
}
