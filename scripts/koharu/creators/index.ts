// Types

// Creators
export { PostCreator } from './post-creator';
export type { CategoryTreeItem, ContentCreator, CreatorProps, PostData } from './types';

import { PostCreator } from './post-creator';
// Creator registry
import type { ContentCreator } from './types';

export const CREATORS: ContentCreator[] = [
  {
    id: 'post',
    label: '博客文章',
    description: '创建新的博客文章',
    Component: PostCreator,
  },
];

export type CreatorType = (typeof CREATORS)[number]['id'];
