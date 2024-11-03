import { useState, useEffect } from 'react';
import { levelSubjects } from '../data/subjects';
import type { Subject } from '../types';

interface UseSubjectsResult {
  data: Subject[];
  loading: boolean;
  error: Error | null;
}

export function useSubjects(levelId?: string, classId?: string): UseSubjectsResult {
  const [state, setState] = useState<UseSubjectsResult>({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      if (!levelId || !classId) {
        setState({
          data: [],
          loading: false,
          error: null
        });
        return;
      }

      const key = `${levelId}/${classId}`;
      const subjects = levelSubjects[key];

      if (!subjects) {
        setState({
          data: [],
          loading: false,
          error: null
        });
        return;
      }

      setState({
        data: subjects,
        loading: false,
        error: null
      });
    } catch (err) {
      setState({
        data: [],
        loading: false,
        error: err instanceof Error ? err : new Error('Failed to load subjects')
      });
    }
  }, [levelId, classId]);

  return state;
}