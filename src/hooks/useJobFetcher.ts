import { useState, useEffect, useCallback } from 'react';
import { Job } from '../types';
import { fetchJobs } from '../services/jobApi';

// return type 
interface UseJobFetcherReturn {
  jobs:      Job[];
  isLoading: boolean;
  error:     string | null;
  refetch:   () => void;
}

// hook 
export const useJobFetcher = (): UseJobFetcherReturn => {
  const [jobs, setJobs]           = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load jobs. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { jobs, isLoading, error, refetch: load };
};