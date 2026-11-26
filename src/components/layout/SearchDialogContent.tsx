/**
 * SearchDialogContent — Upgraded Pagefind Search Modal
 *
 * Uses Pagefind's JS runtime (`/pagefind/pagefind.js`) directly for:
 * - Real category, tag, and language facet filtering + clear filters + result counts
 * - Safe `<mark>` excerpt highlighting without innerHTML injection
 * - Rich result metadata (localized date, category, tags, language badge)
 * - Full keyboard navigation (ArrowUp / ArrowDown / Enter / Esc)
 * - Graceful loading, empty, error, and retry states across desktop & mobile
 */

import { LazyMotionProvider } from '@components/common/LazyMotionProvider';
import { Dialog, DialogPortal } from '@components/ui/dialog';
import { animation } from '@constants/design-tokens';
import { useMotionLevel } from '@hooks/useMotionLevel';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { nextActiveIndex } from '@lib/commands';
import { formatLocalizedDate } from '@lib/date';
import {
  buildPagefindFilters,
  countActiveFilters,
  parseHighlightedExcerpt,
  parseMetaList,
  type SearchFiltersState,
  sortFacetEntries,
} from '@lib/search-helpers';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { $isSearchOpen, $searchInitialQuery, closeModal, openModal } from '@store/modal';
import { AnimatePresence, m } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getHtmlLang, getLocaleLabel, localeList } from '@/i18n';

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta?: Record<string, string>;
  filters?: Record<string, string[]>;
}

interface PagefindSearchResponse {
  results: Array<{
    id: string;
    data: () => Promise<PagefindResultData>;
  }>;
}

interface PagefindRuntime {
  init?: () => Promise<void>;
  destroy?: () => Promise<void>;
  options?: (opts: { baseUrl?: string }) => Promise<void>;
  filters: () => Promise<Record<string, Record<string, number>>>;
  search: (query: string | null, options?: { filters?: Record<string, string[]> }) => Promise<PagefindSearchResponse>;
}

interface HydratedResult {
  id: string;
  url: string;
  title: string;
  excerpt: string;
  date?: string;
  category?: string;
  tags: string[];
  locale?: string;
}

const INITIAL_FILTERS: SearchFiltersState = {
  category: null,
  tag: null,
  language: null,
};

let cachedModule: PagefindRuntime | null = null;
let loadedLanguageTag: string | null = null;
let inflightLoad: Promise<PagefindRuntime> | null = null;

async function loadPagefindRuntime(targetLocale: string): Promise<PagefindRuntime> {
  const targetLang = getHtmlLang(targetLocale).toLowerCase();
  if (cachedModule && loadedLanguageTag === targetLang) {
    return cachedModule;
  }
  if (inflightLoad) {
    await inflightLoad.catch(() => undefined);
    if (cachedModule && loadedLanguageTag === targetLang) {
      return cachedModule;
    }
  }

  const run = async (): Promise<PagefindRuntime> => {
    if (!cachedModule) {
      const base = import.meta.env.BASE_URL || '/';
      const url = `${base.endsWith('/') ? base : `${base}/`}pagefind/pagefind.js`;
      cachedModule = (await import(/* @vite-ignore */ url)) as PagefindRuntime;
    } else if (typeof cachedModule.destroy === 'function') {
      await cachedModule.destroy();
    }

    const htmlEl = document.documentElement;
    const prevLang = htmlEl.lang;
    try {
      // Pagefind detects the active language sub-index from `<html lang>` inside `init()`.
      htmlEl.lang = getHtmlLang(targetLocale);
      if (typeof cachedModule.init === 'function') {
        await cachedModule.init();
      }
      loadedLanguageTag = targetLang;
      return cachedModule;
    } finally {
      htmlEl.lang = prevLang;
    }
  };

  inflightLoad = run().catch((err) => {
    cachedModule = null;
    loadedLanguageTag = null;
    throw err;
  });
  try {
    return await inflightLoad;
  } finally {
    inflightLoad = null;
  }
}

export default function SearchDialogContent() {
  const shouldReduceMotion = useMotionLevel() === 'reduced';
  const { t, locale } = useTranslation();
  const isOpen = useStore($isSearchOpen);
  const initialQuery = useStore($searchInitialQuery);

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersState>(INITIAL_FILTERS);
  const [availableFacets, setAvailableFacets] = useState<Record<string, Record<string, number>>>({});
  const [results, setResults] = useState<HydratedResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [searching, setSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchSeqRef = useRef(0);

  // Sync any pre-filled query coming from Command Palette
  useEffect(() => {
    if (!isOpen) return;
    if (initialQuery) {
      setQuery(initialQuery);
      $searchInitialQuery.set('');
    }
  }, [isOpen, initialQuery]);

  // Focus input when opened
  useEffect(() => {
    if (!isOpen) return;
    const focusInput = () => inputRef.current?.focus();
    const timer = setTimeout(focusInput, shouldReduceMotion ? 20 : 100);
    return () => clearTimeout(timer);
  }, [isOpen, shouldReduceMotion]);

  const activeSearchLocale = filters.language ?? locale;

  // Load Pagefind index & facets for the active locale (or when user switches language / retries)
  useEffect(() => {
    if (!isOpen || retryToken < 0) return;
    let cancelled = false;
    setStatus('loading');

    void loadPagefindRuntime(activeSearchLocale)
      .then(async (pf) => {
        const facets = await pf.filters();
        if (cancelled) return;
        setAvailableFacets(facets ?? {});
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error('[Search] Pagefind runtime failed to load:', error);
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, activeSearchLocale, retryToken]);

  const activeFilterCount = countActiveFilters(filters);

  // Execute search when query or filters change
  useEffect(() => {
    if (!isOpen || status !== 'ready') return;
    const trimmed = query.trim();
    const pfFilters = buildPagefindFilters(filters);

    if (!trimmed && !pfFilters) {
      setResults([]);
      setTotalCount(0);
      setActiveIndex(0);
      setSearching(false);
      return;
    }

    const seq = ++searchSeqRef.current;
    setSearching(true);

    const timer = setTimeout(() => {
      void loadPagefindRuntime(activeSearchLocale)
        .then(async (pf) => {
          const response = await pf.search(trimmed || null, pfFilters ? { filters: pfFilters } : undefined);
          if (seq !== searchSeqRef.current) return;
          setTotalCount(response.results.length);
          const slice = response.results.slice(0, 15);
          const hydrated = await Promise.all(
            slice.map(async (item): Promise<HydratedResult> => {
              const data = await item.data();
              return {
                id: item.id,
                url: data.url,
                title: data.meta?.title || data.url,
                excerpt: data.excerpt || '',
                date: data.meta?.date,
                category: data.meta?.category,
                tags: parseMetaList(data.meta?.tags),
                locale: data.meta?.locale,
              };
            }),
          );
          if (seq !== searchSeqRef.current) return;
          setResults(hydrated);
          setActiveIndex(0);
          setSearching(false);
        })
        .catch(() => {
          if (seq !== searchSeqRef.current) return;
          setSearching(false);
        });
    }, 110);

    return () => clearTimeout(timer);
  }, [isOpen, status, query, filters, activeSearchLocale]);

  // Keep active keyboard-selected item visible inside scrollable result list
  useEffect(() => {
    if (!listRef.current || results.length === 0) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(`[data-result-index="${activeIndex}"]`);
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, results.length]);

  const categoryFacets = useMemo(() => sortFacetEntries(availableFacets.category, 10), [availableFacets]);
  const tagFacets = useMemo(() => sortFacetEntries(availableFacets.tag, 12), [availableFacets]);
  const hasAnyFacets = categoryFacets.length > 0 || tagFacets.length > 0 || localeList.length > 1;

  const navigateToResult = useCallback((url: string) => {
    closeModal();
    window.location.assign(url);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => nextActiveIndex(prev, 1, results.length));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => nextActiveIndex(prev, -1, results.length));
    } else if (event.key === 'Enter') {
      const target = results[activeIndex];
      if (target) {
        event.preventDefault();
        navigateToResult(target.url);
      }
    }
  };

  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, []);

  const toggleFacet = (key: keyof SearchFiltersState, value: string) => {
    setFilters((prev) => {
      if (key === 'language') {
        const nextLang = prev.language === value ? null : value;
        return { category: null, tag: null, language: nextLang };
      }
      return {
        ...prev,
        [key]: prev[key] === value ? null : value,
      };
    });
  };

  const clearAllFilters = () => setFilters(INITIAL_FILTERS);

  const handleRetry = () => {
    cachedModule = null;
    loadedLanguageTag = null;
    setRetryToken((n) => n + 1);
  };

  const hasQueryOrFilter = Boolean(query.trim()) || activeFilterCount > 0;

  return (
    <LazyMotionProvider>
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogPortal forceMount>
          <AnimatePresence>
            {isOpen && (
              <>
                <m.div
                  className="fixed inset-0 z-54 bg-[rgb(18_10_26/0.52)] backdrop-blur-[3px]"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.18, ease: animation.bezier.inQuart },
                  }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: animation.bezier.outQuart }}
                />

                <m.div
                  className="fixed inset-0 z-55 flex items-start justify-center px-4 pt-[10dvh] md:px-3 md:pt-3"
                  onClick={handleBackgroundClick}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.18 }}
                >
                  <m.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('search.dialogTitle')}
                    onKeyDown={handleKeyDown}
                    data-search-dialog
                    className="bg-gradient-start text-foreground ring-primary/15 relative flex max-h-[82dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-[0_2rem_4rem_-1.5rem_rgb(233_84_107/0.35),0_0.75rem_1.5rem_-0.75rem_rgb(20_10_28/0.3)] ring-1"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: -12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0, transition: { duration: 0 } }
                        : { opacity: 0, scale: 0.98, y: -8, transition: { duration: 0.15, ease: animation.bezier.inQuart } }
                    }
                    transition={shouldReduceMotion ? { duration: 0 } : animation.spring.popover}
                  >
                    {/* Header / Search Input */}
                    <div className="border-foreground/8 flex items-center gap-2.5 border-b px-4 py-3">
                      <Icon icon="ri:search-line" className="text-primary size-5 shrink-0" aria-hidden="true" />
                      <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('search.placeholder')}
                        aria-label={t('search.label')}
                        aria-controls="search-results-listbox"
                        aria-activedescendant={results[activeIndex] ? `search-result-${activeIndex}` : undefined}
                        data-search-input
                        className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-base outline-none"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery('');
                            inputRef.current?.focus();
                          }}
                          aria-label={t('search.clear')}
                          className="text-muted-foreground hover:text-foreground rounded-md p-1 transition-colors"
                        >
                          <Icon icon="ri:close-circle-line" className="size-4" aria-hidden="true" />
                        </button>
                      )}
                      {hasAnyFacets && (
                        <button
                          type="button"
                          onClick={() => setShowFilters((v) => !v)}
                          aria-expanded={showFilters}
                          data-search-filter-toggle
                          className={cn(
                            'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                            showFilters || activeFilterCount > 0
                              ? 'bg-primary/15 text-primary'
                              : 'bg-foreground/6 text-muted-foreground hover:text-foreground',
                          )}
                        >
                          <Icon icon="ri:filter-3-line" className="size-3.5" aria-hidden="true" />
                          <span>{t('search.filters')}</span>
                          {activeFilterCount > 0 && (
                            <span className="bg-primary text-primary-foreground rounded-full px-1.5 text-[10px]">
                              {activeFilterCount}
                            </span>
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={closeModal}
                        aria-label={t('search.dialogClose')}
                        className="text-muted-foreground hover:bg-foreground/6 hover:text-foreground shrink-0 rounded-md px-1.5 py-1 text-xs transition-colors"
                      >
                        <span className="md:hidden">
                          <kbd className="kbd">esc</kbd>
                        </span>
                        <span className="hidden md:inline">{t('search.dialogClose')}</span>
                      </button>
                    </div>

                    {/* Filter Bar (Category / Tag / Language) */}
                    {hasAnyFacets && (showFilters || activeFilterCount > 0) && (
                      <div className="border-foreground/8 bg-foreground/[0.02] flex flex-col gap-2 border-b px-4 py-2.5 text-xs">
                        {localeList.length > 1 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-muted-foreground mr-1 font-medium">{t('search.filterLanguage')}:</span>
                            {localeList.map((langCode) => {
                              const active = activeSearchLocale === langCode;
                              const explicitSelected = filters.language === langCode;
                              const count = availableFacets.language?.[langCode];
                              return (
                                <button
                                  key={langCode}
                                  type="button"
                                  aria-pressed={active}
                                  data-search-facet="language"
                                  onClick={() => toggleFacet('language', langCode)}
                                  className={cn(
                                    'rounded-full px-2.5 py-0.5 transition-colors',
                                    explicitSelected
                                      ? 'bg-primary text-primary-foreground font-medium'
                                      : active
                                        ? 'bg-primary/15 text-primary ring-primary/30 font-medium ring-1'
                                        : 'bg-foreground/6 text-foreground/80 hover:bg-primary/12 hover:text-primary',
                                  )}
                                >
                                  {getLocaleLabel(langCode)}
                                  {typeof count === 'number' && count > 0 && <span className="ml-1 opacity-70">({count})</span>}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {categoryFacets.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-muted-foreground mr-1 font-medium">{t('search.filterCategory')}:</span>
                            {categoryFacets.map(([cat, count]) => {
                              const active = filters.category === cat;
                              return (
                                <button
                                  key={cat}
                                  type="button"
                                  aria-pressed={active}
                                  data-search-facet="category"
                                  onClick={() => toggleFacet('category', cat)}
                                  className={cn(
                                    'rounded-full px-2.5 py-0.5 transition-colors',
                                    active
                                      ? 'bg-primary text-primary-foreground font-medium'
                                      : 'bg-foreground/6 text-foreground/80 hover:bg-primary/12 hover:text-primary',
                                  )}
                                >
                                  {cat} <span className="opacity-70">({count})</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {tagFacets.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-muted-foreground mr-1 font-medium">{t('search.filterTag')}:</span>
                            {tagFacets.map(([tag, count]) => {
                              const active = filters.tag === tag;
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  aria-pressed={active}
                                  data-search-facet="tag"
                                  onClick={() => toggleFacet('tag', tag)}
                                  className={cn(
                                    'rounded-full px-2.5 py-0.5 transition-colors',
                                    active
                                      ? 'bg-primary text-primary-foreground font-medium'
                                      : 'bg-foreground/6 text-foreground/80 hover:bg-primary/12 hover:text-primary',
                                  )}
                                >
                                  #{tag} <span className="opacity-70">({count})</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {activeFilterCount > 0 && (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={clearAllFilters}
                              data-search-clear-filters
                              className="text-primary hover:underline"
                            >
                              {t('search.clearFilters')}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Body / Results */}
                    <div className="min-h-40 flex-1 overflow-y-auto px-3 py-3">
                      {status === 'loading' && (
                        <output
                          data-search-loading
                          className="text-muted-foreground flex items-center justify-center gap-2 py-10 text-sm"
                        >
                          <Icon icon="ri:loader-4-line" className="size-4 animate-spin" aria-hidden="true" />
                          <span>{t('common.loading')}</span>
                        </output>
                      )}

                      {status === 'error' && (
                        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                          <output data-search-loading className="text-muted-foreground text-sm">
                            {t('search.loadError')}
                          </output>
                          <button
                            type="button"
                            onClick={handleRetry}
                            className="bg-primary/12 text-primary hover:bg-primary/20 rounded-full px-4 py-1.5 text-xs font-medium transition-colors"
                          >
                            {t('search.retry')}
                          </button>
                        </div>
                      )}

                      {status === 'ready' && !hasQueryOrFilter && (
                        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-10 text-center text-sm">
                          <Icon icon="ri:search-eye-line" className="text-primary/50 size-8" aria-hidden="true" />
                          <p>{t('search.emptyPrompt')}</p>
                        </div>
                      )}

                      {status === 'ready' && hasQueryOrFilter && searching && results.length === 0 && (
                        <div className="text-muted-foreground flex items-center justify-center gap-2 py-10 text-sm">
                          <Icon icon="ri:loader-4-line" className="size-4 animate-spin" aria-hidden="true" />
                          <span>{t('common.loading')}</span>
                        </div>
                      )}

                      {status === 'ready' && hasQueryOrFilter && !searching && results.length === 0 && (
                        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-10 text-center text-sm">
                          <p>{t('search.noResults')}</p>
                          {activeFilterCount > 0 && (
                            <button
                              type="button"
                              onClick={clearAllFilters}
                              className="text-primary text-xs font-medium hover:underline"
                            >
                              {t('search.clearFilters')}
                            </button>
                          )}
                        </div>
                      )}

                      {status === 'ready' && results.length > 0 && (
                        <>
                          <div className="text-muted-foreground mb-2 flex items-center justify-between px-2 text-xs">
                            <span role="status" aria-live="polite" data-search-count>
                              {t('search.resultCount', { count: totalCount })}
                            </span>
                          </div>
                          <div id="search-results-listbox" ref={listRef} role="listbox" className="flex flex-col gap-1.5">
                            {results.map((item, idx) => {
                              const active = idx === activeIndex;
                              const segments = parseHighlightedExcerpt(item.excerpt);
                              let runningOffset = 0;
                              const keyedSegments = segments.map((seg) => {
                                const offset = runningOffset;
                                runningOffset += seg.text.length;
                                return { ...seg, key: `${item.id}-${offset}-${seg.highlighted ? 'm' : 't'}` };
                              });
                              let displayDateStr = item.date;
                              if (item.date) {
                                try {
                                  displayDateStr = formatLocalizedDate(item.date, locale);
                                } catch {
                                  displayDateStr = item.date;
                                }
                              }

                              return (
                                <a
                                  key={item.id}
                                  id={`search-result-${idx}`}
                                  role="option"
                                  aria-selected={active}
                                  data-result-index={idx}
                                  data-search-result
                                  href={item.url}
                                  onMouseEnter={() => setActiveIndex(idx)}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigateToResult(item.url);
                                  }}
                                  className={cn(
                                    'block rounded-xl px-3.5 py-2.5 transition-colors',
                                    active ? 'bg-primary/10 ring-primary/25 ring-1' : 'hover:bg-foreground/[0.04]',
                                  )}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-foreground line-clamp-1 text-sm font-semibold">{item.title}</span>
                                    <div className="flex shrink-0 items-center gap-1.5 text-[11px]">
                                      {item.locale && (
                                        <span className="bg-foreground/6 text-muted-foreground rounded px-1.5 py-0.5">
                                          {getLocaleLabel(item.locale)}
                                        </span>
                                      )}
                                      {item.category && (
                                        <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5">
                                          {item.category}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {keyedSegments.length > 0 && (
                                    <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
                                      {keyedSegments.map((seg) =>
                                        seg.highlighted ? (
                                          <mark
                                            key={seg.key}
                                            className="bg-primary/20 text-foreground rounded-xs px-0.5 font-medium"
                                          >
                                            {seg.text}
                                          </mark>
                                        ) : (
                                          <span key={seg.key}>{seg.text}</span>
                                        ),
                                      )}
                                    </p>
                                  )}

                                  {(displayDateStr || item.tags.length > 0) && (
                                    <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                                      {displayDateStr && <span>{displayDateStr}</span>}
                                      {item.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="opacity-80">
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </a>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="border-foreground/8 text-muted-foreground flex items-center justify-between gap-3 border-t px-4 py-2 text-xs">
                      <button
                        type="button"
                        onClick={() => openModal('command')}
                        className="hover:text-primary inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Icon icon="ri:command-line" className="size-3.5" aria-hidden="true" />
                        <span>{t('search.openCommands')}</span>
                      </button>
                      <div className="flex items-center gap-3 md:hidden">
                        <span>
                          <kbd className="kbd">↑↓</kbd> {t('search.dialogSelect')}
                        </span>
                        <span>
                          <kbd className="kbd">↵</kbd> {t('search.dialogOpen')}
                        </span>
                      </div>
                    </div>
                  </m.div>
                </m.div>
              </>
            )}
          </AnimatePresence>
        </DialogPortal>
      </Dialog>
    </LazyMotionProvider>
  );
}
