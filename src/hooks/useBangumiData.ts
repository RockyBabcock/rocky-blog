import type { BangumiCollectionType, BangumiUserCollection } from '@/types/bangumi';
import { useCallback, useEffect, useState } from 'react';

export function useBangumiData(userId: string, subjectType = 2, collectionType: BangumiCollectionType = 3) {
  const [items, setItems] = useState<BangumiUserCollection[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.bgm.tv/v0/users/${encodeURIComponent(userId)}/collections?subject_type=${subjectType}&type=${collectionType}&limit=12`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setItems(Array.isArray(json.data) ? json.data : []);
      setTotal(Number(json.total ?? 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setIsLoading(false);
    }
  }, [userId, subjectType, collectionType]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { items, total, isLoading, error, retry: fetchData };
}
