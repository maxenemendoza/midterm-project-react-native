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
  logoUrl?: string;
  applicationUrl?: string;
  publishedAt?: string;
  expiresAt?: string;
  remote?: boolean;
  category?: string;
}

// raw job shape returned by the Empllo API before normalisation
// fields are optional because the API shape is not guaranteed
export interface RawJob {
  title?: string;
  companyName?: string;
  logo?: string;
  companyLogo?: string;
  companyLogoUrl?: string;
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

// application form

// application form values held in the application form state
export interface ApplicationForm {
  name: string;
  email: string;
  contactNumber: string;
  whyHireYou: string;
}

// application form errors per-field validation error messages
export interface ApplicationFormErrors {
  name?: string;
  email?: string;
  contactNumber?: string;
  whyHireYou?: string;
}

// navigation param lists

// bottom-tab param list
export type RootTabParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
};

// root stack param list
export type RootStackParamList = {
  Tabs: undefined;
  ApplicationForm: {
    job: Job;
    fromSavedJobs: boolean;
  };
  JobDetails: {
    job: Job;
  };
};

// theme mode 
export type ThemeMode = 'light' | 'dark';

// theme colors  
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