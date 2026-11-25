export interface CategoryNode {
  name: string;
  children?: CategoryNode[];
}

export interface MinimalPost {
  id: string;
  body?: string;
  data: {
    title: string;
    date: Date;
    link?: string;
    cover?: string;
    tags?: string[];
    categories?: string[] | string[][];
    sticky?: boolean;
    draft?: boolean;
    catalog?: boolean;
    description?: string;
  };
}

export function normalizeCategoryPath(categories?: string[] | string[][]): string[] {
  if (!categories || categories.length === 0) return [];
  const first = categories[0];
  if (Array.isArray(first)) {
    return first.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  }
  return (categories as string[]).filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

export function resolvePostSlug(id: string, link?: string, knownLocales: string[] = ['zh', 'en', 'ja', 'ko'], defaultLocale = 'zh'): string {
  if (link && link.trim().length > 0) {
    return link.trim().replace(/^\/+|\/+$/g, '');
  }
  const clean = id.replace(/\.(md|mdx)$/i, '').replace(/\/index$/i, '');
  const parts = clean.split('/');
  if (parts.length > 1 && parts[0] !== defaultLocale && knownLocales.includes(parts[0])) {
    return parts.slice(1).join('/');
  }
  return clean;
}

export function buildCategoryUrl(pathSegments: string[], categoryMap: Record<string, string>): string {
  if (pathSegments.length === 0) return '/categories';
  const mapped = pathSegments.map((segment) => categoryMap[segment] ?? segment.toLowerCase().replace(/\s+/g, '-'));
  return `/categories/${mapped.join('/')}`;
}

export function buildCategoryTree<T extends MinimalPost>(
  posts: T[],
): { categories: CategoryNode[]; countMap: Record<string, number> } {
  const roots: CategoryNode[] = [];
  const countMap: Record<string, number> = {};

  for (const post of posts) {
    if (post.data.catalog === false) continue;
    const segments = normalizeCategoryPath(post.data.categories);
    if (segments.length === 0) continue;

    let currentLevel = roots;
    for (const name of segments) {
      countMap[name] = (countMap[name] ?? 0) + 1;
      let node = currentLevel.find((item) => item.name === name);
      if (!node) {
        node = { name, children: [] };
        currentLevel.push(node);
      }
      if (!node.children) node.children = [];
      currentLevel = node.children;
    }
  }

  return { categories: roots, countMap };
}

export function collectCategoryLinks(categories: CategoryNode[], categoryMap: Record<string, string>, prefix = ''): string[] {
  const links: string[] = [];
  for (const cat of categories) {
    const slug = categoryMap[cat.name] ?? cat.name.toLowerCase().replace(/\s+/g, '-');
    const current = prefix ? `${prefix}/${slug}` : slug;
    links.push(current);
    if (cat.children && cat.children.length > 0) {
      links.push(...collectCategoryLinks(cat.children, categoryMap, current));
    }
  }
  return links;
}

export function findCategoryBySlug(
  categories: CategoryNode[],
  slugPath: string,
  categoryMap: Record<string, string>,
): { category: CategoryNode; pathNames: string[] } | null {
  const targetSegments = slugPath.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (targetSegments.length === 0) return null;

  let currentList = categories;
  let found: CategoryNode | undefined;
  const pathNames: string[] = [];

  for (const segment of targetSegments) {
    found = currentList.find((cat) => {
      const mapped = categoryMap[cat.name] ?? cat.name.toLowerCase().replace(/\s+/g, '-');
      return mapped === segment || cat.name === segment;
    });
    if (!found) return null;
    pathNames.push(found.name);
    currentList = found.children ?? [];
  }

  return found ? { category: found, pathNames } : null;
}

export function aggregateTags<T extends MinimalPost>(posts: T[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      const clean = tag.trim();
      if (!clean) continue;
      counts[clean] = (counts[clean] ?? 0) + 1;
    }
  }
  return counts;
}

export function groupPostsByYearPure<T extends MinimalPost>(posts: T[]): Array<{ year: number; posts: T[] }> {
  const map = new Map<number, T[]>();
  for (const post of posts) {
    const year = post.data.date.getFullYear();
    const list = map.get(year) ?? [];
    list.push(post);
    map.set(year, list);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, list]) => ({ year, posts: list }));
}

export function countContentWords(body: string): { words: number; minutes: number } {
  const plain = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_\-[\]()!]/g, ' ');
  const cjk = (plain.match(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) ?? []).length;
  const latin = (plain.replace(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g, ' ').match(/[A-Za-z0-9]+/g) ?? []).length;
  const words = cjk + latin;
  const minutes = Math.max(1, Math.ceil(words / 300));
  return { words, minutes };
}

export function pickPostCover(slug: string, explicitCover: string | undefined, coverList: string[]): string {
  if (explicitCover && explicitCover.trim().length > 0) return explicitCover;
  if (coverList.length === 0) return '/img/cover/1.webp';
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return coverList[hash % coverList.length];
}
