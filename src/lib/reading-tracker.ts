/**
 * Post Reading Tracker — Lightweight client script mounted on post pages.
 *
 * Reads post metadata from `[data-reading-post]` attributes (never body text or decrypted content),
 * updates local reading history on visit and throttled scroll, and optionally restores saved
 * scroll position when returning via `?resume=1`.
 */

import { getScrollBehavior } from '@lib/motion-level';
import { calculateScrollProgress } from '@lib/reading-history';
import { $readingHistory, initReadingHistory, recordReadingEntry } from '@store/reading-history';

let cleanupCurrent: (() => void) | null = null;

function initTrackerForCurrentPost(): void {
  cleanupCurrent?.();
  cleanupCurrent = null;

  const marker = document.querySelector<HTMLElement>('[data-reading-post]');
  if (!marker) return;

  const slug = marker.dataset.postSlug ?? '';
  const title = marker.dataset.postTitle ?? '';
  const locale = marker.dataset.postLocale ?? 'zh';
  const category = marker.dataset.postCategory || undefined;
  const isEncrypted = marker.dataset.postEncrypted === 'true';
  if (!slug || !title) return;

  initReadingHistory();

  // Restore saved scrollY when arriving via "Continue Reading" (?resume=1)
  const currentUrl = new URL(window.location.href);
  if (currentUrl.searchParams.get('resume') === '1') {
    const existing = $readingHistory.get().find((entry) => entry.slug === slug);
    currentUrl.searchParams.delete('resume');
    window.history.replaceState(window.history.state, '', `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
    if (existing && existing.scrollY > 40) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: existing.scrollY, behavior: getScrollBehavior() });
      });
    }
  }

  const cleanPathname = currentUrl.pathname;

  const saveSnapshot = () => {
    const scrollY = window.scrollY;
    const docEl = document.documentElement;
    const progress = calculateScrollProgress(scrollY, docEl.scrollHeight, window.innerHeight);
    recordReadingEntry({
      slug,
      url: cleanPathname,
      title,
      locale,
      category,
      progress,
      scrollY,
      isEncrypted,
    });
  };

  // Record visit immediately (0% initially unless already scrolled or previously read)
  saveSnapshot();

  let timer: ReturnType<typeof setTimeout> | undefined;
  const onScroll = () => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = undefined;
      saveSnapshot();
    }, 450);
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      saveSnapshot();
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('pagehide', saveSnapshot);

  cleanupCurrent = () => {
    if (timer) clearTimeout(timer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('pagehide', saveSnapshot);
  };
}

let installed = false;

export function setupPostReadingTracker(): void {
  if (typeof window === 'undefined' || installed) return;
  installed = true;

  if (document.readyState !== 'loading') {
    initTrackerForCurrentPost();
  }
  document.addEventListener('astro:page-load', initTrackerForCurrentPost);
  document.addEventListener('astro:before-swap', () => {
    cleanupCurrent?.();
    cleanupCurrent = null;
  });
}
