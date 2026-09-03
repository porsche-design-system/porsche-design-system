/**
 * Builds the payload for the Slack Workflow Builder trigger that announces a release.
 * Used by .github/workflows/release.yml.
 *
 * node scripts/build-slack-release-payload.ts <release.json>
 *
 * <release.json> is a GitHub release as returned by `gh api repos/{owner}/{repo}/releases/tags/{tag}`.
 *
 * Workflow Builder accepts a flat object of strings and renders them as PLAIN TEXT. Verified
 * against a live trigger: `*bold*`, `**bold**`, `<url|label>`, `[label](url)`, backticks and `###`
 * all print literally. So the changelog is stripped down to plain text rather than converted to
 * mrkdwn. Two consequences worth keeping in mind when editing:
 *
 * - Bare URLs are still auto-linked by Slack, so a pull request link is reduced to the URL alone.
 *   There is no way to label it, which is why the numbers are gone.
 * - Nothing needs HTML-escaping. `&`, `<` and `>` are only control characters where mrkdwn is
 *   parsed, and it isn't, so `<p-button>` survives as written.
 *
 * Runs on bare `node` (Node 24 strips types) so the workflow can skip `npm ci`. Keep it free of
 * dependencies and of TypeScript that needs a transform.
 */
import { readFileSync } from 'node:fs';

type Release = {
  tag_name?: string;
  body?: string | null;
  html_url?: string;
};

/** Must match the variables declared on the Slack workflow. */
type SlackPayload = {
  version: string;
  body: string;
  release_url: string;
};

/**
 * Measured against a live trigger, because Slack documents no limit for a variable value: a body
 * of 12,153 characters is delivered, 19,990 is rejected with "The message content exceeded the
 * size limit". Only a major release has ever come close — v4.0.0 strips down to ~40,000.
 */
const MAX_BODY_LENGTH = 12_000;

const FENCE = /^\s*```/;
/** A line that opens a new block, so it is never a continuation of the one above. */
const BLOCK_START = /^\s*([-*]\s|#{1,6}\s)/;
const HEADING = /^### (.+)$/;
const STRIPPED_HEADING = /^\*\*\* (.+) \*\*\*$/;
const ENTRY = /^- /;

/**
 * Joins the continuation lines Prettier's `proseWrap: 'always'` leaves behind, so Slack can wrap
 * each entry to the reader's window instead. Must run before the fence markers are dropped: a line
 * inside a code block is not a continuation, and joining it destroys the example. A line opening a
 * nested bullet or a heading is not one either. Top-level prose wraps at column 0 rather than
 * indented, so indentation cannot be part of the test.
 */
const unwrap = (source: string): string[] => {
  const lines: string[] = [];
  let inFence = false;

  for (const line of source.split('\n')) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      lines.push(line);
      continue;
    }

    const previous = lines[lines.length - 1];
    const isContinuation = !inFence && line.trim() !== '' && !BLOCK_START.test(line);

    if (isContinuation && previous !== undefined && previous.trim() !== '') {
      lines[lines.length - 1] = `${previous} ${line.trim()}`;
    } else {
      lines.push(line);
    }
  }

  return lines;
};

/**
 * Order matters. The generic `**` strip has to run before the heading rewrite, or it eats two of
 * the asterisks the heading just gained and `*** ADDED ***` comes out as `* ADDED *`.
 */
const toPlainText = (line: string): string =>
  line
    .replace(/\*\*Breaking Change\*\*/g, ':warning: Breaking Change')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(HEADING, (_match, heading: string) => `*** ${heading.toUpperCase()} ***`)
    .replace(/\(\[#\d+\]\(([^)]*)\)\)/g, '($1)')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');

/** "A", "A and B", "A, B and C". */
const list = (items: string[]): string =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/**
 * Cuts on an entry boundary so an entry is never split in half, and names every section that still
 * has content below the cut. The partly-cut section is named too: a reader who saw 12,000 of
 * ADDED's 18,000 characters has not read all of ADDED, and nothing else would tell them.
 */
const truncate = (lines: string[]): string => {
  const sections: string[] = [];
  let section = '';
  for (const line of lines) {
    const match = STRIPPED_HEADING.exec(line);
    if (match) section = match[1];
    sections.push(section);
  }

  let length = 0;
  let lastEntry = -1;
  let overflow = -1;
  for (let index = 0; index < lines.length; index++) {
    if (ENTRY.test(lines[index])) lastEntry = index;
    length += lines[index].length + 1;
    if (length > MAX_BODY_LENGTH) {
      overflow = index;
      break;
    }
  }

  if (overflow === -1) return lines.join('\n');

  // A body with no entries at all can still overflow, so fall back to the offending line.
  const cut = lastEntry === -1 ? overflow : lastEntry;
  const omitted: string[] = [];
  for (const candidate of sections.slice(cut)) {
    if (candidate && !omitted.includes(candidate)) omitted.push(candidate);
  }

  const tail = omitted.length > 0 ? `…and more in ${list(omitted)}.` : '…and more.';
  return `${lines.slice(0, cut).join('\n')}\n\n${tail}`;
};

const toSlackBody = (markdown: string): string => {
  // The GitHub API returns release bodies with CRLF. It has to go first, and not only for
  // tidiness: `.` does not match `\r` in JavaScript, so `/^### (.+)$/` silently fails to match
  // `### Added\r`, no heading is ever rewritten and the truncation tail has no sections to name.
  const trimmed = markdown.replace(/\r\n?/g, '\n').trim();
  if (trimmed === '') return '';
  return truncate(
    unwrap(trimmed)
      .filter((line) => !FENCE.test(line))
      .map(toPlainText)
  );
};

const [releasePath] = process.argv.slice(2);
if (!releasePath) {
  console.error('usage: node scripts/build-slack-release-payload.ts <release.json>');
  process.exit(1);
}

const release: Release = JSON.parse(readFileSync(releasePath, 'utf8'));

const payload: SlackPayload = {
  version: release.tag_name ?? '',
  body: toSlackBody(release.body ?? ''),
  release_url: release.html_url ?? '',
};

console.log(JSON.stringify(payload, null, 2));
