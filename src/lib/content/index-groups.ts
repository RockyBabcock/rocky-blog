import type { BlogPost } from '@/types/blog';
import { groupPostsByYearPure } from './pure';

export function groupPostsByYear(posts: BlogPost[], _timezone?: string) {
  return groupPostsByYearPure(posts);
}
