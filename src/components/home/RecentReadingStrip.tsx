/**
 * RecentReadingStrip — Compact local reading history bar on the homepage.
 *
 * Returns null when no local reading history exists so first-time visitors see
 * zero extra clutter. Supports continue-reading (with scroll resume), single-item
 * deletion, and clear-all with toast feedback.
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { getRelativeTimeToken, isEntryCompleted } from '@lib/reading-history';
import { useStore } from '@nanostores/react';
import { $readingHistory, clearAllReadingHistory, initReadingHistory, removeReadingItem } from '@store/reading-history';
import { useEffect } from 'react';

interface RecentReadingStripProps {
  locale: string;
  limit?: number;
}

export default function RecentReadingStrip({ locale, limit = 4 }: RecentReadingStripProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const history = useStore($readingHistory);

  useEffect(() => {
    initReadingHistory();
  }, []);

  if (!isMounted || history.length === 0) return null;

  const visibleItems = history.slice(0, limit);

  const handleClearAll = async () => {
    clearAllReadingHistory();
    try {
      const { toast } = await import('sonner');
      toast.success(t('history.cleared'));
    } catch {
      // Non-fatal
    }
  };

  return (
    <section
      aria-label={t('history.title')}
      data-recent-reading
      className="border-primary/15 bg-primary/[0.03] dark:bg-card/80 mb-2 rounded-xl border p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon icon="ri:history-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
          <h2 className="text-foreground text-sm font-semibold">{t('history.title')}</h2>
          <span className="bg-primary/12 text-primary rounded-full px-2 py-0.5 text-xs font-medium tabular-nums">
            {history.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => void handleClearAll()}
          data-clear-history
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors"
        >
          <Icon icon="ri:delete-bin-6-line" className="size-3.5" aria-hidden="true" />
          <span>{t('history.clearAll')}</span>
        </button>
      </div>

      <ul className={visibleItems.length === 1 ? 'grid grid-cols-1 gap-2.5' : 'grid grid-cols-2 gap-2.5 md:grid-cols-1'}>
        {visibleItems.map((item) => {
          const completed = isEntryCompleted(item);
          const timeToken = getRelativeTimeToken(item.lastReadAt);
          const timeText = timeToken.count !== undefined ? t(timeToken.key, { count: timeToken.count }) : t(timeToken.key);
          const resumeHref = item.scrollY > 40 ? `${item.url}?resume=1` : item.url;

          return (
            <li
              key={item.slug}
              className="bg-background/85 border-border/70 hover:border-primary/30 group relative flex flex-col justify-between gap-2 rounded-lg border p-3 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <a
                  href={resumeHref}
                  className="text-foreground hover:text-primary line-clamp-1 text-sm font-medium transition-colors"
                >
                  {item.title}
                </a>
                <button
                  type="button"
                  onClick={() => removeReadingItem(item.slug)}
                  aria-label={`${t('history.removeItem')}: ${item.title}`}
                  title={t('history.removeItem')}
                  className="text-muted-foreground/70 hover:bg-foreground/8 hover:text-foreground -mt-0.5 -mr-1 flex size-6 shrink-0 items-center justify-center rounded-md transition-colors"
                >
                  <Icon icon="ri:close-line" className="size-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-muted-foreground truncate">
                  {completed ? t('history.completed') : t('history.progress', { percent: item.progress })} · {timeText}
                </span>
                <a
                  href={resumeHref}
                  className="text-primary inline-flex shrink-0 items-center gap-0.5 font-medium hover:underline"
                >
                  <span>{t('history.continueReading')}</span>
                  <Icon icon="ri:arrow-right-s-line" className="size-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="bg-muted h-1 w-full overflow-hidden rounded-full" aria-hidden="true">
                <div
                  className="bg-primary h-full rounded-full transition-[width] duration-300"
                  style={{ width: `${Math.max(4, item.progress)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
