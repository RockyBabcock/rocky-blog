import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { defaultLocale, t } from '@/i18n';

interface ThemeToggleProps {
  locale?: string;
}

export default function ThemeToggle({ locale = defaultLocale }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    setIsDark(next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(locale, 'common.themeToggle')}
      title={t(locale, 'common.themeToggle')}
      className="flex size-10 cursor-pointer items-center justify-center rounded-full transition-[background-color,scale] duration-200 hover:bg-current/15 active:scale-90"
    >
      <Icon
        icon={isDark ? 'ri:moon-clear-fill' : 'ri:sun-fill'}
        className="size-5 transition-transform duration-300"
      />
    </button>
  );
}
