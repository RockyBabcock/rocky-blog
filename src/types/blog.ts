import type { CollectionEntry } from 'astro:content';

export interface BlogSchema {
  title: string;
  date: Date;
  updated?: Date;
  description?: string;
  link?: string;
  cover?: string;
  tags?: string[];
  subtitle?: string;
  catalog?: boolean;
  sticky?: boolean;
  draft?: boolean;
  tocNumbering?: boolean;
  categories?: string[] | string[][];
}

export type BlogPost = CollectionEntry<'blog'>;

export interface PostRef {
  id: string;
  slug: string;
  title: string;
  date: string;
  category?: string;
  cover?: string;
}
