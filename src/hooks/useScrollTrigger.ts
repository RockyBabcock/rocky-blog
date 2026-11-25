import { useEffect, useRef, useState } from 'react';

interface ScrollTriggerOptions {
  triggerDistance?: number;
  throttleMs?: number;
}

export function useScrollTrigger(options: ScrollTriggerOptions = {}) {
  const { triggerDistance = 0.45, throttleMs = 80 } = options;
  const [isBeyond, setIsBeyond] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastYRef = useRef(0);
  const lastTickRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    lastYRef.current = window.scrollY;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastTickRef.current < throttleMs) return;
      lastTickRef.current = now;

      const y = window.scrollY;
      const threshold = triggerDistance <= 1 ? window.innerHeight * triggerDistance : triggerDistance;
      setIsBeyond(y > threshold);

      if (Math.abs(y - lastYRef.current) > 8) {
        setDirection(y > lastYRef.current && y > 80 ? 'down' : 'up');
        lastYRef.current = y;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerDistance, throttleMs]);

  return { isBeyond, direction };
}
