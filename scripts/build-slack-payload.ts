/**
 * Builds the payload for the Slack Workflow Builder trigger that announces a failed CI run.
 * Used by .github/workflows/notify-pipeline-failure.yml.
 *
 * node scripts/build-slack-payload.ts <run.json> <jobs.json> <pulls.json>
 *
 * Workflow Builder only accepts a flat object of strings — no nesting, arrays or numbers — hence
 * the pre-joined job list. It also renders values as plain text rather than mrkdwn, so links are
 * bare URLs on their own line and nothing is escaped.
 *
 * Runs on bare `node` (Node 24 strips types) so the workflow can skip `npm ci`. Keep it free of
 * dependencies and of TypeScript that needs a transform.
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

/** Must match the variables declared on the Slack workflow. */
type SlackPayload = {
  workflow: string;
  branch: string;
  event: string;
  run_url: string;
  author: string;
  failed_count: string;
  failed_jobs: string;
};

/** Same conclusions the workflow's `if:` guards on. */
const FAILED = new Set(['failure', 'timed_out']);

/** An entry is ~180 chars with its URL, and Slack wants messages under 4000. */
const MAX_JOBS_LISTED = 15;

const [runPath, jobsPath, pullsPath] = process.argv.slice(2);
const run: WorkflowRun = JSON.parse(readFileSync(runPath, 'utf8'));
const { jobs }: { jobs: Job[] } = JSON.parse(readFileSync(jobsPath, 'utf8'));
const pulls: Pull[] = JSON.parse(readFileSync(pullsPath, 'utf8'));

const failedJobs = jobs.filter((job) => FAILED.has(job.conclusion ?? ''));

/** URL fallback — JSON.stringify drops undefined keys, and Slack rejects a missing one. */
const runUrl = run.html_url ?? '';

/** The job list is newline-delimited, so a newline in a name would fake an entry. */
const oneLine = (value: string): string => String(value).replace(/[\r\n]+/g, ' ');

/** GitHub names an un-named step `Run <command>`. */
const stepLabel = (name: string): string => oneLine(name).replace(/^Run /, '');

/** Description line plus the step URL. `#step:<n>:1` is GitHub's anchor for step n, line 1. */
const jobEntry = (job: Job): string => {
  const step = job.steps?.find((candidate) => FAILED.has(candidate.conclusion ?? ''));
  const name = oneLine(job.name);
  const jobUrl = job.html_url ?? runUrl;
  const label = step ? `${name} — step ${step.number} "${stepLabel(step.name)}"` : `${name} — no failing step recorded`;
  return `• ${label}\n${step ? `${jobUrl}#step:${step.number}:1` : jobUrl}`;
};

const buildJobList = (): string => {
  // A run-level `timed_out` cancels its jobs instead of failing them, so this is reachable.
  if (failedJobs.length === 0) {
    return `• No individual job reported a failure — inspect the run itself\n${runUrl}`;
  }
  const entries = failedJobs.slice(0, MAX_JOBS_LISTED).map(jobEntry);
  const omitted = failedJobs.length - entries.length;
  if (omitted > 0) entries.push(`• and ${omitted} more failed ${omitted === 1 ? 'job' : 'jobs'}`);
  return entries.join('\n');
};

const attribution = (): string => {
  // Merged only. Off the default branch — every v* push — `/commits/{sha}/pulls` returns open PRs,
  // so anyone could attach their name by opening one against that sha.
  const pull = pulls.find((candidate) => candidate.merged_at);
  if (pull) return `PR #${pull.number} by ${pull.user.login}`;
  if (run.event === 'schedule') return 'scheduled run, no author';
  return `commit by ${run.head_commit?.author?.name ?? 'unknown'}`;
};

const payload: SlackPayload = {
  workflow: run.name ?? 'Workflow',
  branch: run.head_branch ?? 'unknown branch',
  event: run.event ?? 'unknown',
  run_url: runUrl,
  author: attribution(),
  failed_count: String(failedJobs.length),
  failed_jobs: buildJobList(),
};

console.log(JSON.stringify(payload, null, 2));
