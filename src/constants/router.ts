export interface Router {
  name?: string;
  nameKey?: string;
  path?: string;
  icon?: string;
  localeIndependent?: boolean;
  children?: Router[];
}

export const RESERVED_ROUTES = new Set([
  'about',
  'categories',
  'tags',
  'friends',
  'posts',
  'post',
  'archives',
  'api',
  'music',
  'bangumi',
  'editor',
  '_astro',
  'rss.xml',
  'sitemap.xml',
  'robots.txt',
  'favicon.ico',
]);
