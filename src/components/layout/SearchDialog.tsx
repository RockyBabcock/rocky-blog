import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { useStore } from '@nanostores/react';
import { $isSearchOpen, closeSearch, openSearch } from '@store/modal';
import { useEffect, useMemo, useRef, useState } from 'react';
import { localizedPath } from '@/i18n';

export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

interface SearchDialogProps {
  items: SearchItem[];
}

export function SearchDialog({ items }: SearchDialogProps) {
  const isOpen = useStore($isSearchOpen);
  const { t, locale } = useTranslation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
      } else if (event.key === 'Escape' && $isSearchOpen.get()) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 6);
    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [items, query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1050] flex items-start justify-center bg-black/50 px-4 pt-20 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t('common.search')}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSearch();
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Icon icon="ri:search-line" className="size-5 shrink-0 text-primary" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('common.search')}
            className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label={t('common.close')}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icon icon="ri:close-line" className="size-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {results.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">{t('search.noResults')}</div>
          ) : (
            <ul className="space-y-1.5">
              {results.map((item) => (
                <li key={item.slug}>
                  <a
                    href={localizedPath(`/post/${item.slug}`, locale)}
                    onClick={closeSearch}
                    className="group block rounded-xl p-3 transition-colors hover:bg-primary/10"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-foreground transition-colors group-hover:text-primary">
                        {item.title}
                      </span>
                      <span className="shrink-0 text-muted-foreground text-xs">{item.date}</span>
                    </div>
                    {item.description && (
                      <p className="mt-1 line-clamp-1 text-muted-foreground text-xs">{item.description}</p>
                    )}
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                      {item.category && (
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{item.category}</span>
                      )}
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-muted-foreground text-xs">
          <span>{results.length} / {items.length}</span>
          <span>{t('search.hint')}</span>
        </div>
      </div>
    </div>
  );
}
