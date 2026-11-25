import { useStore } from '@nanostores/react';
import { $locale, syncLocaleFromPath } from '@store/locale';
import { useEffect } from 'react';
import { t as translate } from '@/i18n';

export function useTranslation(explicitLocale?: string) {
  const storeLocale = useStore($locale);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sync = () => syncLocaleFromPath(window.location.pathname);
    sync();
    document.addEventListener('astro:page-load', sync);
    return () => document.removeEventListener('astro:page-load', sync);
  }, []);

  const locale = explicitLocale ?? storeLocale;
  const t = (key: string, params?: Record<string, string | number>) => translate(locale, key, params);

  return { t, locale };
}
