// ─────────────────────────────────────────────────────────────────────────────
// hooks/useJobSearch.ts
// Filters a job list against a search query in a memoised, performant way.
// Searches across: title, companyName, location, jobType, and category.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { Job } from '../types';

// ─── Return type ──────────────────────────────────────────────────────────────

interface UseJobSearchReturn {
  query:        string;
  setQuery:     (q: string) => void;
  filteredJobs: Job[];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Accepts the full job list and returns a filtered subset together with the
 * current query string and its setter.
 */
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