/**
 * Builds the `chat.postMessage` payload announcing a release.
 * Used by .github/workflows/release.yml.
 *
 * SLACK_CHANNEL_ID=C0... node scripts/build-slack-release-payload.ts <release.json>
 *
 * <release.json> is a GitHub release as returned by `gh api repos/{owner}/{repo}/releases/tags/{tag}`.
 *
 * The release notes go across almost untouched, inside a Block Kit `markdown` block, which renders
 * standard markdown: links keep their labels, headings are headings, nested lists stay nested and
 * hard-wrapped lines reflow on their own. Verified against the real v4.0.0 body.
 *
 * Two things it still has to do, both established by testing rather than documented by Slack:
 *
 * - **De-indent fenced code blocks.** At column 0 they render with syntax highlighting; indented
 *   under a bullet, as they are throughout the changelog, they come out as plain text.
 * - **Stay inside 12,000 characters**, which is Slack's cumulative limit across every `markdown`
 *   block in one payload, so the intro and the footer count against the body.
 *
 * Note this needs `chat.postMessage` with a bot token. The `markdown` block does not work over an
 * incoming webhook (slackapi/slack-github-action#440) and Workflow Builder takes no blocks at all.
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

/** Slack's cumulative limit across every `markdown` block in a single payload. */
const MARKDOWN_BUDGET = 12_000;

const STOREFRONT_URL = 'https://designsystem.porsche.com';

const FENCE = /^(\s*)```/;
/** A line that opens a new block, so it is never a continuation of the one above. */
const BLOCK_START = /^\s*([-*]\s|#{1,6}\s)/;
const HEADING = /^### (.+)$/;
const ENTRY = /^- /;

/**
 * Slack's `markdown` block treats a single newline as a HARD line break, so Prettier's
 * `proseWrap: 'always'` wrapping would show through as ragged 120-column breaks. Joining the
 * continuation lines lets Slack wrap to each reader's window instead.
 *
 * Runs while the fences are still detectable: a line inside a code block is not a continuation and
 * joining it destroys the example. Nor is a line opening a nested bullet or a heading. Top-level
 * prose wraps at column 0 rather than indented, so indentation cannot be part of the test.
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

    if (isContinuation && previous !== undefined && previous.trim() !== '') {
      out[out.length - 1] = `${previous} ${line.trim()}`;
    } else {
      out.push(line);
    }
  }

  return out;
};

/**
 * A fenced block renders as a real code block only at column 0. Indented under a list item it is
 * emitted as plain text, so the whole block and its contents are shifted left by the fence's own
 * indentation. It loses its visual attachment to the parent bullet, which is the cheaper loss.
 */
const deindentFences = (lines: string[]): string[] => {
  const out: string[] = [];
  let indent: string | null = null;

  for (const line of lines) {
    const match = FENCE.exec(line);
    if (match) {
      // Opening fence records the indentation; the closing one clears it.
      const width = indent === null ? match[1].length : indent.length;
      out.push(line.slice(width));
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

/**
 * Cuts on an entry boundary so an entry is never split in half, and names every section that still
 * has content below the cut. The partly-cut section is named too: a reader who saw two thirds of
 * `Added` has not read all of `Added`, and nothing else in the message would tell them.
 */
const truncate = (lines: string[], budget: number): string => {
  const sections: string[] = [];
  let section = '';
  for (const line of lines) {
    const match = HEADING.exec(line);
    if (match) section = match[1];
    sections.push(section);
  }

  let length = 0;
  let lastEntry = -1;
  let overflow = -1;
  for (let index = 0; index < lines.length; index++) {
    if (ENTRY.test(lines[index])) lastEntry = index;
    length += lines[index].length + 1;
    if (length > budget) {
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

  const tail = omitted.length > 0 ? `_…and more in ${list(omitted)}._` : '_…and more._';
  return `${lines.slice(0, cut).join('\n')}\n\n${tail}`;
};

const toReleaseNotes = (markdown: string, budget: number): string => {
  // The GitHub API returns release bodies with CRLF, which markdown renders as stray breaks.
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
// The URL is its own label so the whole thing is visible and definitely clickable, rather than
// relying on Slack auto-linking a bare URL inside a `markdown` block.
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
        // A release with no notes still gets announced, just without the empty block.
        ...(notes === '' ? [] : [{ type: 'markdown', text: notes }]),
        // Blocks butt up against each other, so the notes would otherwise run straight into the
        // link. A divider also mirrors the one under the intro.
        { type: 'divider' },
        { type: 'markdown', text: footer },
      ],
    },
    null,
    2
  )
);
