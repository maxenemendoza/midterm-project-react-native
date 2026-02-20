// ─────────────────────────────────────────────────────────────────────────────
// utils/formatters.ts
// Data-transformation helpers that convert raw API shapes to clean app types.
// ─────────────────────────────────────────────────────────────────────────────

import { RawJob, Job } from '../types';

// ─── Salary ───────────────────────────────────────────────────────────────────

/**
 * Derives a human-readable salary string from a RawJob.
 * Priority: salary string → min/max range → "Salary not specified".
 */
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

// ─── String | string[] ────────────────────────────────────────────────────────

/**
 * Normalises a value that may be a plain string (newline/comma/bullet delimited)
 * or already an array, into a clean string[].
 */
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

// ─── RawJob → Job ─────────────────────────────────────────────────────────────

/**
 * Maps a raw API job object to the normalised Job interface.
 * The caller is responsible for supplying a pre-generated UUID as `id`.
 */
export const mapRawJobToJob = (raw: RawJob, id: string): Job => ({
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
});