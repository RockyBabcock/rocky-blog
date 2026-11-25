import { displayDate } from '@lib/date';
import type { BlogPost, PostRef } from '@/types/blog';
import { getPostSlug } from './locale';
import { getPostCover, getPostLastCategory } from './posts';

export function toPostRefs(posts: BlogPost[]): PostRef[] {
  return posts.map((post) => ({
    id: post.id,
    slug: getPostSlug(post),
    title: post.data.title,
    date: displayDate.date(post.data.date),
    category: getPostLastCategory(post).name || undefined,
    cover: getPostCover(post),
  }));
}
