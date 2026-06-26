/**
 * Shared markdown helpers for the skill generators. Centralised so every generated
 * table escapes cells, strips redundant headings and extracts lead sentences the same
 * way — divergent per-module copies previously produced inconsistently escaped tables.
 */

/** Collapse whitespace and escape table-breaking pipes for a single markdown cell. */
export const escapeCell = (text: string): string => text.replace(/\s+/g, ' ').trim().replace(/\|/g, '\\|');

/**
 * Drop a redundant leading top-level heading. MDX sections often open with a
 * `# <Title>` that duplicates the per-file H1 we emit, so it is stripped before the
 * section is nested.
 */
export const stripLeadingH1 = (markdown: string): string => markdown.replace(/^#\s+[^\n]*\n+/, '');

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

/** A markdown table from a header row and pre-rendered cell rows (no heading). */
export const markdownTable = (headers: string[], rows: string[][]): string =>
  [headers, headers.map(() => '---'), ...rows].map((row) => `| ${row.join(' | ')} |`).join('\n');

/**
 * GitHub-compatible heading anchor slug: lower-cased, non-alphanumeric characters
 * dropped, runs of whitespace collapsed to single hyphens. Keeps in-page Contents
 * links in step with the headings they target.
 */
export const headingSlug = (heading: string): string =>
  heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
