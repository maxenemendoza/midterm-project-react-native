export function stripHtml(html: string): string {
  if (!html) return '';

  return html
    // replace block-level closing tags with a newline so paragraphs / list
    // items are separated by whitespace instead of running together.
    .replace(/<\/(p|li|h[1-6]|br|div|tr)>/gi, '\n')
    // remove ALL remaining tags (opening, closing, self-closing).
    .replace(/<[^>]+>/g, '')
    // decode the most common HTML entities.
    .replace(/&amp;/g,   '&')
    .replace(/&lt;/g,    '<')
    .replace(/&gt;/g,    '>')
    .replace(/&quot;/g,  '"')
    .replace(/&#39;/g,   "'")
    .replace(/&nbsp;/g,  ' ')
    // collapse runs of blank lines down to a single blank line.
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}