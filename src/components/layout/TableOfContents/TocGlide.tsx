import type { ReadingProgress } from '@hooks/useReadingProgress';
import type { Heading } from '@lib/toc';
import { useEffect, useRef } from 'react';
import { useTocContext } from './TocContext';

interface TocGlideProps {
  headings: Heading[];
  subscribeFrame?: ReadingProgress['subscribeFrame'];
}

export function TocGlide({ headings }: TocGlideProps) {
  const { activeId } = useTocContext();
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !activeId) return;
    const nav = rail.closest('.toc-container');
    if (!nav) return;
    const activeEl = nav.querySelector<HTMLElement>(`[data-heading-id="${CSS.escape(activeId)}"]`);
    if (!activeEl) {
      rail.style.opacity = '0';
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    const top = elRect.top - navRect.top;
    rail.style.opacity = '1';
    rail.style.transform = `translateY(${top}px)`;
    rail.style.height = `${elRect.height}px`;
  }, [activeId, headings]);

  return (
    <div
      ref={railRef}
      data-toc-rail
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 w-0.5 rounded-full bg-primary opacity-0 transition-all duration-200"
    />
  );
}
