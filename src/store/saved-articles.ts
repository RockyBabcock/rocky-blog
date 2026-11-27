/**
 * Client nanostore for the Personal Reading Shelf.
 *
 * Syncs with localStorage (`rocky-blog:saved-articles:v1`), listens for cross-tab
 * `storage` events, and reports storage availability so the UI degrades gracefully
 * in restricted/private-browsing environments.
 */

import {
  parseSavedArticles,
  removeSavedArticle,
  SAVED_ARTICLES_STORAGE_KEY,
  type SaveArticleInput,
  type SavedArticleEntry,
  serializeSavedArticles,
  toggleSavedArticle,
} from '@lib/saved-articles';
import { atom } from 'nanostores';

export const $savedArticles = atom<SavedArticleEntry[]>([]);
export const $savedArticlesHydrated = atom<boolean>(false);
export const $savedArticlesStorageAvailable = atom<boolean>(true);

let initialized = false;

function probeLocalStorage(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const probeKey = `${SAVED_ARTICLES_STORAGE_KEY}:probe`;
    window.localStorage.setItem(probeKey, '1');
    window.localStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

function readStorage(): SavedArticleEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return parseSavedArticles(window.localStorage.getItem(SAVED_ARTICLES_STORAGE_KEY));
  } catch {
    $savedArticlesStorageAvailable.set(false);
    return [];
  }
}

function writeStorage(entries: SavedArticleEntry[]): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (entries.length === 0) {
      window.localStorage.removeItem(SAVED_ARTICLES_STORAGE_KEY);
    } else {
      window.localStorage.setItem(SAVED_ARTICLES_STORAGE_KEY, serializeSavedArticles(entries));
    }
    $savedArticlesStorageAvailable.set(true);
    return true;
  } catch {
    $savedArticlesStorageAvailable.set(false);
    return false;
  }
}

/** Hydrate the Reading Shelf store once and attach cross-tab synchronization. */
export function initSavedArticles(): void {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;
  const available = probeLocalStorage();
  $savedArticlesStorageAvailable.set(available);
  $savedArticles.set(available ? readStorage() : []);
  $savedArticlesHydrated.set(true);

  window.addEventListener('storage', (event) => {
    if (event.key !== SAVED_ARTICLES_STORAGE_KEY) return;
    $savedArticles.set(parseSavedArticles(event.newValue));
  });
}

/** Toggle a saved article in the Reading Shelf. Returns the new saved state and persistence status. */
export function toggleSavedArticleItem(input: SaveArticleInput): { saved: boolean; persisted: boolean } {
  initSavedArticles();
  const result = toggleSavedArticle($savedArticles.get(), input);
  $savedArticles.set(result.entries);
  const persisted = writeStorage(result.entries);
  return { saved: result.saved, persisted };
}

/** Remove one saved article by canonical slug and locale. */
export function removeSavedArticleItem(slug: string, locale: string): void {
  initSavedArticles();
  const next = removeSavedArticle($savedArticles.get(), slug, locale);
  $savedArticles.set(next);
  writeStorage(next);
}

/** Clear all saved articles from the Reading Shelf. */
export function clearAllSavedArticles(): void {
  initSavedArticles();
  $savedArticles.set([]);
  writeStorage([]);
}
