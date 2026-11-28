/**
 * Pure helper functions for post detail page metadata, SEO structured data,
 * math detection, breadcrumb generation, and SEO structured data.
 *
 * Kept free of `astro:content` and YAML imports for direct `node:test` coverage.
 */

const LATEX_MATH_PATTERN = /\$|\\\(|\\\[/;

export interface BreadcrumbItem {
  name: string;
  link: string;
}

/**
 * Determine whether KaTeX stylesheet should be loaded for a post.
 */
export function hasMathSyntax(enableMath: boolean, postMath: boolean | undefined, body?: string): boolean {
  return enableMath && (postMath === true || (postMath !== false && LATEX_MATH_PATTERN.test(body ?? '')));
}

/**
 * Assemble deduplicated SEO keywords from post frontmatter and site defaults.
 */
export function buildPostKeywords(params: {
  postKeywords?: string[];
  tags?: string[];
  categories?: (string | string[])[];
  siteKeywords?: string[];
}): string[] {
  const { postKeywords = [], tags = [], categories = [], siteKeywords = [] } = params;
  const categoryKeywords = categories.length ? categories.flat() : [];
  const postKw = postKeywords.length ? postKeywords : [...tags, ...categoryKeywords];
  return [...new Set([...postKw, ...siteKeywords])];
}

/**
 * Build localized breadcrumb items for a post's primary category hierarchy.
 */
export function buildPostBreadcrumbs(
  categoryArr: string[],
  buildPath: (partialCategories: string[]) => string,
  translateName: (categoryName: string) => string,
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];
  for (let i = 0; i < categoryArr.length; i++) {
    const partialCategories = categoryArr.slice(0, i + 1);
    breadcrumbs.push({
      name: translateName(categoryArr[i]),
      link: buildPath(partialCategories),
    });
  }
  return breadcrumbs;
}

/**
 * Build Schema.org `BlogPosting` JSON-LD payload for a post page.
 */
export function buildPostJsonLd(params: {
  title: string;
  description: string;
  keywords: string[];
  authorName: string;
  siteUrl: URL | string | undefined;
  datePublished: string;
  dateModified?: string;
  ogImage?: string;
  pageUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    keywords: params.keywords,
    author: {
      '@type': 'Person',
      name: params.authorName,
      url: params.siteUrl,
    },
    datePublished: params.datePublished,
    ...(params.dateModified && { dateModified: params.dateModified }),
    ...(params.ogImage && { image: params.ogImage }),
    mainEntityOfPage: params.pageUrl,
  };
}

/**
 * Build Schema.org `BreadcrumbList` JSON-LD payload for a post page.
 */
export function buildBreadcrumbJsonLd(params: {
  homeName: string;
  homeHref: string;
  breadcrumbs: readonly BreadcrumbItem[];
  title: string;
  siteUrl: URL | string | undefined;
}) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: params.homeName,
      item: new URL(params.homeHref, params.siteUrl).href,
    },
    ...params.breadcrumbs.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: category.name,
      item: new URL(category.link, params.siteUrl).href,
    })),
    {
      '@type': 'ListItem',
      position: params.breadcrumbs.length + 2,
      name: params.title,
      // Omit `item` on the current (last) breadcrumb per Google structured-data guidance.
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
