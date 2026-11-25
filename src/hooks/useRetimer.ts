import { useCallback, useEffect, useRef } from 'react';

export function useRetimer() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback((timer?: ReturnType<typeof setTimeout> | null) => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = timer ?? null;
  }, []);
}
