/**
 * CommandPaletteContent — Unified Keyboard-First Command Palette (`Ctrl+K` / `Cmd+K`)
 *
 * Groups:
 * - Quick Actions (Search posts, Reading settings, Focus mode on post pages, Theme toggle)
 * - Quick Navigation (Home, Enabled Series, Archives, Categories, Tags, About)
 * - Recently Read (from local reading history)
 */

import { LazyMotionProvider } from '@components/common/LazyMotionProvider';
import { Dialog, DialogPortal } from '@components/ui/dialog';
import { animation } from '@constants/design-tokens';
import { enabledSeriesSlugs, siteConfig } from '@constants/site-config';
import { useMotionLevel } from '@hooks/useMotionLevel';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { type CommandGroup, type CommandItem, filterCommands, nextActiveIndex } from '@lib/commands';
import { isEntryCompleted } from '@lib/reading-history';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { toggleFocusMode } from '@store/focus-mode';
import { $isCommandOpen, closeModal, openModal, openSearchWithQuery } from '@store/modal';
import { $readingHistory, initReadingHistory } from '@store/reading-history';
import { AnimatePresence, m } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { localizedPath } from '@/i18n';

function toggleSiteTheme(): void {
  const root = document.documentElement;
  const nextDark = !root.classList.contains('dark');
  const theme = nextDark ? 'dark' : 'light';
  root.classList.toggle('dark', nextDark);
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Ignore storage errors
  }
}

export default function CommandPaletteContent() {
  const shouldReduceMotion = useMotionLevel() === 'reduced';
  const { t, locale } = useTranslation();
  const isOpen = useStore($isCommandOpen);
  const history = useStore($readingHistory);

  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPostPage, setIsPostPage] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    initReadingHistory();
    setQuery('');
    setActiveIndex(0);
    setIsPostPage(Boolean(document.querySelector('[data-reading-post]')));
    const timer = setTimeout(() => inputRef.current?.focus(), shouldReduceMotion ? 20 : 90);
    return () => clearTimeout(timer);
  }, [isOpen, shouldReduceMotion]);

  const baseCommands = useMemo<CommandItem[]>(() => {
    const actions: CommandItem[] = [
      {
        id: 'action-search',
        label: t('command.searchPosts'),
        group: 'actions',
        keywords: ['search', 'find', '搜索', '检索', '検索', 'rechercher'],
        shortcut: '/',
        icon: 'ri:search-line',
        actionId: 'search',
      },
      {
        id: 'action-settings',
        label: t('command.openSettings'),
        group: 'actions',
        keywords: ['settings', 'font', 'reader', '设置', '字体', '設定', 'paramètres'],
        icon: 'ri:settings-3-line',
        actionId: 'settings',
      },
      ...(isPostPage
        ? [
            {
              id: 'action-focus',
              label: t('command.toggleFocus'),
              group: 'actions' as const,
              keywords: ['focus', 'zen', 'read', '专注', '集中'],
              shortcut: '⇧F',
              icon: 'ri:book-open-line',
              actionId: 'focus' as const,
            },
          ]
        : []),
      {
        id: 'action-theme',
        label: t('command.toggleTheme'),
        group: 'actions',
        keywords: ['theme', 'dark', 'light', '主题', '深色', '浅色', 'テーマ', 'thème'],
        icon: 'ri:contrast-2-line',
        actionId: 'theme',
      },
    ];

    const seriesNav: CommandItem[] = siteConfig.featuredSeries
      .filter((s) => enabledSeriesSlugs.has(s.slug))
      .map((s) => ({
        id: `nav-series-${s.slug}`,
        label: s.label || s.fullName || s.slug,
        description: `/${s.slug}`,
        group: 'navigation',
        keywords: [s.slug, s.categoryName, 'series', 'weekly', '周刊', '系列'],
        icon: s.icon || 'ri:newspaper-line',
        href: localizedPath(`/${s.slug}`, locale),
      }));

    const navigation: CommandItem[] = [
      {
        id: 'nav-home',
        label: t('nav.home'),
        group: 'navigation',
        keywords: ['home', 'index', '首页', 'ホーム', 'accueil'],
        icon: 'ri:home-heart-line',
        href: localizedPath('/', locale),
      },
      ...seriesNav,
      {
        id: 'nav-archives',
        label: t('nav.archives'),
        description: t('archives.timelineTitle'),
        group: 'navigation',
        keywords: ['archives', 'timeline', '归档', '时间线', 'アーカイブ'],
        icon: 'ri:archive-2-line',
        href: localizedPath('/archives', locale),
      },
      {
        id: 'nav-categories',
        label: t('nav.categories'),
        group: 'navigation',
        keywords: ['categories', '分类', 'カテゴリー', 'catégories'],
        icon: 'ri:grid-line',
        href: localizedPath('/categories', locale),
      },
      {
        id: 'nav-tags',
        label: t('nav.tags'),
        group: 'navigation',
        keywords: ['tags', '标签', 'タグ', 'étiquettes'],
        icon: 'ri:price-tag-3-line',
        href: localizedPath('/tags', locale),
      },
      {
        id: 'nav-about',
        label: t('nav.about'),
        group: 'navigation',
        keywords: ['about', '关于', 'ブログについて', 'propos'],
        icon: 'ri:user-smile-line',
        href: localizedPath('/about', locale),
      },
    ];

    const recent: CommandItem[] = history.slice(0, 5).map((entry) => ({
      id: `recent-${entry.slug}`,
      label: entry.title,
      description: isEntryCompleted(entry) ? t('history.completed') : t('history.progress', { percent: entry.progress }),
      group: 'recent',
      keywords: [entry.slug, entry.category ?? ''],
      icon: 'ri:history-line',
      href: entry.scrollY > 40 ? `${entry.url}?resume=1` : entry.url,
    }));

    return [...actions, ...navigation, ...recent];
  }, [t, locale, isPostPage, history]);

  const filtered = useMemo(() => {
    const matched = filterCommands(baseCommands, query);
    const trimmed = query.trim();
    if (!trimmed) return matched;
    const dynamicSearch: CommandItem = {
      id: 'action-search-query',
      label: t('command.searchForQuery', { query: trimmed }),
      group: 'actions',
      icon: 'ri:search-2-line',
      actionId: 'search-query',
    };
    return [...matched, dynamicSearch];
  }, [baseCommands, query, t]);

  useEffect(() => {
    if (!listRef.current || filtered.length === 0) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-command-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, filtered.length]);

  const executeCommand = useCallback(
    (item: CommandItem) => {
      if (item.href) {
        closeModal();
        window.location.assign(item.href);
        return;
      }
      switch (item.actionId) {
        case 'search':
          openSearchWithQuery('');
          break;
        case 'search-query':
          openSearchWithQuery(query.trim());
          break;
        case 'settings':
          openModal('settings');
          break;
        case 'focus':
          closeModal();
          toggleFocusMode();
          break;
        case 'theme':
          toggleSiteTheme();
          closeModal();
          break;
        default:
          closeModal();
      }
    },
    [query],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => nextActiveIndex(prev, 1, filtered.length));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => nextActiveIndex(prev, -1, filtered.length));
    } else if (event.key === 'Enter') {
      const target = filtered[activeIndex];
      if (target) {
        event.preventDefault();
        executeCommand(target);
      }
    }
  };

  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  }, []);

  const groupLabels: Record<CommandGroup, string> = {
    actions: t('command.groupActions'),
    navigation: t('command.groupNav'),
    recent: t('command.groupRecent'),
  };

  const groupedOrder: CommandGroup[] = ['actions', 'navigation', 'recent'];
  const indexMap = new Map(filtered.map((item, idx) => [item.id, idx]));

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
                  exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.16 } }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
                />

                <m.div
                  className="fixed inset-0 z-55 flex items-start justify-center px-4 pt-[11dvh] md:px-3 md:pt-4"
                  onClick={handleBackgroundClick}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
                >
                  <m.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('command.title')}
                    onKeyDown={handleKeyDown}
                    data-command-palette
                    className="bg-gradient-start text-foreground ring-primary/15 flex max-h-[78dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl shadow-[0_2rem_4rem_-1.5rem_rgb(233_84_107/0.35),0_0.75rem_1.5rem_-0.75rem_rgb(20_10_28/0.3)] ring-1"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0, transition: { duration: 0 } }
                        : { opacity: 0, scale: 0.98, y: -8, transition: { duration: 0.14 } }
                    }
                    transition={shouldReduceMotion ? { duration: 0 } : animation.spring.popover}
                  >
                    <div className="border-foreground/8 flex items-center gap-2.5 border-b px-4 py-3">
                      <Icon icon="ri:command-line" className="text-primary size-5 shrink-0" aria-hidden="true" />
                      <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setActiveIndex(0);
                        }}
                        placeholder={t('command.placeholder')}
                        aria-label={t('command.title')}
                        data-command-input
                        className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-base outline-none"
                      />
                      <button
                        type="button"
                        onClick={closeModal}
                        aria-label={t('common.close')}
                        className="text-muted-foreground hover:bg-foreground/6 hover:text-foreground rounded-md px-1.5 py-1 text-xs transition-colors"
                      >
                        <span className="md:hidden">
                          <kbd className="kbd">esc</kbd>
                        </span>
                        <span className="hidden md:inline">{t('common.close')}</span>
                      </button>
                    </div>

                    <div ref={listRef} role="listbox" className="min-h-36 flex-1 overflow-y-auto px-2.5 py-2.5">
                      {filtered.length === 0 ? (
                        <p className="text-muted-foreground py-8 text-center text-sm">{t('command.empty')}</p>
                      ) : (
                        groupedOrder.map((group) => {
                          const groupItems = filtered.filter((item) => item.group === group);
                          if (groupItems.length === 0) return null;
                          return (
                            <div key={group} className="mb-2.5 last:mb-0">
                              <div className="text-muted-foreground px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase">
                                {groupLabels[group]}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                {groupItems.map((item) => {
                                  const idx = indexMap.get(item.id) ?? 0;
                                  const active = idx === activeIndex;
                                  return (
                                    <button
                                      key={item.id}
                                      type="button"
                                      role="option"
                                      aria-selected={active}
                                      data-command-index={idx}
                                      onMouseEnter={() => setActiveIndex(idx)}
                                      onClick={() => executeCommand(item)}
                                      className={cn(
                                        'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors',
                                        active
                                          ? 'bg-primary/12 text-foreground font-medium'
                                          : 'text-foreground/85 hover:bg-foreground/[0.04]',
                                      )}
                                    >
                                      <span className="flex min-w-0 items-center gap-2.5">
                                        <Icon
                                          icon={item.icon}
                                          className={cn('size-4 shrink-0', active ? 'text-primary' : 'text-muted-foreground')}
                                          aria-hidden="true"
                                        />
                                        <span className="truncate">{item.label}</span>
                                      </span>
                                      <span className="flex shrink-0 items-center gap-2">
                                        {item.description && (
                                          <span className="text-muted-foreground text-xs">{item.description}</span>
                                        )}
                                        {item.shortcut && <kbd className="kbd text-[11px]">{item.shortcut}</kbd>}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="border-foreground/8 text-muted-foreground flex items-center justify-between border-t px-4 py-2 text-xs">
                      <span>{t('command.title')}</span>
                      <div className="flex items-center gap-3 md:hidden">
                        <span>
                          <kbd className="kbd">↑↓</kbd> {t('command.navigateHint')}
                        </span>
                        <span>
                          <kbd className="kbd">↵</kbd> {t('command.executeHint')}
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
