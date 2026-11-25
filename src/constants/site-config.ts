import {
  allFeaturedSeries,
  analyticsConfig,
  announcementsConfig,
  bangumiConfig,
  bgmConfig,
  categoryMap,
  christmasConfig,
  commentConfig,
  defaultCoverList,
  editorConfig,
  featuredCategories,
  featuredSeries,
  motionConfig,
  navigationConfig,
  siteConfig,
  socialConfig,
} from '@lib/config/site';
import type { UmamiSiteStatsConfig } from '@lib/config/types';
import type { Router } from './router';

export {
  analyticsConfig,
  announcementsConfig,
  bangumiConfig,
  bgmConfig,
  categoryMap,
  christmasConfig,
  commentConfig,
  defaultCoverList,
  editorConfig,
  featuredCategories,
  featuredSeries,
  motionConfig,
  siteConfig,
  socialConfig,
};

export const featuredSeriesList = featuredSeries;
export const icpConfig = siteConfig.icp ?? null;

export const umamiSiteStatsConfig: UmamiSiteStatsConfig | null =
  analyticsConfig.umami?.enabled &&
  analyticsConfig.umami?.statistics_display?.footer_site_stats &&
  analyticsConfig.umami?.endpoint &&
  analyticsConfig.umami?.id
    ? {
        endpoint: analyticsConfig.umami.endpoint,
        id: analyticsConfig.umami.id,
        token: analyticsConfig.umami.statistics_display.token,
      }
    : null;

export const configuredSeriesSlugs = new Set(allFeaturedSeries.map((s) => s.slug));
export const enabledSeriesSlugs = new Set(featuredSeries.map((s) => s.slug));

const baseRouters: Router[] = [...navigationConfig];
if (bangumiConfig && !baseRouters.some((r) => r.path === '/bangumi')) {
  baseRouters.push({
    name: bangumiConfig.label ?? '追番',
    nameKey: 'nav.bangumi',
    path: '/bangumi',
    icon: bangumiConfig.icon ?? 'ri:bilibili-fill',
  });
}

export const routers: Router[] = baseRouters;
