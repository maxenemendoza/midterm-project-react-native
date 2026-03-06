import { useState, useMemo } from 'react';
import { Job } from '../types';

// return type 
interface UseJobSearchReturn {
  query:        string;
  setQuery:     (q: string) => void;
  filteredJobs: Job[];
}

// hook 
export const useJobSearch = (jobs: Job[]): UseJobSearchReturn => {
  const [query, setQuery] = useState('');

  const filteredJobs = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return jobs;

    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(needle)       ||
        job.companyName.toLowerCase().includes(needle) ||
        job.location.toLowerCase().includes(needle)    ||
        job.jobType.toLowerCase().includes(needle)     ||
        (job.category ?? '').toLowerCase().includes(needle)
    );
  }, [jobs, query]);

  return { query, setQuery, filteredJobs };
};