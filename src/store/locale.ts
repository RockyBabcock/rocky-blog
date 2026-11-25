import { atom } from 'nanostores';
import { defaultLocale } from '@/i18n';

export const $locale = atom<string>(defaultLocale);

export function setLocale(locale: string) {
  $locale.set(locale || defaultLocale);
}

export function syncLocaleFromPath(pathname: string) {
  const clean = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const first = clean.split('/')[0];
  if (first === 'en' || first === 'ja' || first === 'ko') {
    $locale.set(first);
  } else {
    $locale.set(defaultLocale);
  }
}
