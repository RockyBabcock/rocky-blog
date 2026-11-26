/**
 * Home-page post aggregation utilities.
 */

import type { BlogPost } from 'types/blog';
import { isPostInCategory, partitionHomePosts } from './post-helpers';
import { getPostsByCategory, getSortedPosts } from './posts';
import { getEnabledSeries, getFeaturedCategoryNames } from './series';

/**
 * 获取所有非 Featured Series 的文章（已排序）
 * @returns 非系列文章列表（按日期排序，最新的在前）
 */
export async function getNonFeaturedPosts(locale?: string): Promise<BlogPost[]> {
  const categoryNames = getFeaturedCategoryNames();
  if (categoryNames.length === 0) {
    return await getSortedPosts(locale);
  }

  const allPosts = await getSortedPosts(locale);
  return allPosts.filter((post) => !categoryNames.some((catName) => isPostInCategory(post, catName)));
}

/**
 * 获取非 Featured Series 文章，按置顶状态分组
 * @returns 置顶文章和非置顶的普通文章（互斥，不重叠）
 * @deprecated Use `getHomePagePosts` when loading the home page sections together.
 */
export async function getNonFeaturedPostsBySticky(locale?: string): Promise<{
  stickyPosts: BlogPost[];
  regularPosts: BlogPost[];
}> {
  const nonFeaturedPosts = await getNonFeaturedPosts(locale);

  const stickyPosts: BlogPost[] = [];
  const regularPosts: BlogPost[] = [];

  for (const post of nonFeaturedPosts) {
    if (post.data?.sticky) {
      stickyPosts.push(post);
    } else {
      regularPosts.push(post);
    }
  }

  return { stickyPosts, regularPosts };
}

/**
 * 获取所有 highlightOnHome=true 系列的最新文章
 * @returns 最新文章列表（每个系列一篇）
 * @deprecated Use `getHomePagePosts` when loading the home page sections together.
 */
export async function getHomeHighlightedPosts(locale?: string): Promise<BlogPost[]> {
  const highlightedSeries = getEnabledSeries().filter((series) => series.highlightOnHome !== false);

  const posts: BlogPost[] = [];
  for (const series of highlightedSeries) {
    const seriesPosts = await getPostsByCategory(series.categoryName, locale);
    if (seriesPosts[0]) {
      posts.push(seriesPosts[0]);
    }
  }

  return posts;
}

/**
 * 优化的首页数据获取 - 单次遍历获取所有需要的数据
 * @returns 包含高亮文章、置顶文章和普通文章的对象
 */
export async function getHomePagePosts(locale?: string): Promise<{
  highlightedPosts: BlogPost[];
  stickyPosts: BlogPost[];
  regularPosts: BlogPost[];
}> {
  const allPosts = await getSortedPosts(locale);
  return partitionHomePosts(allPosts, getEnabledSeries());
}
