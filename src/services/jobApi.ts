import uuid from 'react-native-uuid';
import { Job, RawJob } from '../types';
import { mapRawJobToJob } from '../utils/formatters';

const BASE_URL = 'https://empllo.com/api/v1';

// shape of the top-level API response (various possible wrappers)
interface ApiResponse {
  jobs?:    RawJob[];
  data?:    RawJob[];
  results?: RawJob[];
  [key: string]: unknown;
}

// fetchJobs 
// handles multiple possible response shapes:
//   • Bare array
//   • { jobs: [...] }
//   • { data: [...] }
//   • { results: [...] }
//   • Any object whose first array-valued property is used as fallback
// throws a descriptive Error on network failure, bad status, or empty results

// fetches the full job list from the Empllo API
export const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed — ${response.status} ${response.statusText}`
    );
  }

  const data: ApiResponse = await response.json();

  // locates the jobs array inside whatever shape the API returned 
  let rawJobs: RawJob[] = [];

  if (Array.isArray(data)) {
    rawJobs = data as RawJob[];
  } else if (Array.isArray(data.jobs)) {
    rawJobs = data.jobs;
  } else if (Array.isArray(data.data)) {
    rawJobs = data.data;
  } else if (Array.isArray(data.results)) {
    rawJobs = data.results;
  } else {
    // fallback: find the first array-valued property
    const firstArray = Object.values(data).find((v) => Array.isArray(v));
    if (firstArray) {
      rawJobs = firstArray as RawJob[];
    }
  }

  if (rawJobs.length === 0) {
    throw new Error(
      'No jobs were found in the API response. Please try again later.'
    );
  }

  // assigns a unique id to each job using uuid 
  return rawJobs.map((raw) => mapRawJobToJob(raw, uuid.v4() as string));
};