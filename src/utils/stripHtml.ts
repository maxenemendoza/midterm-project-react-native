// ─────────────────────────────────────────────────────────────────────────────
// utils/stripHtml.ts
//
// Removes all HTML tags from a string and decodes common HTML entities.
// Use this on any text that comes back from the job API before rendering it
// in a <Text> component.
//
// Usage:
//   import { stripHtml } from '../utils/stripHtml';
//   <Text>{stripHtml(job.description)}</Text>
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strip every HTML tag from `html` and decode the most common entities.
 * Returns clean, readable plain text.
 */
export function stripHtml(html: string): string {
  if (!html) return '';

  return html
    // Replace block-level closing tags with a newline so paragraphs / list
    // items are separated by whitespace instead of running together.
    .replace(/<\/(p|li|h[1-6]|br|div|tr)>/gi, '\n')
    // Remove ALL remaining tags (opening, closing, self-closing).
    .replace(/<[^>]+>/g, '')
    // Decode the most common HTML entities.
    .replace(/&amp;/g,   '&')
    .replace(/&lt;/g,    '<')
    .replace(/&gt;/g,    '>')
    .replace(/&quot;/g,  '"')
    .replace(/&#39;/g,   "'")
    .replace(/&nbsp;/g,  ' ')
    // Collapse runs of blank lines down to a single blank line.
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}