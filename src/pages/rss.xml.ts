import rss from '@astrojs/rss';
import { siteConfig } from '@constants/site-config';
import { getPostSlug, getSortedPosts } from '@lib/content';
import { getPostDescriptionWithSummary } from '@lib/content/posts';
import type { APIContext } from 'astro';
import { defaultLocale } from '@/i18n';

export async function GET(context: APIContext) {
  const posts = await getSortedPosts(defaultLocale);
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: getPostDescriptionWithSummary(post),
      link: `/post/${getPostSlug(post)}`,
    })),
  });
}
