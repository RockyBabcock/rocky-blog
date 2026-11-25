import { type RefObject, useEffect } from 'react';

export function useGlideIndicator(
  containerRef: RefObject<HTMLElement | null>,
  indicatorRef: RefObject<HTMLElement | null>,
  activeKey: string | null,
  axis: 'x' | 'y' = 'x',
) {
  useEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    if (!activeKey) {
      indicator.style.opacity = '0';
      return;
    }

    const target = container.querySelector<HTMLElement>(`[data-glide-key="${CSS.escape(activeKey)}"]`);
    if (!target) {
      indicator.style.opacity = '0';
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    indicator.style.opacity = '1';

    if (axis === 'y') {
      indicator.style.transform = `translate3d(0, ${targetRect.top - containerRect.top}px, 0)`;
      indicator.style.height = `${targetRect.height}px`;
    } else {
      indicator.style.transform = `translate3d(${targetRect.left - containerRect.left}px, 0, 0)`;
      indicator.style.width = `${targetRect.width}px`;
      indicator.style.height = `${targetRect.height}px`;
    }
  }, [containerRef, indicatorRef, activeKey, axis]);
}
