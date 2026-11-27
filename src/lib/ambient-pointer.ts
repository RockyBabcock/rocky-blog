/**
 * Ambient Pointer Glow — Subtle desktop-only radial highlight following fine pointer hover
 * across opt-in `.ambient-glow-surface` cards.
 *
 * Strictly:
 * - Never hijacks cursor or blocks selection/clicks
 * - Automatically disabled on touch/coarse pointers and `reduced` motion level
 * - Throttled via requestAnimationFrame and cleans up cleanly across View Transitions
 */

import { readMotionLevel } from '@lib/motion-level';

export interface RelativePointerCoords {
  /** Percentage from left edge, clamped to [0, 100]. */
  xPercent: number;
  /** Percentage from top edge, clamped to [0, 100]. */
  yPercent: number;
}

/**
 * Pure helper mapping client pointer coordinates into clamped percentage coordinates
 * relative to a bounding box. Safe against zero-sized boxes.
 */
export function computeRelativePointerPosition(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
): RelativePointerCoords {
  if (rect.width <= 0 || rect.height <= 0) {
    return { xPercent: 50, yPercent: 50 };
  }
  const rawX = ((clientX - rect.left) / rect.width) * 100;
  const rawY = ((clientY - rect.top) / rect.height) * 100;
  return {
    xPercent: Math.round(Math.min(100, Math.max(0, rawX)) * 10) / 10,
    yPercent: Math.round(Math.min(100, Math.max(0, rawY)) * 10) / 10,
  };
}

const SURFACE_SELECTOR = '.ambient-glow-surface';
let installed = false;

/**
 * Installs a single delegated mouse/pointer tracker on `document` that updates
 * `--glow-x` / `--glow-y` on the hovered `.ambient-glow-surface` card at most once per frame.
 */
export function setupAmbientPointer(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;

  const supportsFineHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  let activeEl: HTMLElement | null = null;
  let pendingX = 0;
  let pendingY = 0;
  let rafId = 0;

  const flush = () => {
    rafId = 0;
    if (!activeEl || !activeEl.isConnected) {
      activeEl = null;
      return;
    }
    const { xPercent, yPercent } = computeRelativePointerPosition(pendingX, pendingY, activeEl.getBoundingClientRect());
    activeEl.style.setProperty('--glow-x', `${xPercent}%`);
    activeEl.style.setProperty('--glow-y', `${yPercent}%`);
  };

  document.addEventListener(
    'pointermove',
    (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !supportsFineHover() || readMotionLevel() === 'reduced') {
        return;
      }
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(SURFACE_SELECTOR) : null;
      if (!target) {
        activeEl = null;
        return;
      }
      activeEl = target;
      pendingX = event.clientX;
      pendingY = event.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(flush);
      }
    },
    { passive: true },
  );

  document.addEventListener('astro:before-swap', () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    activeEl = null;
  });
}
