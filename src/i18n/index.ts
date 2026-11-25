import { i18nConfig } from '@lib/config/site';
import { en } from './translations/en';
import { ja } from './translations/ja';
import { ko } from './translations/ko';
import { zh } from './translations/zh';
import type { TranslationDict } from './types';

export const defaultLocale = i18nConfig.defaultLocale;
export const localeEntries = i18nConfig.locales;
export const enabledLocales = localeEntries.map((l) => l.code);
export const nonDefaultLocales = enabledLocales.filter((code) => code !== defaultLocale);
export const isI18nEnabled = enabledLocales.length > 1;

const dictionaries: Record<string, TranslationDict> = { zh, en, ja, ko };

export function t(locale: string, key: string, params?: Record<string, string | number>): string {
  const dict = dictionaries[locale] ?? dictionaries[defaultLocale] ?? zh;
  let value = dict[key] ?? zh[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replaceAll(`{${k}}`, String(v));
    }
  }
  return value;
}

export function getLocaleFromUrl(pathname: string): string {
  const clean = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const firstSegment = clean.split('/')[0];
  if (firstSegment && firstSegment !== defaultLocale && enabledLocales.includes(firstSegment)) {
    return firstSegment;
  }
  return defaultLocale;
}

export function stripLocaleFromPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const clean = normalized.replace(/(.)\/$/, '$1');
  const locale = getLocaleFromUrl(clean);
  if (locale === defaultLocale) return clean || '/';
  const stripped = clean.slice(locale.length + 1);
  return stripped || '/';
}

export function localizedPath(path: string, locale: string = defaultLocale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!locale || locale === defaultLocale) return normalized;
  if (normalized === '/') return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function getAlternateUrl(currentPath: string, targetLocale: string): string {
  const stripped = stripLocaleFromPath(currentPath);
  if (stripped === '/editor' || stripped.startsWith('/editor/')) {
    return stripped;
  }
  return localizedPath(stripped, targetLocale);
}

export function getLocaleLabel(locale: string): string {
  return localeEntries.find((l) => l.code === locale)?.label ?? locale;
}

export function getHtmlLang(locale: string): string {
  const entry = localeEntries.find((l) => l.code === locale);
  if (entry?.htmlLang) return entry.htmlLang;
  if (locale === 'zh') return 'zh-CN';
  if (locale === 'en') return 'en';
  if (locale === 'ja') return 'ja';
  if (locale === 'ko') return 'ko';
  return locale || 'zh-CN';
}

export function resolveNavName(nameKey: string | undefined, fallbackName: string | undefined, locale: string): string {
  if (nameKey) {
    const translated = t(locale, nameKey);
    if (translated !== nameKey) return translated;
  }
  return fallbackName ?? nameKey ?? '';
}

export function getLocaleStaticPaths() {
  return nonDefaultLocales.map((lang) => ({ params: { lang }, props: { locale: lang } }));
}
