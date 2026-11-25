/**
 * Site configuration assembly layer.
 *
 * Re-exports the normalized values from `@lib/config/site` and maps the
 * remaining YAML sections onto their runtime shapes. Nothing under `src/lib/**`
 * may import this module — depend on `@lib/config/*` instead.
 */

import {
  contentConfig,
  enabledSeriesSlugList,
  featuredSeriesList,
  i18nConfig,
  motionConfig,
  siteConfig,
} from '@lib/config/site';
import type { DevConfig, RouterItem, SocialConfig } from '@lib/config/types';
import yamlConfig from '../../config/site.yaml';
import { DEFAULT_ROUTERS } from './router';

export { contentConfig, i18nConfig, motionConfig, siteConfig };

export const socialConfig: SocialConfig = yamlConfig.social ?? {};

// ICP filing config — normalize string shorthand to { text } object
export const icpConfig: { text: string; link?: string } | undefined = (() => {
  const raw = yamlConfig.site.icp;
  if (!raw) return undefined;
  if (typeof raw === 'string') return { text: raw };
  return raw;
})();

const { title, alternate, subtitle } = siteConfig;

export const seoConfig = {
  title: `${alternate ? `${alternate} = ` : ''}${title}${subtitle ? ` = ${subtitle}` : ''}`,
  description: siteConfig.description,
  keywords: siteConfig?.keywords?.join(',') ?? '',
  url: siteConfig.site,
};

const BUILT_IN_COVERS = Array.from({ length: 21 }, (_, i) => `/img/cover/${i + 1}.webp`);
export const defaultCoverList = yamlConfig?.defaultCoverList?.length ? yamlConfig.defaultCoverList : BUILT_IN_COVERS;

// Navigation routers
export const routers: RouterItem[] = yamlConfig.navigation ?? DEFAULT_ROUTERS;

// Map YAML dev tools config with defaults (dev only)
export const devConfig: DevConfig = {
  localProjectPath: yamlConfig.dev?.localProjectPath ?? '',
  contentRelativePath: yamlConfig.dev?.contentRelativePath ?? 'src/content/blog',
  editors: yamlConfig.dev?.editors ?? [],
};

/** All configured series slugs (lowercase) */
export const configuredSeriesSlugs = new Set(featuredSeriesList.map((series) => series.slug));

/** Only enabled series slugs (lowercase) */
export const enabledSeriesSlugs = new Set(enabledSeriesSlugList);
