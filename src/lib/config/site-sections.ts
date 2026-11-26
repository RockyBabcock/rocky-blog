/**
 * Pure normalizers for the remaining `config/site.yaml` sections
 * (social links, ICP filing, default covers, navigation, dev tools, SEO metadata).
 */

import { DEFAULT_ROUTERS } from './routes';
import type { DevConfig, ResolvedSiteConfig, RouterItem, SiteBasicConfig, SocialConfig } from './types';

export interface IcpConfig {
  text: string;
  link?: string;
}

export interface SeoSummaryConfig {
  title: string;
  description: string | undefined;
  keywords: string;
  url: string;
}

export const BUILT_IN_COVERS: readonly string[] = Array.from({ length: 21 }, (_, i) => `/img/cover/${i + 1}.webp`);

export function normalizeSocialConfig(raw: SocialConfig | undefined): SocialConfig {
  if (!raw || typeof raw !== 'object') return {};
  return raw;
}

export function normalizeIcpConfig(raw: SiteBasicConfig['icp']): IcpConfig | undefined {
  if (!raw) return undefined;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    return trimmed ? { text: trimmed } : undefined;
  }
  const text = raw.text?.trim();
  if (!text) return undefined;
  return raw.link ? { text, link: raw.link } : { text };
}

export function normalizeDefaultCoverList(raw: string[] | undefined): string[] {
  if (Array.isArray(raw) && raw.length > 0) {
    return raw;
  }
  return [...BUILT_IN_COVERS];
}

export function normalizeNavigation(raw: RouterItem[] | undefined): RouterItem[] {
  if (Array.isArray(raw) && raw.length > 0) {
    return raw;
  }
  return DEFAULT_ROUTERS;
}

export function normalizeDevConfig(raw: Partial<DevConfig> | undefined): DevConfig {
  return {
    localProjectPath: raw?.localProjectPath ?? '',
    contentRelativePath: raw?.contentRelativePath ?? 'src/content/blog',
    editors: Array.isArray(raw?.editors) ? raw.editors : [],
  };
}

export function buildSeoConfig(
  site: Pick<ResolvedSiteConfig, 'title' | 'alternate' | 'subtitle' | 'description' | 'keywords' | 'site'>,
): SeoSummaryConfig {
  const { title, alternate, subtitle } = site;
  return {
    title: `${alternate ? `${alternate} = ` : ''}${title}${subtitle ? ` = ${subtitle}` : ''}`,
    description: site.description,
    keywords: site.keywords?.join(',') ?? '',
    url: site.site,
  };
}
