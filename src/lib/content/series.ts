/**
 * Featured series and post-series query utilities.
 */

import { siteConfig } from '@lib/config/site';
import type { FeaturedSeriesItem } from '@lib/config/types';
import type { BlogPost } from 'types/blog';
import { getPostSlug } from './locale';
import { findAdjacentBySlug } from './post-helpers';
import { getPostLastCategory, getPostsByCategory } from './posts';

/**
 * 获取文章所属系列的所有文章（基于最深层分类）
 * @param post 当前文章
 * @param locale 可选 locale 过滤
 * @returns 系列文章列表（按日期排序，最新的在前）
 */
export async function getSeriesPosts(post: BlogPost, locale?: string): Promise<BlogPost[]> {
  const lastCategory = getPostLastCategory(post);
  if (!lastCategory.name) return [];

  return await getPostsByCategory(lastCategory.name, locale);
}

/**
 * 获取文章的上一篇和下一篇（在同一系列中）
 * @param currentPost 当前文章
 * @param locale 可选 locale 过滤
 * @returns 上一篇和下一篇文章
 */
export async function getAdjacentSeriesPosts(
  currentPost: BlogPost,
  locale?: string,
): Promise<{
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}> {
  const seriesPosts = await getSeriesPosts(currentPost, locale);
  return findAdjacentBySlug(seriesPosts, getPostSlug(currentPost), getPostSlug);
}

/**
 * 获取所有启用的 Featured Series
 */
export function getEnabledSeries(): FeaturedSeriesItem[] {
  return siteConfig.featuredSeries.filter((series) => series.enabled !== false);
}

/**
 * 根据 slug 查找 Featured Series
 */
export function getSeriesBySlug(slug: string): FeaturedSeriesItem | undefined {
  const normalizedSlug = slug.trim().toLowerCase();
  return siteConfig.featuredSeries.find((series) => series.slug.toLowerCase() === normalizedSlug && series.enabled !== false);
}

/**
 * 获取某个 Featured Series 的所有文章
 */
export async function getPostsBySeriesSlug(slug: string, locale?: string): Promise<BlogPost[]> {
  const series = getSeriesBySlug(slug);
  if (!series) return [];

  return await getPostsByCategory(series.categoryName, locale);
}

/**
 * 获取所有 Featured Series 的分类名
 */
export function getFeaturedCategoryNames(): string[] {
  return getEnabledSeries().map((series) => series.categoryName);
}
