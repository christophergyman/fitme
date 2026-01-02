import { useState, useEffect, useCallback } from 'react';
import type { Activity, ActivityInput } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function useActivityData(year: number) {
  const [activities, setActivities] = useState<Map<string, Activity>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const start = `${year}-01-01`;
      const end = `${year}-12-31`;
      const response = await fetch(`${API_BASE}/activities?start=${start}&end=${end}`);

      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }

      const data: Activity[] = await response.json();
      const map = new Map(data.map((a) => [a.date, a]));
      setActivities(map);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const updateActivity = useCallback(
    async (date: string, input: ActivityInput): Promise<Activity | null> => {
      try {
        const response = await fetch(`${API_BASE}/activities/${date}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          throw new Error('Failed to update activity');
        }

        const updated: Activity = await response.json();
        setActivities((prev) => new Map(prev).set(date, updated));
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        return null;
      }
    },
    []
  );

  const deleteActivity = useCallback(async (date: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/activities/${date}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete activity');
      }

      setActivities((prev) => {
        const newMap = new Map(prev);
        newMap.delete(date);
        return newMap;
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  }, []);

  const getActivity = useCallback(
    (date: string): Activity | null => {
      return activities.get(date) || null;
    },
    [activities]
  );

  return {
    activities,
    loading,
    error,
    updateActivity,
    deleteActivity,
    getActivity,
    refetch: fetchActivities,
  };
}
