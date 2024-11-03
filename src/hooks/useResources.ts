import { useState, useEffect } from 'react';
import { resources } from '../data/resources';
import type { Resource } from '../types';

export function useResources(levelId?: string, classId?: string, subjectId?: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Resource[]>([]);

  useEffect(() => {
    try {
      if (!levelId || !classId || !subjectId) {
        setData([]);
        return;
      }

      const resourceData = resources[`${levelId}/${classId}`]?.[subjectId] || [];
      setData(resourceData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load resources'));
    } finally {
      setLoading(false);
    }
  }, [levelId, classId, subjectId]);

  return { data, loading, error };
}