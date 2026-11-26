/**
 * Focus Reading Mode Store
 *
 * Manages distraction-free article reading state (`html.focus-mode`),
 * automatically resets when navigating away from post pages, and stays
 * strictly synchronized with reader typography settings and reduced motion.
 */

import { atom } from 'nanostores';

export const $isFocusMode = atom(false);

function syncDocumentClass(active: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('focus-mode', active);
}

export function setFocusMode(active: boolean): void {
  $isFocusMode.set(active);
  syncDocumentClass(active);
}

export function toggleFocusMode(): void {
  setFocusMode(!$isFocusMode.get());
}

export function exitFocusMode(): void {
  if ($isFocusMode.get()) {
    setFocusMode(false);
  }
}
