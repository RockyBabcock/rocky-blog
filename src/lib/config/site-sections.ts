/**
 * Pure structural normalizers and validators for `config/site.yaml` sections
 * (social links, ICP filing, default covers, navigation, i18n, SEO metadata).
 *
 * Uses pure TypeScript checks (zero runtime schema library overhead) so misconfigured
 * YAML entries produce clear warnings and safe fallbacks instead of runtime crashes.
 */

import { DEFAULT_ROUTERS } from './routes';
import type { I18nConfig, LocaleConfig, ResolvedSiteConfig, RouterItem, SiteBasicConfig, SocialConfig } from './types';

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

export type ConfigWarn = (message: string) => void;

export const BUILT_IN_COVERS: readonly string[] = Array.from({ length: 21 }, (_, i) => `/img/cover/${i + 1}.webp`);

const DEFAULT_I18N_CONFIG: I18nConfig = {
  defaultLocale: 'zh',
  locales: [{ code: 'zh', label: '中文' }],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function normalizeSocialConfig(raw: unknown, warn: ConfigWarn = console.warn): SocialConfig {
  if (raw == null) return {};
  if (!isRecord(raw)) {
    warn('[config] social: expected a mapping of platform entries, falling back to {}');
    return {};
  }

  const normalized: SocialConfig = {};
  for (const [key, entry] of Object.entries(raw)) {
    if (!isRecord(entry)) {
      warn(`[config] social.${key}: expected an object with "url" and "icon", skipping`);
      continue;
    }

    const url = readNonEmptyString(entry.url);
    const icon = readNonEmptyString(entry.icon);
    if (!url || !icon) {
      warn(`[config] social.${key}: missing required non-empty "url" or "icon", skipping`);
      continue;
    }

    let color = '';
    if (entry.color !== undefined && entry.color !== null) {
      if (typeof entry.color === 'string') {
        color = entry.color.trim();
      } else {
        warn(`[config] social.${key}: expected string "color", ignoring invalid value`);
      }
    }

    normalized[key] = { url, icon, color };
  }

  return normalized;
}

export function normalizeIcpConfig(raw: SiteBasicConfig['icp']): IcpConfig | undefined {
  if (!raw) return undefined;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    return trimmed ? { text: trimmed } : undefined;
  }
  if (!isRecord(raw)) return undefined;
  const text = readNonEmptyString(raw.text);
  if (!text) return undefined;
  const link = readNonEmptyString(raw.link);
  return link ? { text, link } : { text };
}

export function normalizeDefaultCoverList(raw: unknown, warn: ConfigWarn = console.warn): string[] {
  if (raw == null) return [...BUILT_IN_COVERS];
  if (!Array.isArray(raw)) {
    warn('[config] defaultCoverList: expected an array of image paths, falling back to built-in covers');
    return [...BUILT_IN_COVERS];
  }

  const validCovers: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    const cover = readNonEmptyString(raw[i]);
    if (!cover) {
      warn(`[config] defaultCoverList[${i}]: expected a non-empty string path, skipping`);
      continue;
    }
    validCovers.push(cover);
  }

  return validCovers.length > 0 ? validCovers : [...BUILT_IN_COVERS];
}

function normalizeRouterItems(items: unknown[], prefix: string, warn: ConfigWarn): RouterItem[] {
  const result: RouterItem[] = [];

  for (let i = 0; i < items.length; i++) {
    const entry = items[i];
    const label = `${prefix}[${i}]`;
    if (!isRecord(entry)) {
      warn(`[config] ${label}: expected an object, skipping`);
      continue;
    }

    const name = readNonEmptyString(entry.name);
    const nameKey = readNonEmptyString(entry.nameKey);
    if (!name && !nameKey) {
      warn(`[config] ${label}: missing both "name" and "nameKey", skipping`);
      continue;
    }

    const path = readNonEmptyString(entry.path);
    const icon = readNonEmptyString(entry.icon);
    const localeIndependent = typeof entry.localeIndependent === 'boolean' ? entry.localeIndependent : undefined;

    let children: RouterItem[] | undefined;
    if (entry.children !== undefined) {
      if (Array.isArray(entry.children)) {
        const normalizedChildren = normalizeRouterItems(entry.children, `${label}.children`, warn);
        if (normalizedChildren.length > 0) {
          children = normalizedChildren;
        }
      } else {
        warn(`[config] ${label}.children: expected an array, ignoring invalid value`);
      }
    }

    if (!path && !children?.length) {
      warn(`[config] ${label}: must specify a "path" or non-empty "children", skipping`);
      continue;
    }

    result.push({
      ...(name !== undefined && { name }),
      ...(nameKey !== undefined && { nameKey }),
      ...(path !== undefined && { path }),
      ...(icon !== undefined && { icon }),
      ...(localeIndependent !== undefined && { localeIndependent }),
      ...(children !== undefined && { children }),
    });
  }

  return result;
}

export function normalizeNavigation(raw: unknown, warn: ConfigWarn = console.warn): RouterItem[] {
  if (raw == null) return DEFAULT_ROUTERS;
  if (!Array.isArray(raw)) {
    warn('[config] navigation: expected an array of route items, falling back to DEFAULT_ROUTERS');
    return DEFAULT_ROUTERS;
  }
  if (raw.length === 0) return DEFAULT_ROUTERS;

  const normalized = normalizeRouterItems(raw, 'navigation', warn);
  if (normalized.length === 0) {
    warn('[config] navigation: no valid items remained after validation, falling back to DEFAULT_ROUTERS');
    return DEFAULT_ROUTERS;
  }
  return normalized;
}

export function normalizeI18nConfig(raw: unknown, warn: ConfigWarn = console.warn): I18nConfig {
  if (raw == null) return DEFAULT_I18N_CONFIG;
  if (!isRecord(raw)) {
    warn('[config] i18n: expected an object, falling back to default zh locale');
    return DEFAULT_I18N_CONFIG;
  }

  const rawLocales = Array.isArray(raw.locales) ? raw.locales : [];
  const seen = new Set<string>();
  const locales: LocaleConfig[] = [];

  for (let i = 0; i < rawLocales.length; i++) {
    const entry = rawLocales[i];
    if (!isRecord(entry)) {
      warn(`[config] i18n.locales[${i}]: expected an object with "code", skipping`);
      continue;
    }
    const code = readNonEmptyString(entry.code);
    if (!code) {
      warn(`[config] i18n.locales[${i}]: missing non-empty "code", skipping`);
      continue;
    }
    if (seen.has(code)) {
      warn(`[config] i18n.locales[${i}]: duplicate locale code "${code}", skipping`);
      continue;
    }
    seen.add(code);
    const label = readNonEmptyString(entry.label);
    const enabled = typeof entry.enabled === 'boolean' ? entry.enabled : undefined;
    locales.push({
      code,
      ...(label !== undefined && { label }),
      ...(enabled !== undefined && { enabled }),
    });
  }

  if (locales.length === 0) {
    warn('[config] i18n.locales: no valid locales found, falling back to default zh locale');
    return DEFAULT_I18N_CONFIG;
  }

  const configuredDefault = readNonEmptyString(raw.defaultLocale);
  const enabledLocales = locales.filter((l) => l.enabled !== false);
  const validDefault =
    configuredDefault && enabledLocales.some((l) => l.code === configuredDefault)
      ? configuredDefault
      : (enabledLocales[0]?.code ?? locales[0].code);

  if (configuredDefault !== validDefault) {
    warn(`[config] i18n.defaultLocale "${configuredDefault ?? ''}" is not an enabled locale, using "${validDefault}"`);
  }

  return {
    defaultLocale: validDefault,
    locales,
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
