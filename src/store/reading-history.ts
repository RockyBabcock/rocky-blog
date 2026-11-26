/**
 * Client nanostore for Local Reading History.
 *
 * Syncs with localStorage (`rocky-blog:reading-history:v1`) and listens to
 * cross-tab `storage` events so multiple tabs stay consistent.
 */

import {
  parseReadingHistory,
  READING_HISTORY_STORAGE_KEY,
  type ReadingHistoryEntry,
  removeReadingHistoryEntry,
  serializeReadingHistory,
  type UpsertHistoryInput,
  upsertReadingHistory,
} from '@lib/reading-history';
import { atom } from 'nanostores';

export const $readingHistory = atom<ReadingHistoryEntry[]>([]);

let initialized = false;

function readStorage(): ReadingHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return parseReadingHistory(window.localStorage.getItem(READING_HISTORY_STORAGE_KEY));
  } catch {
    return [];
  }
}

function writeStorage(entries: ReadingHistoryEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    if (entries.length === 0) {
      window.localStorage.removeItem(READING_HISTORY_STORAGE_KEY);
    } else {
      window.localStorage.setItem(READING_HISTORY_STORAGE_KEY, serializeReadingHistory(entries));
    }
  } catch {
    // Ignore private-browsing or storage-quota write failures cleanly.
  }
}

/** Hydrate the store from localStorage once and attach cross-tab synchronization. */
export function initReadingHistory(): void {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;
  $readingHistory.set(readStorage());

  window.addEventListener('storage', (event) => {
    if (event.key !== READING_HISTORY_STORAGE_KEY) return;
    $readingHistory.set(parseReadingHistory(event.newValue));
  });
}

/** Record or update an article reading entry. */
export function recordReadingEntry(input: UpsertHistoryInput): ReadingHistoryEntry[] {
  initReadingHistory();
  const next = upsertReadingHistory($readingHistory.get(), input);
  $readingHistory.set(next);
  writeStorage(next);
  return next;
}

/** Remove one article from local reading history by canonical slug. */
export function removeReadingItem(slug: string): void {
  initReadingHistory();
  const next = removeReadingHistoryEntry($readingHistory.get(), slug);
  $readingHistory.set(next);
  writeStorage(next);
}

/** Clear all local reading history entries. */
export function clearAllReadingHistory(): void {
  initReadingHistory();
  $readingHistory.set([]);
  writeStorage([]);
}
