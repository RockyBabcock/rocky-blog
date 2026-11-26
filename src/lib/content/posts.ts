/**
 * Core post query and metadata utility functions.
 *
 * Series queries live in `./series.ts` and home-page aggregations live in `./home.ts`.
 */

import { type CollectionEntry, getCollection } from 'astro:content';
import readingTime from 'reading-time';
import type { BlogPost } from 'types/blog';
import { t } from '@/i18n';
import { defaultLocale } from '@/i18n/config';
import { extractTextFromMarkdown } from '../sanitize';
import { memoize } from './cache';
import { buildCategoryPath } from './category-path';
import { filterPostsByLocale } from './locale';
import { isPostInCategory } from './post-helpers';

/** WeakMap-based cache for reading-time results — auto-GC when post objects are collected */
const readingTimeCache = new WeakMap<CollectionEntry<'blog'>, { words: number; text: string; minutes: number }>();

/**
 * Get reading-time stats for a post, cached per object identity.
 * Ensures each post's body is parsed at most once across transforms, Cover, and stats.
 */
export function getPostReadingTime(post: CollectionEntry<'blog'>): { words: number; text: string; minutes: number } {
  let cached = readingTimeCache.get(post);
  if (!cached) {
    const result = readingTime(post.body ?? '');
    cached = { words: result.words, text: result.text, minutes: result.minutes };
    readingTimeCache.set(post, cached);
  }
  return cached;
}

/**
 * 获取文章描述
 * 优先使用 frontmatter 中的 description，如果不存在则从 Markdown 内容中智能提取
 * @param post 文章对象
 * @param locale 语言
 * @param maxLength 最大长度，默认 150 字符
 * @returns 文章描述文本
 */
export function getPostDescription(post: BlogPost, locale: string = defaultLocale, maxLength: number = 150): string {
  if (post.data.description) return post.data.description;
  if (post.data.password) return t(locale, 'encrypted.post.description');
  return extractTextFromMarkdown(post.body ?? '', maxLength);
}

/**
 * Get all posts sorted by date (newest first)
 * In production, draft posts are filtered out
 * @param locale Optional locale filter — undefined returns all, 'zh' returns default only, 'en' returns en + fallback
 */
export async function getSortedPosts(locale?: string): Promise<CollectionEntry<'blog'>[]> {
  return memoize('sortedPosts', locale ?? '__all__', async () => {
    const posts = await getCollection('blog', ({ data }) => {
      // 在生产环境中，过滤掉草稿
      return import.meta.env.PROD ? data.draft !== true : true;
    });

    // 使用浅拷贝避免原地修改 Astro 内部缓存的数组
    const sortedPosts = posts.toSorted((a: BlogPost, b: BlogPost) => {
      return b.data.date.getTime() - a.data.date.getTime();
    });

    return filterPostsByLocale(sortedPosts, locale);
  });
}

/**
 * Get a single post by its collection ID.
 * Builds an id→post Map once (per locale), then lookups are O(1).
 */
export async function getPostById(id: string, locale?: string): Promise<CollectionEntry<'blog'> | undefined> {
  const map = await memoize('postByIdMap', locale ?? '__all__', async () => {
    const posts = await getSortedPosts(locale);
    return new Map(posts.map((p) => [p.id, p]));
  });
  return map.get(id);
}

/**
 * Get posts separated by sticky status
 * @returns Object containing sticky and non-sticky posts, both sorted by date (newest first)
 */
export async function getPostsBySticky(locale?: string): Promise<{
  stickyPosts: CollectionEntry<'blog'>[];
  nonStickyPosts: CollectionEntry<'blog'>[];
}> {
  const posts = await getSortedPosts(locale);

  const stickyPosts: CollectionEntry<'blog'>[] = [];
  const nonStickyPosts: CollectionEntry<'blog'>[] = [];

  for (const post of posts) {
    if (post.data?.sticky) {
      stickyPosts.push(post);
    } else {
      nonStickyPosts.push(post);
    }
  }

  return { stickyPosts, nonStickyPosts };
}

/**
 * Get post count (excluding drafts in production)
 * Leverages getSortedPosts cache instead of a separate getCollection call.
 */
export async function getPostCount(locale?: string) {
  const posts = await getSortedPosts(locale);
  return posts.length;
}

/**
 * 获取分类下的所有文章
 * @param categoryName 分类名
 * @returns 文章列表
 */
export async function getPostsByCategory(categoryName: string, locale?: string): Promise<BlogPost[]> {
  return memoize('postsByCat', `${categoryName}:${locale ?? '__all__'}`, async () => {
    const posts = await getSortedPosts(locale);
    return posts.filter((post) => isPostInCategory(post, categoryName));
  });
}

/**
 * Get the last (deepest) category of a post
 */
export function getPostLastCategory(post: BlogPost): { link: string; name: string } {
  const { categories } = post.data;
  if (!categories?.length) return { link: '', name: '' };

  const firstCategory = categories[0];
  if (Array.isArray(firstCategory)) {
    if (!firstCategory.length) return { link: '', name: '' };
    return {
      link: buildCategoryPath(firstCategory),
      name: firstCategory[firstCategory.length - 1],
    };
  }
  if (typeof firstCategory === 'string') {
    return {
      link: buildCategoryPath(firstCategory),
      name: firstCategory,
    };
  }

  return { link: '', name: '' };
}
