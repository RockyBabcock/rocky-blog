/**
 * Home-page and feed post aggregation utilities.
 */

import type { BlogPost } from 'types/blog';
import { isPostInCategory, partitionHomePosts } from './post-helpers';
import { getSortedPosts } from './posts';
import { getEnabledSeries, getFeaturedCategoryNames } from './series';

/**
 * 获取所有非 Featured Series 的文章（已排序），用于 `/posts/[page]` 分页列表
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
