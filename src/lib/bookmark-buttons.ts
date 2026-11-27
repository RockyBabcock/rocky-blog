/**
 * Delegated client controller for static Astro `[data-bookmark-btn]` toggles.
 *
 * Avoids hydrating individual React islands on every homepage/listing card while
 * staying 100% synchronized with the `$savedArticles` Nanostore and providing
 * accessible `aria-pressed`, label updates, and Sonner toast feedback.
 */

import { isArticleSaved, type SavedArticleEntry } from '@lib/saved-articles';
import {
  $savedArticles,
  $savedArticlesStorageAvailable,
  initSavedArticles,
  toggleSavedArticleItem,
} from '@store/saved-articles';

let installed = false;

function syncButton(button: HTMLButtonElement, entries: readonly SavedArticleEntry[], storageAvailable: boolean): void {
  const slug = button.dataset.bookmarkSlug ?? '';
  const locale = button.dataset.bookmarkLocale ?? 'zh';
  const saved = slug ? isArticleSaved(entries, slug, locale) : false;

  button.setAttribute('aria-pressed', String(saved));
  button.dataset.saved = saved ? 'true' : 'false';
  button.disabled = !storageAvailable;

  const label = saved ? (button.dataset.labelRemove ?? '') : (button.dataset.labelSave ?? '');
  if (label) {
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }
}

function syncAllButtons(): void {
  const entries = $savedArticles.get();
  const storageAvailable = $savedArticlesStorageAvailable.get();
  document.querySelectorAll<HTMLButtonElement>('button[data-bookmark-btn]').forEach((button) => {
    syncButton(button, entries, storageAvailable);
  });
}

async function handleBookmarkClick(button: HTMLButtonElement): Promise<void> {
  const slug = button.dataset.bookmarkSlug ?? '';
  const title = button.dataset.bookmarkTitle ?? '';
  const url = button.dataset.bookmarkUrl ?? '';
  const locale = button.dataset.bookmarkLocale ?? 'zh';
  if (!slug || !title || !url) return;

  const { saved, persisted } = toggleSavedArticleItem({
    slug,
    title,
    url,
    locale,
    category: button.dataset.bookmarkCategory || undefined,
    description: button.dataset.bookmarkDescription || undefined,
    cover: button.dataset.bookmarkCover || undefined,
    publishedAt: button.dataset.bookmarkDate || undefined,
    readingTime: button.dataset.bookmarkReadingTime || undefined,
  });

  const message = !persisted
    ? (button.dataset.toastStorageError ?? '')
    : saved
      ? (button.dataset.toastSaved ?? '')
      : (button.dataset.toastRemoved ?? '');

  if (message) {
    try {
      const { toast } = await import('sonner');
      if (!persisted) toast.error(message);
      else toast.success(message);
    } catch {
      // Non-fatal
    }
  }
}

export function setupBookmarkButtons(): void {
  if (typeof window === 'undefined' || installed) return;
  installed = true;

  const mount = () => {
    initSavedArticles();
    syncAllButtons();
  };

  $savedArticles.subscribe(() => syncAllButtons());
  $savedArticlesStorageAvailable.subscribe(() => syncAllButtons());

  document.addEventListener('click', (event) => {
    const target =
      event.target instanceof Element ? event.target.closest<HTMLButtonElement>('button[data-bookmark-btn]') : null;
    if (!target || target.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    void handleBookmarkClick(target);
  });

  if (document.readyState !== 'loading') mount();
  document.addEventListener('astro:page-load', mount);
}
