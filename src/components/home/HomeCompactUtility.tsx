/**
 * HomeCompactUtility — Lightweight Search + Reading Shelf + Command bar shown on
 * viewports < 1280px where the desktop right rail collapses, ensuring effortless discovery
 * on tablet and mobile without crowding the interface.
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { useStore } from '@nanostores/react';
import { openModal } from '@store/modal';
import { $savedArticles, initSavedArticles } from '@store/saved-articles';
import { useEffect } from 'react';
import { localizedPath } from '@/i18n';

interface HomeCompactUtilityProps {
  locale: string;
}

export default function HomeCompactUtility({ locale }: HomeCompactUtilityProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const saved = useStore($savedArticles);

  useEffect(() => {
    initSavedArticles();
  }, []);

  const savedCount = isMounted ? saved.length : 0;
  const shelfHref = localizedPath('/shelf', locale);

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
      <a
        href={shelfHref}
        aria-label={t('nav.shelf')}
        data-compact-shelf-link
        className="border-border bg-card text-muted-foreground hover:border-primary/45 hover:text-primary inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors"
      >
        <Icon icon="ri:bookmark-3-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
        <span className="xs:hidden">{t('nav.shelf')}</span>
        {savedCount > 0 && (
          <span className="bg-primary/14 text-primary rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums">
            {savedCount}
          </span>
        )}
      </a>
      <button
        type="button"
        onClick={() => openModal('command')}
        aria-label={t('command.title')}
        className="border-border bg-card text-muted-foreground hover:border-primary/45 hover:text-primary inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors"
      >
        <Icon icon="ri:command-line" className="size-4 shrink-0" aria-hidden="true" />
        <span className="md:hidden">{t('command.trigger')}</span>
      </button>
    </div>
  );
}
