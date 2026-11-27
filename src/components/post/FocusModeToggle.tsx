/**
 * FocusModeToggle — Toggles distraction-free Focus Reading Mode on post pages.
 *
 * - Renders a compact button in the article toolbar
 * - When active, renders a subtle floating bar at top-right for 1-click exit or opening reader settings
 * - Supports `Shift+F` toggle (outside editable inputs) and `Esc` exit (when no modal is open)
 * - Resets automatically when navigating off a post page
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { isEditableTarget } from '@lib/commands';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { $isFocusMode, exitFocusMode, toggleFocusMode } from '@store/focus-mode';
import { $isAnyModalOpen, toggleSettings } from '@store/modal';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FocusModeToggleProps {
  locale: string;
}

export default function FocusModeToggle({ locale }: FocusModeToggleProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const isFocusMode = useStore($isFocusMode);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && $isFocusMode.get() && !$isAnyModalOpen.get()) {
        event.preventDefault();
        exitFocusMode();
        return;
      }
      if (
        event.shiftKey &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        event.key.toLowerCase() === 'f' &&
        !$isAnyModalOpen.get() &&
        !isEditableTarget(event.target)
      ) {
        event.preventDefault();
        toggleFocusMode();
      }
    };

    const onBeforeSwap = () => exitFocusMode();

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('astro:before-swap', onBeforeSwap);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('astro:before-swap', onBeforeSwap);
      exitFocusMode();
    };
  }, []);

  const label = isFocusMode ? t('focus.exit') : t('focus.enter');

  return (
    <>
      <button
        type="button"
        onClick={toggleFocusMode}
        aria-pressed={isFocusMode}
        aria-label={label}
        title={isMounted ? label : undefined}
        data-focus-toggle
        className={cn(
          'focus-visible:ring-primary/50 flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition-[background-color,border-color,transform] duration-200 outline-none focus-visible:ring-2 active:scale-95',
          isFocusMode
            ? 'bg-primary border-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-primary/10 border-primary/18 text-primary hover:border-primary/35 hover:bg-primary/18',
        )}
      >
        <Icon
          icon={isFocusMode ? 'ri:fullscreen-exit-line' : 'ri:book-open-line'}
          aria-hidden="true"
          className="size-3.5 shrink-0"
        />
        <span className="hidden sm:inline">{label}</span>
      </button>

      {isMounted &&
        isFocusMode &&
        createPortal(
          <div
            role="toolbar"
            aria-label={t('focus.active')}
            data-focus-bar
            className="bg-background/90 border-border/80 shadow-sakura-md fixed top-4 right-4 z-40 flex items-center gap-1.5 rounded-full border px-2 py-1.5 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={toggleSettings}
              aria-label={t('floating.settings')}
              title={t('floating.settings')}
              className="text-muted-foreground hover:bg-primary/10 hover:text-primary flex size-8 items-center justify-center rounded-full transition-colors"
            >
              <Icon icon="ri:font-size-2" className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={exitFocusMode}
              title={t('focus.shortcutHint')}
              data-focus-exit
              className="bg-primary/12 text-primary hover:bg-primary/20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <Icon icon="ri:fullscreen-exit-line" className="size-3.5" aria-hidden="true" />
              <span>{t('focus.exit')}</span>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
