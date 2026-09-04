/**
 * Builds the `chat.postMessage` payload announcing a failed CI run.
 * Used by .github/workflows/notify-pipeline-failure.yml.
 *
 * SLACK_CHANNEL_ID=C0... node scripts/build-slack-payload.ts <run.json> <jobs.json> <pulls.json>
 *
 * A Block Kit `markdown` block, so each job links to its own failing step. Names land in a
 * markdown context and must be escaped — a step named `Run npm test -- --grep "*"` would
 * otherwise garble the message reporting it.
 *
 * Zero dependencies and no TypeScript needing a transform, so the workflow can skip `npm ci`.
 */
import { readFileSync } from 'node:fs';

type WorkflowRun = {
  name?: string | null;
  head_branch?: string | null;
  event?: string | null;
  html_url?: string;
  head_commit?: { author?: { name?: string } | null } | null;
};

type Step = { name: string; number: number; conclusion: string | null };

type Job = { name: string; conclusion: string | null; html_url?: string; steps?: Step[] };

type Pull = { number: number; html_url: string; user: { login: string }; merged_at: string | null };

/** Same conclusions the workflow's `if:` guards on. */
const FAILED = new Set(['failure', 'timed_out']);

/** A labelled link costs ~half the old bare-URL entry; the largest run here has ~54 jobs. */
const MAX_JOBS_LISTED = 40;

const [runPath, jobsPath, pullsPath] = process.argv.slice(2);
if (!runPath || !jobsPath || !pullsPath) {
  console.error('usage: node scripts/build-slack-payload.ts <run.json> <jobs.json> <pulls.json>');
  process.exit(1);
}

const run: WorkflowRun = JSON.parse(readFileSync(runPath, 'utf8'));
const { jobs }: { jobs: Job[] } = JSON.parse(readFileSync(jobsPath, 'utf8'));
const pulls: Pull[] = JSON.parse(readFileSync(pullsPath, 'utf8'));

const failedJobs = jobs.filter((job) => FAILED.has(job.conclusion ?? ''));

/** URL fallback — JSON.stringify drops undefined keys, and Slack rejects a missing one. */
const runUrl = run.html_url ?? '';

/** The job list is newline-delimited, so a newline in a name would fake an entry. */
const oneLine = (value: string): string => String(value).replace(/[\r\n]+/g, ' ');

/** Job and step names are repository data landing in markdown, so neutralise its control chars. */
const escapeMarkdown = (value: string): string => oneLine(value).replace(/([\\`*_[\]~])/g, '\\$1');

/** GitHub names an un-named step `Run <command>`. */
const stepLabel = (name: string): string => escapeMarkdown(name).replace(/^Run /, '');

/** One labelled link per job. `#step:<n>:1` is GitHub's anchor for step n, line 1. */
const jobEntry = (job: Job): string => {
  const step = job.steps?.find((candidate) => FAILED.has(candidate.conclusion ?? ''));
  const name = escapeMarkdown(job.name);
  const jobUrl = job.html_url ?? runUrl;
  const label = step ? `${name} — step ${step.number} "${stepLabel(step.name)}"` : `${name} — no failing step recorded`;
  return `- [${label}](${step ? `${jobUrl}#step:${step.number}:1` : jobUrl})`;
};

const buildJobList = (): string => {
  // A run-level `timed_out` cancels its jobs instead of failing them, so this is reachable.
  if (failedJobs.length === 0) {
    return `- [No individual job reported a failure — inspect the run itself](${runUrl})`;
  }
  const entries = failedJobs.slice(0, MAX_JOBS_LISTED).map(jobEntry);
  const omitted = failedJobs.length - entries.length;
  if (omitted > 0) entries.push(`- and ${omitted} more failed ${omitted === 1 ? 'job' : 'jobs'}`);
  return entries.join('\n');
};

const attribution = (): string => {
  // Merged only. Off the default branch — every v* push — `/commits/{sha}/pulls` returns open PRs,
  // so anyone could attach their name by opening one against that sha.
  const pull = pulls.find((candidate) => candidate.merged_at);
  if (pull) return `PR #${pull.number} by ${escapeMarkdown(pull.user.login)}`;
  if (run.event === 'schedule') return 'scheduled run, no author';
  return `commit by ${escapeMarkdown(run.head_commit?.author?.name ?? 'unknown')}`;
};

const channel = process.env.SLACK_CHANNEL_ID;
if (!channel) {
  console.error('SLACK_CHANNEL_ID is required');
  process.exit(1);
}

const workflow = escapeMarkdown(run.name ?? 'Workflow');
const branch = escapeMarkdown(run.head_branch ?? 'unknown branch');
const event = escapeMarkdown(run.event ?? 'unknown');

// Same layout the Workflow Builder message had, now that links can carry a label.
const message = [
  `:rocket_fail: ${workflow} failed on ${branch}`,
  `[View run](${runUrl})`,
  '',
  `Failed jobs: ${failedJobs.length}`,
  buildJobList(),
  '',
  `${event} | triggered by ${attribution()}`,
].join('\n');

console.log(
  JSON.stringify(
    {
      channel,
      // Fallback for notifications and clients that cannot render blocks.
      text: `${run.name ?? 'Workflow'} failed on ${run.head_branch ?? 'unknown branch'}`,
      blocks: [{ type: 'markdown', text: message }],
    },
    null,
    2
  )
);
