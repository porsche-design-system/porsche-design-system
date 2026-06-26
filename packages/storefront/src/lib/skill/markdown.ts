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
 * First sentence of the leading paragraph, used as a one-line summary. Falls back to
 * the whole leading paragraph when no sentence boundary is found (may be empty — the
 * caller supplies its own fallback).
 */
export const leadSentence = (markdown: string): string => {
  const leadParagraph =
    markdown
      .split(/\n{2,}/)[0]
      ?.replace(/\s+/g, ' ')
      .trim() ?? '';
  return leadParagraph.match(/^(.+?[.!?])(\s|$)/)?.[1]?.trim() || leadParagraph;
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
