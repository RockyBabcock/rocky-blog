import { useSyncExternalStore } from 'react';

export interface CurrentHeading {
  id: string;
  text: string;
  level: number;
}

function getHeadingSnapshot(offsetTop: number): CurrentHeading | null {
  if (typeof document === 'undefined') return null;
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>('.custom-content h1[id], .custom-content h2[id], .custom-content h3[id], .custom-content h4[id]'),
  );
  if (elements.length === 0) return null;

  let current = elements[0];
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= offsetTop) {
      current = el;
    } else {
      break;
    }
  }

  return {
    id: current.id,
    text: current.textContent?.replace(/^#\s*/, '').trim() ?? '',
    level: Number(current.tagName.slice(1)) || 2,
  };
}

export function useCurrentHeading(offsetTop = 100): CurrentHeading | null {
  let cached: CurrentHeading | null = null;
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      window.addEventListener('scroll', callback, { passive: true });
      window.addEventListener('resize', callback, { passive: true });
      document.addEventListener('astro:page-load', callback);
      return () => {
        window.removeEventListener('scroll', callback);
        window.removeEventListener('resize', callback);
        document.removeEventListener('astro:page-load', callback);
      };
    },
    () => {
      const next = getHeadingSnapshot(offsetTop);
      if (cached && next && cached.id === next.id && cached.text === next.text && cached.level === next.level) {
        return cached;
      }
      cached = next;
      return next;
    },
    () => null,
  );
}
