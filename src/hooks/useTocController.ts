import { useReadingProgress, type ReadingProgress } from '@hooks/useReadingProgress';
import { getScrollBehavior } from '@lib/motion-level';
import { buildHeadingTree, flattenHeadings, type Heading } from '@lib/toc';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface TocContextValue {
  activeId: string;
  expandedIds: Set<string>;
  onHeadingClick: (id: string) => void;
  toggleExpanded: (id: string) => void;
}

interface UseTocControllerOptions {
  offsetTop?: number;
  enabled?: boolean;
}

interface UseTocControllerResult {
  headings: Heading[];
  toc: TocContextValue;
  subscribeFrame: ReadingProgress['subscribeFrame'];
}

function collectHeadingTree(): Heading[] {
  if (typeof document === 'undefined') return [];
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(
      '.custom-content h1[id], .custom-content h2[id], .custom-content h3[id], .custom-content h4[id]',
    ),
  );
  const raw = nodes
    .map((el) => ({
      id: el.id,
      text: el.textContent?.replace(/^#\s*/, '').trim() ?? '',
      level: Number(el.tagName.slice(1)) || 2,
    }))
    .filter((h) => h.id && h.text);
  return buildHeadingTree(raw);
}

function findAncestorIds(headings: Heading[], targetId: string, path: string[] = []): string[] {
  for (const h of headings) {
    if (h.id === targetId) return path;
    if (h.children?.length) {
      const found = findAncestorIds(h.children, targetId, [...path, h.id]);
      if (found.length > 0) return found;
    }
  }
  return [];
}

export function useTocController({
  offsetTop = 100,
  enabled = true,
}: UseTocControllerOptions = {}): UseTocControllerResult {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const { subscribeFrame } = useReadingProgress();

  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;

    const refresh = () => {
      const tree = collectHeadingTree();
      setHeadings(tree);
      const flat = flattenHeadings(tree);
      if (flat.length > 0) {
        setActiveId((prev) => (prev && flat.some((h) => h.id === prev) ? prev : flat[0].id));
      } else {
        setActiveId('');
      }
    };

    refresh();
    document.addEventListener('astro:page-load', refresh);
    document.addEventListener('content:decrypted', refresh);
    return () => {
      document.removeEventListener('astro:page-load', refresh);
      document.removeEventListener('content:decrypted', refresh);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || headings.length === 0 || typeof window === 'undefined') return;
    const flat = flattenHeadings(headings);
    if (flat.length === 0) return;

    let rafId = 0;
    const updateActive = () => {
      rafId = 0;
      let currentId = flat[0].id;
      for (const item of flat) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offsetTop) {
          currentId = item.id;
        } else {
          break;
        }
      }
      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled, headings, offsetTop]);

  useEffect(() => {
    if (!activeId || headings.length === 0) return;
    const ancestors = findAncestorIds(headings, activeId);
    if (ancestors.length === 0) return;
    setExpandedIds((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const id of ancestors) {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [activeId, headings]);

  const onHeadingClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
    history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toc = useMemo<TocContextValue>(
    () => ({
      activeId,
      expandedIds,
      onHeadingClick,
      toggleExpanded,
    }),
    [activeId, expandedIds, onHeadingClick, toggleExpanded],
  );

  return { headings, toc, subscribeFrame };
}
