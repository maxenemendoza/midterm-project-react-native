import { RawJob, Job } from '../types';

// salary 
export const formatSalary = (raw: RawJob): string => {
  if (raw.salary && typeof raw.salary === 'string' && raw.salary.trim()) {
    return raw.salary.trim();
  }
  const min = raw.minSalary ? Number(raw.minSalary) : null;
  const max = raw.maxSalary ? Number(raw.maxSalary) : null;

  if (min && max) return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
  if (min)        return `From $${min.toLocaleString()}`;
  if (max)        return `Up to $${max.toLocaleString()}`;
  return 'Salary not specified';
};

// string
export const parseStringOrArray = (
  value: string | string[] | undefined
): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((s) => s.trim()).filter(Boolean);
  return value
    .split(/[\n•\-,]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
};

// rawjob to job
export const mapRawJobToJob = (raw: RawJob, id: string): Job => {
  const logoUrl =
    (raw.companyLogoUrl as string | undefined) ||
    (raw.companyLogo as string | undefined) ||
    (raw.logo as string | undefined);

  return {
    id,
    title:       String(raw.title       ?? 'Untitled Position'),
    companyName: String(raw.companyName ?? 'Unknown Company'),
    location:    String(raw.location    ?? 'Remote / Not specified'),
    salary:      formatSalary(raw),
    jobType:     String(raw.jobType ?? raw.employmentType ?? 'Not specified'),
    description: String(raw.description ?? 'No description provided.'),
    requirements: parseStringOrArray(raw.requirements as string | string[]),
    benefits:     parseStringOrArray(raw.benefits     as string | string[]),
    applicationUrl: raw.applicationUrl as string | undefined,
    publishedAt:    raw.publishedAt    as string | undefined,
    expiresAt:      raw.expiresAt      as string | undefined,
    remote:         Boolean(raw.remote),
    category:       raw.category as string | undefined,
    logoUrl,
  };
};