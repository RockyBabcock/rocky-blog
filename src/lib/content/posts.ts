import { getCollection } from 'astro:content';
import { categoryMap, defaultCoverList, featuredSeries } from '@lib/config/site';
import { defaultLocale } from '@/i18n';
import type { BlogPost } from '@/types/blog';
import { filterPostsByLocale, getPostSlug } from './locale';
import { aggregateTags, buildCategoryUrl, countContentWords, normalizeCategoryPath, pickPostCover } from './pure';

export async function getSortedPosts(locale: string = defaultLocale): Promise<BlogPost[]> {
  const all = await getCollection('blog');
  const filtered = filterPostsByLocale(all, locale);
  return filtered.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPostCount(locale: string = defaultLocale): Promise<number> {
  const posts = await getSortedPosts(locale);
  return posts.length;
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const all = await getCollection('blog');
  return all.find((p) => p.id === id);
}

export function getPostLastCategory(post: BlogPost): { name: string; link: string; path: string[] } {
  const path = normalizeCategoryPath(post.data.categories);
  if (path.length === 0) return { name: '', link: '', path: [] };
  return {
    name: path[path.length - 1],
    link: buildCategoryUrl(path, categoryMap),
    path,
  };
}

export function getAllTags(posts: BlogPost[]): Record<string, number> {
  return aggregateTags(posts);
}

export function isSeriesPost(post: BlogPost, categoryName: string): boolean {
  const path = normalizeCategoryPath(post.data.categories);
  return path.includes(categoryName);
}

export async function getPostsBySeries(categoryName: string, locale: string = defaultLocale): Promise<BlogPost[]> {
  const posts = await getSortedPosts(locale);
  return posts.filter((post) => isSeriesPost(post, categoryName));
}

export async function getSeriesPosts(post: BlogPost, locale: string = defaultLocale): Promise<BlogPost[]> {
  const last = getPostLastCategory(post);
  if (!last.name) return [];
  const posts = await getSortedPosts(locale);
  return posts.filter((candidate) => {
    const candidatePath = normalizeCategoryPath(candidate.data.categories);
    return candidatePath.length > 0 && candidatePath[candidatePath.length - 1] === last.name;
  });
}

export async function getNonSeriesPosts(locale: string = defaultLocale): Promise<BlogPost[]> {
  const posts = await getSortedPosts(locale);
  const seriesCats = new Set(featuredSeries.map((s) => s.categoryName));
  return posts.filter((post) => {
    const path = normalizeCategoryPath(post.data.categories);
    return !path.some((seg) => seriesCats.has(seg));
  });
}

export async function getHomePostGroups(locale: string = defaultLocale) {
  const allPosts = await getSortedPosts(locale);
  const highlightedSeriesCats = new Set(
    featuredSeries.filter((s) => s.highlightOnHome !== false).map((s) => s.categoryName),
  );
  const latestSeriesPosts: BlogPost[] = [];
  for (const series of featuredSeries) {
    if (series.highlightOnHome === false) continue;
    const latest = allPosts.find((p) => isSeriesPost(p, series.categoryName));
    if (latest) latestSeriesPosts.push(latest);
  }

  const nonSeries = allPosts.filter((post) => {
    const path = normalizeCategoryPath(post.data.categories);
    return !path.some((seg) => highlightedSeriesCats.has(seg));
  });

  const stickyNormal = nonSeries.filter((p) => p.data.sticky);
  const regularPosts = nonSeries.filter((p) => !p.data.sticky);
  const stickyPosts = [...latestSeriesPosts, ...stickyNormal];

  return { stickyPosts, regularPosts, allNonSeries: nonSeries, allPosts };
}

export function getPostCover(post: BlogPost): string {
  return pickPostCover(getPostSlug(post), post.data.cover, defaultCoverList);
}

export function getRandomCover(slug: string): string {
  return pickPostCover(slug, undefined, defaultCoverList);
}

export function getPostDescriptionWithSummary(post: BlogPost): string {
  if (post.data.description) return post.data.description;
  const plain = (post.body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*`_\[\]()!|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 150 ? `${plain.slice(0, 150)}...` : plain;
}

export function getPostsBySticky(posts: BlogPost[]): { stickyPosts: BlogPost[]; nonStickyPosts: BlogPost[] } {
  const stickyPosts = posts.filter((p) => Boolean(p.data.sticky));
  const nonStickyPosts = posts.filter((p) => !p.data.sticky);
  return { stickyPosts, nonStickyPosts };
}

export function getPostsByCategory(posts: BlogPost[], categoryName: string): BlogPost[] {
  return posts.filter((post) => normalizeCategoryPath(post.data.categories).includes(categoryName));
}

export async function getSeriesPostsByCategory(categoryName: string, locale: string = defaultLocale): Promise<BlogPost[]> {
  return getPostsBySeries(categoryName, locale);
}

export function getPostWordStats(postOrBody: BlogPost | string): { words: number; minutes: number } {
  const body = typeof postOrBody === 'string' ? postOrBody : (postOrBody.body ?? '');
  return countContentWords(body);
}
