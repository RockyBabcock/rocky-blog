/**
 * Pure Intl-based localized date formatting helpers (YAML-free for standalone node:test).
 */

const INTL_LOCALE_MAP: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en-US',
  ja: 'ja-JP',
  fr: 'fr-FR',
};

const intlFormatters = new Map<string, Intl.DateTimeFormat>();

function getFormatter(locale: string, options: Intl.DateTimeFormatOptions, timezone: string): Intl.DateTimeFormat {
  const intlLocale = getIntlLocale(locale);
  const key = `${intlLocale}|${timezone}|${JSON.stringify(options)}`;
  let formatter = intlFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(intlLocale, { ...options, timeZone: timezone });
    intlFormatters.set(key, formatter);
  }
  return formatter;
}

function toValidDate(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(dateObj.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }
  return dateObj;
}

/** Map short site locale codes to Intl BCP 47 locale tags. */
export function getIntlLocale(locale: string): string {
  return INTL_LOCALE_MAP[locale] ?? locale;
}

/** Format a date in a natural localized form with explicit timezone (deterministic across SSR & client). */
export function formatLocalizedDate(date: Date | string, locale: string, timezone = 'Asia/Shanghai'): string {
  return getFormatter(locale, { year: 'numeric', month: 'short', day: 'numeric' }, timezone).format(toValidDate(date));
}

/** Format date + hour/minute in a natural localized form with explicit timezone. */
export function formatLocalizedDateTime(date: Date | string, locale: string, timezone = 'Asia/Shanghai'): string {
  return getFormatter(
    locale,
    { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false },
    timezone,
  ).format(toValidDate(date));
}

/** Format month + day in a natural localized form (e.g. for archive/timeline rows). */
export function formatLocalizedMonthDay(date: Date | string, locale: string, timezone = 'Asia/Shanghai'): string {
  return getFormatter(locale, { month: 'short', day: 'numeric' }, timezone).format(toValidDate(date));
}

/** Format a localized month heading (e.g. "2025年1月", "January 2025", "janvier 2025"). */
export function formatLocalizedMonthYear(year: number, month: number, locale: string, timezone = 'Asia/Shanghai'): string {
  // Use noon UTC on the 15th to avoid any timezone boundary rollover between months.
  const anchor = new Date(Date.UTC(year, month - 1, 15, 12, 0, 0));
  return getFormatter(locale, { year: 'numeric', month: 'long' }, timezone).format(anchor);
}
