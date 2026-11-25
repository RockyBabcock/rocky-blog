import { type RefObject, useEffect, useState } from 'react';

export { useIsMounted } from './useIsMounted';
export { useIsMobile, useMediaQuery } from './useMediaQuery';
export { useMotionLevel } from './useMotionLevel';
export { useTranslation } from './useTranslation';
export { useScrollTrigger } from './useScrollTrigger';
export { useGlideIndicator } from './useGlideIndicator';
export { useControlledState } from './useControlledState';
export { useFloatingUI } from './useFloatingUI';
export { useReadingProgress } from './useReadingProgress';
export { useCurrentHeading } from './useCurrentHeading';
export { useTocController } from './useTocController';

export function useIsDarkTheme(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const read = () => setIsDark(document.documentElement.classList.contains('dark'));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export function useElementVisibility(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
        }
      },
      { rootMargin: '200px', ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.rootMargin, options?.threshold]);

  return isVisible;
}
