import { ApplicationForm, ApplicationFormErrors } from '../types';

// primitive validators 
// returns true if the email matches the standard user@domain.tld pattern
export const isValidEmail = (email: string): boolean => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length === 11;
};

// returns true if the name is between 2 and 100 non-whitespace characters
export const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
};

// returns true if the text contains at least `minWords` words
// default minimum is 10 words
export const hasMinimumWords = (text: string, minWords = 10): boolean => {
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  return wordCount >= minWords;
};

// full form validator 
export const validateApplicationForm = (
  form: ApplicationForm
): ApplicationFormErrors => {
  const errors: ApplicationFormErrors = {};

  // name 
  if (!form.name.trim()) {
    errors.name = 'Full name is required.';
  } else if (!isValidName(form.name)) {
    errors.name = 'Name must be between 2 and 100 characters.';
  }

  // email 
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address (e.g. juan@email.com).';
  }

  // contact number
  if (!form.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!isValidPhone(form.contactNumber)) {
    errors.contactNumber =
      'Please enter a valid 11‑digit PH contact number (e.g. 09123456789).';
  }

  // why hire you 
  if (!form.whyHireYou.trim()) {
    errors.whyHireYou = 'This field is required.';
  } else if (!hasMinimumWords(form.whyHireYou, 10)) {
    errors.whyHireYou =
      'Please write at least 10 words explaining why you should be hired.';
  }

  return errors;
};

/** returns true when the errors object has at least one key. */
export const hasErrors = (errors: ApplicationFormErrors): boolean =>
  Object.keys(errors).length > 0;