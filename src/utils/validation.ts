// ─────────────────────────────────────────────────────────────────────────────
// utils/validation.ts
// Pure validation helpers for the application form.
// Every exported function is independently testable.
// ─────────────────────────────────────────────────────────────────────────────

import { ApplicationForm, ApplicationFormErrors } from '../types';

// ─── Primitive validators ─────────────────────────────────────────────────────

/**
 * Returns true if the email matches the standard user@domain.tld pattern.
 */
export const isValidEmail = (email: string): boolean => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Returns true if the phone number contains 7–20 allowed characters.
 * Accepts digits, spaces, dashes, parentheses, dots and a leading '+'.
 */
export const isValidPhone = (phone: string): boolean => {
  const PHONE_REGEX = /^[+]?[\d\s\-().]{7,20}$/;
  return PHONE_REGEX.test(phone.trim());
};

/**
 * Returns true if the name is between 2 and 100 non-whitespace characters.
 */
export const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
};

/**
 * Returns true if the text contains at least `minWords` words.
 * Default minimum is 10 words.
 */
export const hasMinimumWords = (text: string, minWords = 10): boolean => {
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  return wordCount >= minWords;
};

// ─── Full form validator ──────────────────────────────────────────────────────

/**
 * Validates every field of the ApplicationForm.
 * Returns an object whose keys are only present when a field has an error.
 * An empty return value means the form is valid.
 */
export const validateApplicationForm = (
  form: ApplicationForm
): ApplicationFormErrors => {
  const errors: ApplicationFormErrors = {};

  // ── Name ──────────────────────────────────────────────────────────────────
  if (!form.name.trim()) {
    errors.name = 'Full name is required.';
  } else if (!isValidName(form.name)) {
    errors.name = 'Name must be between 2 and 100 characters.';
  }

  // ── Email ─────────────────────────────────────────────────────────────────
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address (e.g. juan@email.com).';
  }

  // ── Contact number ────────────────────────────────────────────────────────
  if (!form.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!isValidPhone(form.contactNumber)) {
    errors.contactNumber =
      'Please enter a valid contact number (7–20 digits, e.g. +63 912 345 6789).';
  }

  // ── Why hire you ──────────────────────────────────────────────────────────
  if (!form.whyHireYou.trim()) {
    errors.whyHireYou = 'This field is required.';
  } else if (!hasMinimumWords(form.whyHireYou, 10)) {
    errors.whyHireYou =
      'Please write at least 10 words explaining why you should be hired.';
  }

  return errors;
};

/** Returns true when the errors object has at least one key. */
export const hasErrors = (errors: ApplicationFormErrors): boolean =>
  Object.keys(errors).length > 0;