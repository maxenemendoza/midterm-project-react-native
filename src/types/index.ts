// ─────────────────────────────────────────────────────────────────────────────
// types/index.ts
// Central type definitions for the Job Finder application.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Job ─────────────────────────────────────────────────────────────────────

/**
 * Normalised Job object used throughout the app.
 * UUIDs are assigned at fetch time; they are not provided by the API.
 */
export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationUrl?: string;
  publishedAt?: string;
  expiresAt?: string;
  remote?: boolean;
  category?: string;
}

/**
 * Raw shape returned by the Empllo API before normalisation.
 * Fields are optional because the API shape is not guaranteed.
 */
export interface RawJob {
  title?: string;
  companyName?: string;
  location?: string;
  minSalary?: number | string;
  maxSalary?: number | string;
  salary?: string;
  jobType?: string;
  employmentType?: string;
  description?: string;
  requirements?: string | string[];
  benefits?: string | string[];
  applicationUrl?: string;
  publishedAt?: string;
  expiresAt?: string;
  remote?: boolean;
  category?: string;
  [key: string]: unknown;
}

// ─── Application Form ─────────────────────────────────────────────────────────

/** Values held in the application form state. */
export interface ApplicationForm {
  name: string;
  email: string;
  contactNumber: string;
  whyHireYou: string;
}

/** Per-field validation error messages. */
export interface ApplicationFormErrors {
  name?: string;
  email?: string;
  contactNumber?: string;
  whyHireYou?: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

/** Bottom-tab param list. */
export type RootTabParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
};

/** Root stack param list. */
export type RootStackParamList = {
  Tabs: undefined;
  ApplicationForm: {
    job: Job;
    fromSavedJobs: boolean;
  };
};

// ─── Theme ────────────────────────────────────────────────────────────────────

export type ThemeMode = 'light' | 'dark';

/** Complete set of semantic colour tokens used across the app. */
export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  secondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  inputBackground: string;
  tabBar: string;
  tabBarBorder: string;
  placeholder: string;
  overlay: string;
  danger: string;
  dangerText: string;
}