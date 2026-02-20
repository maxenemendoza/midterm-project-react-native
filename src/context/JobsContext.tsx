// ─────────────────────────────────────────────────────────────────────────────
// context/JobsContext.tsx
// Manages the list of saved jobs and exposes save / remove / query actions.
// Duplicate prevention is enforced here so callers never need to worry about it.
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Job } from '../types';

// ─── Context shape ────────────────────────────────────────────────────────────

interface JobsContextValue {
  savedJobs:  Job[];
  saveJob:    (job: Job) => void;
  removeJob:  (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const JobsContext = createContext<JobsContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  /** Adds a job only if its id is not already in the list (no duplicates). */
  const saveJob = useCallback((job: Job) => {
    setSavedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev;
      return [...prev, job];
    });
  }, []);

  /** Removes the job matching the given id. */
  const removeJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
  }, []);

  /** Returns true if a job with the given id is currently saved. */
  const isJobSaved = useCallback(
    (jobId: string) => savedJobs.some((j) => j.id === jobId),
    [savedJobs]
  );

  const value: JobsContextValue = { savedJobs, saveJob, removeJob, isJobSaved };

  return (
    <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the saved-jobs context value.
 * Must be called inside a component wrapped by <JobsProvider>.
 */
export const useJobs = (): JobsContextValue => {
  const ctx = useContext(JobsContext);
  if (!ctx) {
    throw new Error('useJobs must be called inside a <JobsProvider>.');
  }
  return ctx;
};