/**
 * RightRailWidgets — Interactive client island for the homepage Desktop Right Utility Rail.
 *
 * Includes:
 * 1. Quick Search & Command Palette triggers (`/` & `⌘K`)
 * 2. Reading Shelf compact companion (saved count + 2 most recently saved items + direct `/shelf` link)
 * 3. Continue Reading widget backed strictly by `$readingHistory`
 * 4. Multi-Series Progress summary (each enabled series tracks its own independent progress)
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { getRelativeTimeToken, isEntryCompleted } from '@lib/reading-history';
import { enrichSavedArticles } from '@lib/saved-articles';
import { computeSeriesProgress, type SeriesRouteItem } from '@lib/series-progress';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { openModal } from '@store/modal';
import { $readingHistory, clearAllReadingHistory, initReadingHistory, removeReadingItem } from '@store/reading-history';
import { $savedArticles, initSavedArticles, removeSavedArticleItem } from '@store/saved-articles';
import { useEffect, useMemo, useState } from 'react';
import { localizedPath } from '@/i18n';

export interface RailSeriesInfo {
  slug: string;
  title: string;
  href: string;
  items: SeriesRouteItem[];
}

interface RightRailWidgetsProps {
  locale: string;
  seriesList: RailSeriesInfo[];
}

export default function RightRailWidgets({ locale, seriesList }: RightRailWidgetsProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const history = useStore($readingHistory);
  const savedArticles = useStore($savedArticles);
  const [activeSeriesSlug, setActiveSeriesSlug] = useState(seriesList[0]?.slug ?? '');

  useEffect(() => {
    initReadingHistory();
    initSavedArticles();
  }, []);

  const visibleHistory = isMounted ? history.slice(0, 2) : [];
  const enrichedSaved = useMemo(
    () => (isMounted ? enrichSavedArticles(savedArticles, history) : []),
    [savedArticles, history, isMounted],
  );
  const recentSaved = enrichedSaved.slice(0, 2);

  const activeSeries = useMemo(
    () => seriesList.find((s) => s.slug === activeSeriesSlug) ?? seriesList[0] ?? null,
    [seriesList, activeSeriesSlug],
  );
  const seriesSummary = useMemo(
    () => (activeSeries ? computeSeriesProgress(activeSeries.items, isMounted ? history : []) : null),
    [activeSeries, history, isMounted],
  );

  const shelfHref = localizedPath('/shelf', locale);

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
          className="border-border/85 bg-background/80 text-muted-foreground hover:border-primary/45 hover:text-foreground flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-colors"
        >
          <Icon icon="ri:search-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate">{t('home.railSearchHint')}</span>
          <kbd className="kbd shrink-0 text-[10px]">/</kbd>
        </button>
        <div className="flex items-center justify-between gap-2 px-0.5 text-xs">
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

      {/* 2. Unified Reading Companion Sheet (Shelf + Continue Reading + Series Progress) */}
      <div className="rail-panel">
        {/* Reading Shelf */}
        <section className="rail-section" aria-label={t('shelf.railTitle')} data-rail-reading-shelf>
          <div className="rail-card-title">
            <a href={shelfHref} className="hover:text-primary inline-flex items-center gap-1.5 transition-colors">
              <Icon icon="ri:bookmark-3-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
              <span>{t('shelf.railTitle')}</span>
              {isMounted && enrichedSaved.length > 0 && (
                <span className="bg-primary/12 text-primary rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums">
                  {enrichedSaved.length}
                </span>
              )}
            </a>
            <a href={shelfHref} className="text-muted-foreground hover:text-primary text-[11px] font-normal transition-colors">
              {t('shelf.railOpenShelf')}
            </a>
          </div>

          {recentSaved.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {recentSaved.map((item) => {
                const openHref = item.status === 'in-progress' && item.scrollY > 40 ? `${item.url}?resume=1` : item.url;
                return (
                  <li
                    key={`${item.locale}:${item.slug}`}
                    className="bg-background/70 border-border/65 hover:border-primary/35 flex items-start justify-between gap-2 rounded-lg border px-2.5 py-2 transition-colors"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <a
                        href={openHref}
                        className="text-foreground hover:text-primary line-clamp-2 text-xs leading-snug font-medium transition-colors"
                      >
                        {item.title}
                      </a>
                      <span className="text-muted-foreground text-[10px] tabular-nums">
                        {item.status === 'completed'
                          ? t('shelf.filterCompleted')
                          : item.status === 'in-progress'
                            ? t('history.progress', { percent: item.progress })
                            : t('shelf.filterToRead')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSavedArticleItem(item.slug, item.locale)}
                      aria-label={`${t('shelf.remove')}: ${item.title}`}
                      className="text-muted-foreground/70 hover:text-foreground -mt-0.5 -mr-0.5 flex size-5 shrink-0 items-center justify-center rounded transition-colors"
                    >
                      <Icon icon="ri:close-line" className="size-3.5" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-muted-foreground text-xs leading-relaxed">{t('shelf.railEmpty')}</p>
          )}
        </section>

        {/* Continue Reading */}
        <section className="rail-section" aria-label={t('history.title')} data-rail-reading-history>
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
            <ul className="flex flex-col gap-2">
              {visibleHistory.map((item) => {
                const completed = isEntryCompleted(item);
                const timeToken = getRelativeTimeToken(item.lastReadAt);
                const timeText =
                  timeToken.count !== undefined ? t(timeToken.key, { count: timeToken.count }) : t(timeToken.key);
                const resumeHref = item.scrollY > 40 ? `${item.url}?resume=1` : item.url;

                return (
                  <li
                    key={item.slug}
                    className="bg-background/70 border-border/65 hover:border-primary/35 flex flex-col gap-1.5 rounded-lg border p-2.5 transition-colors"
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
            <div className="empty-state-plate !gap-1.5 !px-3 !py-2.5 text-xs">
              <p className="text-muted-foreground leading-relaxed">{t('home.railHistoryEmptyHint')}</p>
              <a
                href="#home-content"
                className="text-primary inline-flex w-fit items-center gap-0.5 font-medium hover:underline"
              >
                <span>{t('home.railStartExplore')}</span>
                <Icon icon="ri:arrow-right-s-line" className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          )}
        </section>

        {/* Multi-Series Independent Progress Tracker */}
        {activeSeries && seriesSummary && (
          <section className="rail-section" aria-label={t('series.progressTitle')}>
            <div className="rail-card-title">
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <Icon icon="ri:book-2-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{activeSeries.title}</span>
              </span>
              <span className="text-primary shrink-0 font-mono text-[11px] font-semibold tabular-nums">
                {seriesSummary.percent}%
              </span>
            </div>

            {seriesList.length > 1 && (
              <div className="flex flex-wrap gap-1" role="tablist" aria-label={t('home.seriesSection')}>
                {seriesList.map((series) => {
                  const selected = series.slug === activeSeries.slug;
                  return (
                    <button
                      key={series.slug}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveSeriesSlug(series.slug)}
                      className={cn(
                        'rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors',
                        selected
                          ? 'border-primary/45 bg-primary/12 text-primary'
                          : 'border-border/70 text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {series.title}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="bg-muted h-1 w-full overflow-hidden rounded-full" aria-hidden="true">
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
                href={seriesSummary.recommendedItem?.href ?? activeSeries.href}
                className="text-primary inline-flex shrink-0 items-center gap-0.5 font-medium hover:underline"
              >
                <span>{seriesSummary.hasStarted ? t('series.continueReading') : t('series.startReading')}</span>
                <Icon icon="ri:arrow-right-s-line" className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
