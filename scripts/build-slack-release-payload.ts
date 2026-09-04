/**
 * Builds the `chat.postMessage` payload announcing a release.
 * Used by .github/actions/notify-slack-release.
 *
 * SLACK_CHANNEL_ID=C0... node scripts/build-slack-release-payload.ts <release.json>
 *
 * The release notes go across almost untouched: a Block Kit `markdown` block renders standard
 * markdown. It needs `chat.postMessage` with a bot token — the block works on neither an incoming
 * webhook (slackapi/slack-github-action#440) nor a Workflow Builder trigger.
 *
 * Zero dependencies and no TypeScript needing a transform, so the workflow can skip `npm ci`.
 */
import { readFileSync } from 'node:fs';

type Release = {
  tag_name?: string;
  body?: string | null;
  html_url?: string;
};

/** Slack's cumulative limit across every `markdown` block in a single payload. */
const MARKDOWN_BUDGET = 12_000;

const STOREFRONT_URL = 'https://designsystem.porsche.com';

const FENCE = /^(\s*)```/;
/**
 * A bullet, ordered item, heading, blockquote or table row opens a new block, so it is never a
 * continuation of the line above.
 */
const BLOCK_START = /^\s*([-*+]\s|\d+[.)]\s|#{1,6}\s|>|\|)/;
/** A line that is a whole block by itself, so nothing is ever joined onto it. */
const STANDALONE = /^\s*(#{1,6}\s|```)/;
const HEADING = /^### (.+)$/;
const ENTRY = /^- /;

/**
 * A single newline is a HARD line break here, so Prettier's `proseWrap: 'always'` would show
 * through as ragged 120-column breaks. Runs before the fences are dropped, since joining a line
 * inside a code block destroys the example.
 */
const unwrap = (lines: string[]): string[] => {
  const out: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    const previous = out[out.length - 1];
    const isContinuation = !inFence && line.trim() !== '' && !BLOCK_START.test(line);
    const canExtend = previous !== undefined && previous.trim() !== '' && !STANDALONE.test(previous);

    if (isContinuation && canExtend) {
      out[out.length - 1] = `${previous} ${line.trim()}`;
    } else {
      out.push(line);
    }
  }

  return out;
};

/** A fence renders as a code block only at column 0; indented under a bullet it stays plain text. */
const deindentFences = (lines: string[]): string[] => {
  const out: string[] = [];
  let indent: string | null = null;

  for (const line of lines) {
    const match = FENCE.exec(line);
    if (match) {
      // Each fence drops its own indent; the opener's is what the lines inside lose.
      out.push(line.slice(match[1].length));
      indent = indent === null ? match[1] : null;
      continue;
    }
    out.push(indent !== null && line.startsWith(indent) ? line.slice(indent.length) : line);
  }

  return out;
};

/** Merging the pre-release sections leaves runs of blank lines behind, which only waste budget. */
const collapseBlankRuns = (lines: string[]): string[] =>
  lines.filter((line, index) => line.trim() !== '' || (lines[index - 1] ?? '').trim() !== '');

/** "A", "A and B", "A, B and C". */
const list = (items: string[]): string =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/** "_…and more in Added and Fixed._" */
const tailFor = (omitted: string[]): string =>
  omitted.length > 0 ? `_…and more in ${list(omitted)}._` : '_…and more._';

/**
 * Cuts on an entry boundary and names every section with content below the cut, the partly-cut
 * one included — a reader who saw two thirds of `Added` has not read all of it.
 */
const truncate = (lines: string[], budget: number): string => {
  const whole = lines.join('\n');
  if (whole.length <= budget) return whole;

  const sections: string[] = [];
  let section = '';
  for (const line of lines) {
    const match = HEADING.exec(line);
    if (match) section = match[1];
    sections.push(section);
  }
  const allSections = [...new Set(sections)].filter((name) => name !== '');

  // The tail can name at most every section, so reserving that much keeps any cut inside the budget.
  const reserved = tailFor(allSections).length + '\n\n'.length;

  let length = 0;
  let lastEntry = -1;
  let cut = lines.length;
  for (let index = 0; index < lines.length; index++) {
    if (ENTRY.test(lines[index])) lastEntry = index;
    length += lines[index].length + 1;
    if (length > budget - reserved) {
      // A body with no entries at all can still overflow, so fall back to the offending line.
      cut = lastEntry === -1 ? index : lastEntry;
      break;
    }
  }

  const below = new Set(sections.slice(cut));
  const omitted = allSections.filter((name) => below.has(name));
  const kept = lines.slice(0, cut).join('\n').trimEnd();
  return kept === '' ? tailFor(omitted) : `${kept}\n\n${tailFor(omitted)}`;
};

const toReleaseNotes = (markdown: string, budget: number): string => {
  // The API returns CRLF, and `.` never matches `\r`, so `/^### (.+)$/` would stop matching.
  const trimmed = markdown.replace(/\r\n?/g, '\n').trim();
  if (trimmed === '') return '';
  return truncate(collapseBlankRuns(deindentFences(unwrap(trimmed.split('\n')))), budget);
};

const channel = process.env.SLACK_CHANNEL_ID;
const [releasePath] = process.argv.slice(2);
if (!channel || !releasePath) {
  console.error('usage: SLACK_CHANNEL_ID=C0... node scripts/build-slack-release-payload.ts <release.json>');
  process.exit(1);
}

const release: Release = JSON.parse(readFileSync(releasePath, 'utf8'));
const version = release.tag_name ?? '';
const releaseUrl = release.html_url ?? '';

const intro = `Check out release **${version}** of the [Porsche Design System](${STOREFRONT_URL}). Here is what changed. Happy coding! :porsche:`;
// Its own label, so the whole URL shows and is certainly a link, not relying on autolinking.
const footer = `[${releaseUrl}](${releaseUrl})`;
const notes = toReleaseNotes(release.body ?? '', MARKDOWN_BUDGET - intro.length - footer.length);

console.log(
  JSON.stringify(
    {
      channel,
      // Fallback for notifications and clients that cannot render blocks.
      text: `Release ${version} of the Porsche Design System`,
      blocks: [
        { type: 'markdown', text: intro },
        { type: 'divider' },
        ...(notes === '' ? [] : [{ type: 'markdown', text: notes }]),
        { type: 'divider' },
        { type: 'markdown', text: footer },
      ],
    },
    null,
    2
  )
);
