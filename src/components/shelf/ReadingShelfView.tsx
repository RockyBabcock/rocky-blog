/**
 * ReadingShelfView — Personal Digital Library UI for `/shelf` and `/<lang>/shelf`.
 *
 * Combines `$savedArticles` with `$readingHistory` (single source of truth for reading progress)
 * to derive To Read / In Progress / Completed statuses without duplicating progress records.
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { formatLocalizedDate } from '@lib/date';
import {
  countShelfStatuses,
  type EnrichedSavedArticle,
  enrichSavedArticles,
  filterAndSortSavedArticles,
  type ShelfFilterStatus,
  type ShelfSortOrder,
} from '@lib/saved-articles';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { $readingHistory, initReadingHistory } from '@store/reading-history';
import {
  $savedArticles,
  $savedArticlesHydrated,
  $savedArticlesStorageAvailable,
  clearAllSavedArticles,
  initSavedArticles,
  removeSavedArticleItem,
} from '@store/saved-articles';
import { useEffect, useMemo, useState } from 'react';
import { localizedPath } from '@/i18n';

export interface ShelfCatalogMeta {
  cover?: string;
  category?: string;
  description?: string;
  publishedAt?: string;
  readingTime?: string;
}

export interface ReadingShelfViewProps {
  locale: string;
  catalog: Record<string, ShelfCatalogMeta>;
}

const STATUS_TABS: readonly ShelfFilterStatus[] = ['all', 'to-read', 'in-progress', 'completed'];

export default function ReadingShelfView({ locale, catalog }: ReadingShelfViewProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const saved = useStore($savedArticles);
  const storeHydrated = useStore($savedArticlesHydrated);
  const isHydrated = isMounted && storeHydrated;
  const storageAvailable = useStore($savedArticlesStorageAvailable);
  const history = useStore($readingHistory);

  const [statusFilter, setStatusFilter] = useState<ShelfFilterStatus>('all');
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<ShelfSortOrder>('saved-desc');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [confirmingClear, setConfirmingClear] = useState(false);

  useEffect(() => {
    initSavedArticles();
    initReadingHistory();
  }, []);

  // Enrich saved entries with live reading history + real build-time catalog metadata (no fake data)
  const enriched = useMemo<EnrichedSavedArticle[]>(() => {
    const merged = saved.map((entry) => {
      const meta = catalog[entry.slug];
      return {
        ...entry,
        cover: entry.cover ?? meta?.cover,
        category: entry.category ?? meta?.category,
        description: entry.description ?? meta?.description,
        publishedAt: entry.publishedAt ?? meta?.publishedAt,
        readingTime: entry.readingTime ?? meta?.readingTime,
      };
    });
    return enrichSavedArticles(merged, history);
  }, [saved, history, catalog]);

  const counts = useMemo(() => countShelfStatuses(enriched), [enriched]);

  const visibleItems = useMemo(
    () => filterAndSortSavedArticles(enriched, { status: statusFilter, query, sort: sortOrder, locale }),
    [enriched, statusFilter, query, sortOrder, locale],
  );

  const statusTabLabels: Record<ShelfFilterStatus, string> = {
    all: t('shelf.filterAll'),
    'to-read': t('shelf.filterToRead'),
    'in-progress': t('shelf.filterInProgress'),
    completed: t('shelf.filterCompleted'),
  };

  const handleRemove = async (entry: EnrichedSavedArticle) => {
    removeSavedArticleItem(entry.slug, entry.locale);
    try {
      const { toast } = await import('sonner');
      toast.success(t('bookmark.toastRemoved'));
    } catch {
      // Non-fatal
    }
  };

  const handleConfirmClear = async () => {
    clearAllSavedArticles();
    setConfirmingClear(false);
    setStatusFilter('all');
    setQuery('');
    try {
      const { toast } = await import('sonner');
      toast.success(t('shelf.cleared'));
    } catch {
      // Non-fatal
    }
  };

  const resetFilters = () => {
    setStatusFilter('all');
    setQuery('');
  };

  const homeHref = localizedPath('/', locale);
  const archivesHref = localizedPath('/archives', locale);

  return (
    <div className="flex flex-col gap-6" data-reading-shelf>
      {/* Editorial Library Header */}
      <header className="border-border/75 flex flex-wrap items-end justify-between gap-4 border-b pb-5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="editorial-kicker" data-style="ruled">
            <span className="editorial-kicker-rule" aria-hidden="true" />
            <span className="editorial-kicker-diamond" aria-hidden="true" />
            <span>{t('shelf.kicker')}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-2xl">{t('shelf.title')}</h1>
            {isHydrated && (
              <span className="border-border bg-muted/75 text-muted-foreground inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-xs font-medium tabular-nums">
                {t('shelf.countLabel', { count: counts.all })}
              </span>
            )}
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">{t('shelf.subtitle')}</p>
        </div>

        {/* Subtle Botanical Emblem */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          className="text-primary/55 shrink-0 fill-none md:hidden"
          aria-hidden="true"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeDasharray="2 3"
            strokeOpacity="0.55"
          />
          <path
            d="M18 10.5C19.4 13.8 21.8 16.2 25.5 18C21.8 19.8 19.4 22.2 18 25.5C16.6 22.2 14.2 19.8 10.5 18C14.2 16.2 16.6 13.8 18 10.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="18" r="1.6" fill="currentColor" />
        </svg>
      </header>

      {/* Storage Unavailable Notice */}
      {isHydrated && !storageAvailable && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300"
        >
          <Icon icon="ri:error-warning-line" className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{t('bookmark.storageUnavailable')}</span>
        </div>
      )}

      {/* Hydration / Loading Transition */}
      {!isHydrated ? (
        <div role="status" className="flex flex-col gap-4 py-4" aria-busy="true" aria-label={t('shelf.loading')}>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-muted h-8 w-24 animate-pulse rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {[1, 2].map((n) => (
              <div key={n} className="border-border bg-card h-44 animate-pulse rounded-xl border" />
            ))}
          </div>
        </div>
      ) : counts.all === 0 ? (
        /* First-Time Empty Shelf State */
        <section className="empty-state-plate my-4 !py-12" data-shelf-empty>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-primary/65 fill-none" aria-hidden="true">
            <rect
              x="11"
              y="7"
              width="26"
              height="34"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.45"
            />
            <path
              d="M19 7v17l5-3.2 5 3.2V7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.12"
            />
            <path
              d="M16 31h16M16 35.5h10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </svg>
          <h2 className="text-foreground mt-1 text-lg font-semibold">{t('shelf.emptyTitle')}</h2>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{t('shelf.emptyHint')}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`${homeHref}#home-content`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              <Icon icon="ri:compass-3-line" className="size-4" aria-hidden="true" />
              <span>{t('shelf.emptyExploreLatest')}</span>
            </a>
            <a
              href={archivesHref}
              className="border-border bg-background text-foreground hover:border-primary/45 hover:text-primary inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
            >
              <Icon icon="ri:archive-2-line" className="size-4" aria-hidden="true" />
              <span>{t('shelf.emptyBrowseArchives')}</span>
            </a>
          </div>
        </section>
      ) : (
        <>
          {/* Reading Status Navigation & Controls */}
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label={t('shelf.title')}
                className="shelf-status-tabs flex flex-wrap items-center gap-1.5"
              >
                {STATUS_TABS.map((status) => {
                  const active = statusFilter === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      data-shelf-tab={status}
                      onClick={() => setStatusFilter(status)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                        active
                          ? 'bg-primary text-primary-foreground border-primary/80 shadow-xs'
                          : 'border-border/80 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
                      )}
                    >
                      <span>{statusTabLabels[status]}</span>
                      <span
                        className={cn(
                          'font-mono text-[11px] tabular-nums',
                          active ? 'text-primary-foreground/85' : 'text-muted-foreground/80',
                        )}
                      >
                        {counts[status]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Clear Shelf (Two-Step Inline Confirmation) */}
              {!confirmingClear ? (
                <button
                  type="button"
                  onClick={() => setConfirmingClear(true)}
                  data-shelf-clear-trigger
                  className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs transition-colors"
                >
                  <Icon icon="ri:delete-bin-6-line" className="size-3.5" aria-hidden="true" />
                  <span>{t('shelf.clearAll')}</span>
                </button>
              ) : (
                <div
                  role="alertdialog"
                  aria-label={t('shelf.clearConfirmTitle')}
                  className="border-primary/35 bg-primary/8 flex flex-wrap items-center gap-2 rounded-lg border px-3 py-1.5 text-xs"
                >
                  <span className="text-foreground font-medium">{t('shelf.clearConfirmTitle')}</span>
                  <button
                    type="button"
                    onClick={() => void handleConfirmClear()}
                    data-shelf-clear-confirm
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-2.5 py-1 font-medium transition-colors"
                  >
                    {t('shelf.clearConfirmAction')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingClear(false)}
                    className="border-border bg-card text-foreground hover:border-primary/40 rounded-md border px-2.5 py-1 transition-colors"
                  >
                    {t('shelf.clearCancel')}
                  </button>
                </div>
              )}
            </div>

            {/* Search, Sort & View Switcher */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="border-border bg-card focus-within:border-primary/50 flex min-w-52 flex-1 items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors">
                <Icon icon="ri:search-line" className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('shelf.searchPlaceholder')}
                  aria-label={t('shelf.searchPlaceholder')}
                  data-shelf-search
                  className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-xs outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t('common.close')}
                    className="text-muted-foreground hover:text-foreground inline-flex size-5 items-center justify-center rounded"
                  >
                    <Icon icon="ri:close-line" className="size-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              <label className="sr-only" htmlFor="shelf-sort-select">
                {t('shelf.sortNewest')}
              </label>
              <select
                id="shelf-sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as ShelfSortOrder)}
                data-shelf-sort
                className="border-border bg-card text-foreground focus:border-primary/50 rounded-xl border px-3 py-2 text-xs font-medium transition-colors outline-none"
              >
                <option value="saved-desc">{t('shelf.sortNewest')}</option>
                <option value="saved-asc">{t('shelf.sortOldest')}</option>
                <option value="title-asc">{t('shelf.sortTitle')}</option>
              </select>

              <fieldset className="border-border bg-card inline-flex items-center rounded-xl border p-0.5 md:hidden">
                <button
                  type="button"
                  onClick={() => setLayout('grid')}
                  aria-pressed={layout === 'grid'}
                  aria-label={t('shelf.layoutGrid')}
                  title={t('shelf.layoutGrid')}
                  className={cn(
                    'inline-flex size-7.5 items-center justify-center rounded-lg transition-colors',
                    layout === 'grid' ? 'bg-primary/14 text-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon icon="ri:layout-grid-line" className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayout('list')}
                  aria-pressed={layout === 'list'}
                  aria-label={t('shelf.layoutList')}
                  title={t('shelf.layoutList')}
                  className={cn(
                    'inline-flex size-7.5 items-center justify-center rounded-lg transition-colors',
                    layout === 'list' ? 'bg-primary/14 text-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon icon="ri:list-check-2" className="size-4" aria-hidden="true" />
                </button>
              </fieldset>
            </div>
          </div>

          {/* Empty Filter / Search Results States */}
          {visibleItems.length === 0 ? (
            <section className="empty-state-plate my-2 !py-10" data-shelf-no-matches>
              <Icon icon="ri:book-open-line" className="text-primary/60 size-8" aria-hidden="true" />
              <p className="text-foreground text-sm font-medium">
                {query.trim() ? t('shelf.noSearchResults') : t('shelf.noFilterMatches')}
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="border-border bg-background text-primary hover:border-primary/45 mt-1 inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors"
              >
                <span>{t('shelf.resetFilters')}</span>
              </button>
            </section>
          ) : (
            /* Saved Articles Collection */
            <ul
              data-shelf-list
              data-layout={layout}
              className={cn(layout === 'grid' ? 'grid grid-cols-2 gap-4 md:grid-cols-1' : 'flex flex-col gap-3')}
            >
              {visibleItems.map((item) => {
                const openHref = item.status === 'in-progress' && item.scrollY > 40 ? `${item.url}?resume=1` : item.url;
                const ctaLabel =
                  item.status === 'in-progress'
                    ? t('shelf.continueReading')
                    : item.status === 'completed'
                      ? t('shelf.readAgain')
                      : t('shelf.openArticle');

                const statusLabel =
                  item.status === 'completed'
                    ? t('shelf.filterCompleted')
                    : item.status === 'in-progress'
                      ? t('series.statusInProgress', { percent: item.progress })
                      : t('shelf.filterToRead');

                const savedDateStr = formatLocalizedDate(new Date(item.savedAt), locale);

                return (
                  <li
                    key={`${item.locale}:${item.slug}`}
                    data-shelf-card
                    className={cn(
                      'border-border bg-card hover:border-primary/40 group flex overflow-hidden rounded-xl border transition-[border-color,transform,box-shadow] duration-200',
                      layout === 'grid' ? 'flex-col' : 'flex-row md:flex-col',
                    )}
                  >
                    {/* Cover Thumbnail or Editorial Botanical Fallback */}
                    <a
                      href={openHref}
                      tabIndex={-1}
                      aria-label={item.title}
                      className={cn(
                        'bg-muted/60 relative shrink-0 overflow-hidden',
                        layout === 'grid' ? 'h-38 w-full' : 'w-48 md:h-36 md:w-full',
                      )}
                    >
                      {item.cover ? (
                        <img
                          src={item.cover}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="editorial-grid-surface flex h-full w-full items-center justify-center">
                          <Icon icon="ri:book-mark-line" className="text-primary/35 size-9" aria-hidden="true" />
                        </div>
                      )}
                      <span
                        className={cn(
                          'absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium backdrop-blur-xs',
                          item.status === 'completed'
                            ? 'bg-emerald-700/85 text-white'
                            : item.status === 'in-progress'
                              ? 'bg-primary/90 text-primary-foreground'
                              : 'bg-[rgb(16_19_24/0.62)] text-white',
                        )}
                      >
                        <Icon
                          icon={
                            item.status === 'completed'
                              ? 'ri:checkbox-circle-fill'
                              : item.status === 'in-progress'
                                ? 'ri:time-line'
                                : 'ri:bookmark-line'
                          }
                          className="size-3"
                          aria-hidden="true"
                        />
                        <span>{statusLabel}</span>
                      </span>
                    </a>

                    {/* Card Body */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px]">
                          {item.category && <span className="text-primary font-medium">{item.category}</span>}
                          {item.category && item.publishedAt && <span aria-hidden="true">·</span>}
                          {item.publishedAt && <span className="font-mono tabular-nums">{item.publishedAt}</span>}
                          {item.readingTime && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 tabular-nums">
                                <Icon icon="ri:time-line" className="size-3" aria-hidden="true" />
                                {item.readingTime}
                              </span>
                            </>
                          )}
                        </div>

                        <a href={openHref} className="outline-none">
                          <h2 className="text-foreground group-hover:text-primary line-clamp-2 text-base leading-snug font-bold transition-colors">
                            {item.title}
                          </h2>
                        </a>

                        {item.description && (
                          <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">{item.description}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {item.progress > 0 && (
                          <div className="bg-muted h-1 w-full overflow-hidden rounded-full" aria-hidden="true">
                            <div
                              className="bg-primary h-full rounded-full transition-[width] duration-300"
                              style={{ width: `${Math.max(4, item.progress)}%` }}
                            />
                          </div>
                        )}

                        <div className="border-border/60 flex flex-wrap items-center justify-between gap-2 border-t pt-2.5 text-xs">
                          <span className="text-muted-foreground font-mono text-[11px] tabular-nums">
                            {t('shelf.savedOn', { date: savedDateStr })}
                          </span>
                          <div className="flex items-center gap-2">
                            <a
                              href={openHref}
                              className="text-primary inline-flex items-center gap-1 font-medium hover:underline"
                            >
                              <span>{ctaLabel}</span>
                              <Icon icon="ri:arrow-right-line" className="size-3.5" aria-hidden="true" />
                            </a>
                            <button
                              type="button"
                              onClick={() => void handleRemove(item)}
                              aria-label={`${t('shelf.remove')}: ${item.title}`}
                              data-shelf-remove
                              className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] transition-colors"
                            >
                              <Icon icon="ri:bookmark-fill" className="size-3" aria-hidden="true" />
                              <span>{t('shelf.remove')}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
