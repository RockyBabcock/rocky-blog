export type MotionLevel = 'lively' | 'subtle' | 'reduced';

const STORAGE_KEY = 'koharu-motion-level';
const listeners = new Set<() => void>();

export function readMotionLevel(): MotionLevel {
  if (typeof window === 'undefined') return 'lively';
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'reduced';
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'lively' || stored === 'subtle' || stored === 'reduced') {
      return stored;
    }
  } catch {}
  return 'lively';
}

export function setMotionLevel(level: MotionLevel) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, level);
  } catch {}
  document.documentElement.classList.toggle('motion-off', level === 'reduced');
  document.documentElement.dataset.motion = level;
  for (const fn of listeners) fn();
}

export function isMotionDisabled(): boolean {
  return readMotionLevel() === 'reduced';
}

export function getScrollBehavior(): ScrollBehavior {
  return readMotionLevel() === 'reduced' ? 'auto' : 'smooth';
}

export function subscribeMotionLevel(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
