import { useMotionLevel } from '@hooks/useMotionLevel';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { type MotionLevel, setMotionLevel } from '@lib/motion-level';
import { useStore } from '@nanostores/react';
import { $isSettingsOpen, closeSettings } from '@store/modal';
import { bgmWidgetEnabled, scrollProgressEnabled, setBgmWidgetEnabled, setScrollProgressEnabled } from '@store/settings';
import { useEffect, useState } from 'react';

export function preloadSettingsPanel() {
  // No-op preload hook for FloatingGroup hover intent
}

export default function SettingsPanel() {
  const isOpen = useStore($isSettingsOpen);
  const showProgress = useStore(scrollProgressEnabled);
  const showBgm = useStore(bgmWidgetEnabled);
  const motionLevel = useMotionLevel();
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsDark(document.documentElement.classList.contains('dark'));
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSettings();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const applyTheme = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark);
    setIsDark(dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {}
  };

  const motionOptions: Array<{ value: MotionLevel; label: string }> = [
    { value: 'lively', label: t('settings.lively') },
    { value: 'subtle', label: t('settings.subtle') },
    { value: 'reduced', label: t('settings.reduced') },
  ];

  return (
    <div
      className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t('settings.title')}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSettings();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-base">
            <Icon icon="ri:settings-3-line" className="size-5 text-primary" />
            {t('settings.title')}
          </h2>
          <button
            type="button"
            onClick={closeSettings}
            aria-label={t('common.close')}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icon icon="ri:close-line" className="size-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <p className="mb-2 font-medium text-muted-foreground text-xs">{t('settings.theme')}</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => applyTheme(false)}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
                  !isDark ? 'border-primary bg-primary/10 font-medium text-primary' : 'border-border hover:bg-muted'
                }`}
              >
                <Icon icon="ri:sun-line" className="size-4" />
                {t('settings.light')}
              </button>
              <button
                type="button"
                onClick={() => applyTheme(true)}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
                  isDark ? 'border-primary bg-primary/10 font-medium text-primary' : 'border-border hover:bg-muted'
                }`}
              >
                <Icon icon="ri:moon-line" className="size-4" />
                {t('settings.dark')}
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium text-muted-foreground text-xs">{t('settings.motion')}</p>
            <div className="grid grid-cols-3 gap-2">
              {motionOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setMotionLevel(opt.value)}
                  className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition-colors ${
                    motionLevel === opt.value
                      ? 'border-primary bg-primary/10 font-medium text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <label className="flex cursor-pointer items-center justify-between text-sm">
              <span>{t('settings.scrollProgress')}</span>
              <input
                type="checkbox"
                checked={showProgress}
                onChange={(e) => setScrollProgressEnabled(e.target.checked)}
                className="size-4 accent-primary"
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between text-sm">
              <span>{t('settings.bgmWidget')}</span>
              <input
                type="checkbox"
                checked={showBgm}
                onChange={(e) => setBgmWidgetEnabled(e.target.checked)}
                className="size-4 accent-primary"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
