import { useEffect, useState } from 'react';

export interface ReadingProgress {
  progress: number;
  percent: number;
}

export function useReadingProgress(): ReadingProgress {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return { progress, percent: Math.round(progress * 100) };
}
