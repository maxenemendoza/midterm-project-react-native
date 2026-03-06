import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Job } from '../types';

// context shape 
interface JobsContextValue {
  savedJobs:  Job[];
  saveJob:    (job: Job) => void;
  removeJob:  (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  appliedJobIds: string[];
  isJobApplied: (jobId: string) => boolean;
  markJobApplied: (jobId: string) => void;
  clearJobApplication: (jobId: string) => void;
}

// context 
const JobsContext = createContext<JobsContextValue | undefined>(undefined);

// provider 
export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  /** adds a job only if its id is not already in the list (no duplicates) */
  const saveJob = useCallback((job: Job) => {
    setSavedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev;
      return [...prev, job];
    });
  }, []);

  /** removes the job matching the given id */
  const removeJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
  }, []);

  /** returns true if a job with the given id is currently saved */
  const isJobSaved = useCallback(
    (jobId: string) => savedJobs.some((j) => j.id === jobId),
    [savedJobs]
  );

  const isJobApplied = useCallback(
    (jobId: string) => appliedJobIds.includes(jobId),
    [appliedJobIds]
  );

  const markJobApplied = useCallback((jobId: string) => {
    setAppliedJobIds((prev) =>
      prev.includes(jobId) ? prev : [...prev, jobId]
    );
  }, []);

  const clearJobApplication = useCallback((jobId: string) => {
    setAppliedJobIds((prev) => prev.filter((id) => id !== jobId));
  }, []);

  const value: JobsContextValue = {
    savedJobs,
    saveJob,
    removeJob,
    isJobSaved,
    appliedJobIds,
    isJobApplied,
    markJobApplied,
    clearJobApplication,
  };

  return (
    <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
  );
};

// hook 
export const useJobs = (): JobsContextValue => {
  const ctx = useContext(JobsContext);
  if (!ctx) {
    throw new Error('useJobs must be called inside a <JobsProvider>.');
  }
  return ctx;
};