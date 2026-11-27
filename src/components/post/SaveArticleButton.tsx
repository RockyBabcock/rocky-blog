/**
 * SaveArticleButton — Accessible Bookmark / Reading Shelf toggle for the Article Reading Toolbar.
 *
 * Communicates saved state through both icon form (outline vs filled bookmark), text label,
 * `aria-pressed`, and a gentle Sonner toast notification.
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { isArticleSaved } from '@lib/saved-articles';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import {
  $savedArticles,
  $savedArticlesStorageAvailable,
  initSavedArticles,
  toggleSavedArticleItem,
} from '@store/saved-articles';
import { useEffect, useState } from 'react';

interface SaveArticleButtonProps {
  slug: string;
  title: string;
  url: string;
  locale: string;
  category?: string;
  description?: string;
  cover?: string;
  publishedAt?: string;
  readingTime?: string;
}

export default function SaveArticleButton({
  slug,
  title,
  url,
  locale,
  category,
  description,
  cover,
  publishedAt,
  readingTime,
}: SaveArticleButtonProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const savedArticles = useStore($savedArticles);
  const storageAvailable = useStore($savedArticlesStorageAvailable);
  const [liveMessage, setLiveMessage] = useState('');

  useEffect(() => {
    initSavedArticles();
  }, []);

  const saved = isMounted && isArticleSaved(savedArticles, slug, locale);
  const disabled = isMounted && !storageAvailable;
  const actionLabel = saved ? t('bookmark.removeArticle') : t('bookmark.saveArticle');

  const handleToggle = async () => {
    if (disabled) return;
    const { saved: nextSaved, persisted } = toggleSavedArticleItem({
      slug,
      title,
      url,
      locale,
      category,
      description,
      cover,
      publishedAt,
      readingTime,
    });

    const msg = !persisted
      ? t('bookmark.storageUnavailable')
      : nextSaved
        ? t('bookmark.toastSaved')
        : t('bookmark.toastRemoved');

    setLiveMessage(msg);
    try {
      const { toast } = await import('sonner');
      if (!persisted) toast.error(msg);
      else toast.success(msg);
    } catch {
      // aria-live remains active
    }
  };

  return (
    <div className="flex shrink-0 items-center">
      <button
        type="button"
        onClick={() => void handleToggle()}
        disabled={disabled}
        aria-pressed={saved}
        aria-label={actionLabel}
        title={isMounted ? (disabled ? t('bookmark.storageUnavailable') : actionLabel) : undefined}
        data-save-article-btn
        data-saved={saved ? 'true' : 'false'}
        className={cn(
          'focus-visible:ring-primary/50 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm transition-[background-color,border-color,color,transform] duration-200 outline-none focus-visible:ring-2 active:scale-95',
          disabled && 'cursor-not-allowed opacity-50',
          saved
            ? 'bg-primary text-primary-foreground border-primary/80 hover:bg-primary/90 font-medium'
            : 'bg-primary/10 text-primary border-primary/18 hover:border-primary/35 hover:bg-primary/18',
        )}
      >
        <Icon icon={saved ? 'ri:bookmark-fill' : 'ri:bookmark-line'} aria-hidden="true" className="size-3.5 shrink-0" />
        <span className="hidden sm:inline">{saved ? t('bookmark.saved') : t('bookmark.save')}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
    </div>
  );
}
