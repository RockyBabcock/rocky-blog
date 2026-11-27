/**
 * RightRailWidgets — Interactive client island for the homepage Desktop Right Utility Rail.
 *
 * Includes:
 * 1. Quick Search & Command Palette triggers (`/` & `⌘K`)
 * 2. Continue Reading widget backed strictly by `$readingHistory` (honest empty state when empty)
 * 3. Active Series Progress summary backed by real series items + `$readingHistory`
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { getRelativeTimeToken, isEntryCompleted } from '@lib/reading-history';
import { computeSeriesProgress, type SeriesRouteItem } from '@lib/series-progress';
import { useStore } from '@nanostores/react';
import { openModal } from '@store/modal';
import { $readingHistory, clearAllReadingHistory, initReadingHistory, removeReadingItem } from '@store/reading-history';
import { useEffect, useMemo } from 'react';

export interface RailSeriesInfo {
  slug: string;
  title: string;
  href: string;
  items: SeriesRouteItem[];
}

interface RightRailWidgetsProps {
  locale: string;
  primarySeries: RailSeriesInfo | null;
}

export default function RightRailWidgets({ locale, primarySeries }: RightRailWidgetsProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const history = useStore($readingHistory);

  useEffect(() => {
    initReadingHistory();
  }, []);

  const visibleHistory = isMounted ? history.slice(0, 3) : [];
  const seriesSummary = useMemo(
    () => (primarySeries ? computeSeriesProgress(primarySeries.items, isMounted ? history : []) : null),
    [primarySeries, history, isMounted],
  );

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
    <div className="flex flex-col gap-3.5">
      {/* 1. Quick Search & Command Launcher */}
      <section className="rail-card" aria-label={t('common.search')}>
        <button
          type="button"
          onClick={() => openModal('search')}
          data-rail-search-trigger
          className="border-border/80 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-foreground flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-colors"
        >
          <Icon icon="ri:search-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate">{t('home.railSearchHint')}</span>
          <kbd className="kbd shrink-0 text-[10px]">/</kbd>
        </button>
        <div className="flex items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={() => openModal('command')}
            data-rail-command-trigger
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 transition-colors"
          >
            <Icon icon="ri:command-line" className="size-3.5" aria-hidden="true" />
            <span>{t('command.title')}</span>
          </button>
          <kbd className="kbd text-[10px]">⌘K</kbd>
        </div>
      </section>

      {/* 2. Continue Reading (Real Local History or Calm Honest Empty State) */}
      <section className="rail-card" aria-label={t('history.title')} data-rail-reading-history>
        <div className="rail-card-title">
          <span className="inline-flex items-center gap-1.5">
            <Icon icon="ri:history-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
            <span>{t('history.title')}</span>
          </span>
          {visibleHistory.length > 0 && (
            <button
              type="button"
              onClick={() => void handleClearAll()}
              data-clear-history
              className="text-muted-foreground hover:text-primary text-[11px] font-normal transition-colors"
            >
              {t('history.clearAll')}
            </button>
          )}
        </div>

        {visibleHistory.length > 0 ? (
          <ul className="flex flex-col gap-2.5">
            {visibleHistory.map((item) => {
              const completed = isEntryCompleted(item);
              const timeToken = getRelativeTimeToken(item.lastReadAt);
              const timeText = timeToken.count !== undefined ? t(timeToken.key, { count: timeToken.count }) : t(timeToken.key);
              const resumeHref = item.scrollY > 40 ? `${item.url}?resume=1` : item.url;

              return (
                <li
                  key={item.slug}
                  className="bg-background/75 border-border/60 hover:border-primary/30 flex flex-col gap-1.5 rounded-lg border p-2.5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <a
                      href={resumeHref}
                      className="text-foreground hover:text-primary line-clamp-2 text-xs leading-snug font-medium transition-colors"
                    >
                      {item.title}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeReadingItem(item.slug)}
                      aria-label={`${t('history.removeItem')}: ${item.title}`}
                      className="text-muted-foreground/70 hover:text-foreground -mt-0.5 -mr-0.5 flex size-5 shrink-0 items-center justify-center rounded transition-colors"
                    >
                      <Icon icon="ri:close-line" className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="text-muted-foreground flex items-center justify-between gap-2 text-[11px] tabular-nums">
                    <span className="truncate">
                      {completed ? t('history.completed') : t('history.progress', { percent: item.progress })} · {timeText}
                    </span>
                    <a href={resumeHref} className="text-primary shrink-0 font-medium hover:underline">
                      {t('history.continueReading')}
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
        ) : (
          <div className="empty-state-plate !gap-2 !px-3 !py-3.5 text-xs">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" className="text-primary/65" aria-hidden="true">
              <path
                d="M11 7.5A2.5 2.5 0 0 1 13.5 5h9A2.5 2.5 0 0 1 25 7.5v22l-7-4.5-7 4.5v-22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M15 12h6M15 16h6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeOpacity="0.6" />
            </svg>
            <p className="text-muted-foreground leading-relaxed">{t('home.railHistoryEmptyHint')}</p>
            <a href="#home-content" className="text-primary inline-flex w-fit items-center gap-1 font-medium hover:underline">
              <span>{t('home.railStartExplore')}</span>
              <Icon icon="ri:arrow-right-s-line" className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </section>

      {/* 3. Active Series Progress */}
      {primarySeries && seriesSummary && (
        <section className="rail-card" aria-label={t('series.progressTitle')}>
          <div className="rail-card-title">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <Icon icon="ri:book-2-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{primarySeries.title}</span>
            </span>
            <span className="text-primary shrink-0 text-xs font-semibold tabular-nums">{seriesSummary.percent}%</span>
          </div>

          <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full" aria-hidden="true">
            <div
              className="bg-primary h-full rounded-full transition-[width] duration-300"
              style={{ width: `${seriesSummary.percent}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-muted-foreground tabular-nums">
              {t('series.completedCount', { read: seriesSummary.completedCount, total: seriesSummary.total })}
            </span>
            <a
              href={seriesSummary.recommendedItem?.href ?? primarySeries.href}
              className="text-primary inline-flex shrink-0 items-center gap-0.5 font-medium hover:underline"
            >
              <span>{seriesSummary.hasStarted ? t('series.continueReading') : t('series.startReading')}</span>
              <Icon icon="ri:arrow-right-s-line" className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
