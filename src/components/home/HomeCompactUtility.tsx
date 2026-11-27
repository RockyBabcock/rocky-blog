/**
 * HomeCompactUtility — Lightweight Search + Command trigger bar shown on viewports < 1280px
 * where the desktop right rail collapses, ensuring effortless discovery on tablet and mobile.
 */

import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { openModal } from '@store/modal';

interface HomeCompactUtilityProps {
  locale: string;
}

export default function HomeCompactUtility({ locale }: HomeCompactUtilityProps) {
  const { t } = useTranslation(locale);

  return (
    <div className="flex items-center gap-2" data-compact-search-bar>
      <button
        type="button"
        onClick={() => openModal('search')}
        className="border-border bg-card text-muted-foreground hover:border-primary/45 hover:text-foreground flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left text-xs transition-colors"
      >
        <Icon icon="ri:search-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate">{t('home.railSearchHint')}</span>
      </button>
      <button
        type="button"
        onClick={() => openModal('command')}
        aria-label={t('command.title')}
        className="border-border bg-card text-muted-foreground hover:border-primary/45 hover:text-primary inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors"
      >
        <Icon icon="ri:command-line" className="size-4 shrink-0" aria-hidden="true" />
        <span className="xs:hidden">{t('command.trigger')}</span>
      </button>
    </div>
  );
}
