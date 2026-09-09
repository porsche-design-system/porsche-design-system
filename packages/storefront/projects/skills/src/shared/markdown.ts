/**
 * Collapse whitespace and escape table-breaking characters for a single markdown cell. Backslashes are
 * escaped before pipes so an escaped pipe already in the text (`\|`) is not misread as a live delimiter.
 */
export const escapeCell = (text: string): string =>
  text.replace(/\s+/g, ' ').trim().replace(/\\/g, '\\\\').replace(/\|/g, '\\|');

export const stripLeadingH1 = (markdown: string): string => markdown.replace(/^#\s+[^\n]*\n+/, '');

export const stripLeadingBlockquotes = (markdown: string): string => markdown.replace(/^(?:>[^\n]*(?:\n|$))+\s*/, '');

/**
 * A period that does not end a sentence: a dotted abbreviation (`e.g`, `i.e`, `U.S`)
 * or a common trailing abbreviation word. Tested against the text up to a candidate
 * terminator so summaries are not truncated mid-abbreviation (e.g. "messages (e.g.").
 */
const NON_TERMINAL_ABBREVIATION = /(?:[a-z]\.[a-z]|\b(?:etc|vs|cf|al|approx|fig|no))$/i;

/**
 * First sentence of the leading paragraph, used as a one-line summary. Skips periods
 * that belong to abbreviations rather than sentence ends. Falls back to the whole
 * leading paragraph when no sentence boundary is found (may be empty — the caller
 * supplies its own fallback).
 */
export const leadSentence = (markdown: string): string => {
  const leadParagraph =
    markdown
      .split(/\n{2,}/)[0]
      ?.replace(/\s+/g, ' ')
      .trim() ?? '';
  for (const match of leadParagraph.matchAll(/[.!?](?:\s|$)/g)) {
    const candidate = leadParagraph.slice(0, match.index);
    if (!NON_TERMINAL_ABBREVIATION.test(candidate)) {
      return `${candidate}${leadParagraph[match.index]}`;
    }
  }
  return leadParagraph;
};

export const markdownTable = (headers: string[], rows: string[][]): string =>
  [headers, headers.map(() => '---'), ...rows].map((row) => `| ${row.join(' | ')} |`).join('\n');

/** Matches GitHub's heading-anchor normalization used by generated contents links. */
export const headingSlug = (heading: string): string =>
  heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
