/**
 * Builds the payload for the Slack Workflow Builder webhook trigger that announces a failed CI run.
 *
 * Pure transform: three JSON files in, one JSON document on stdout.
 * Usage: node scripts/build-slack-payload.ts <run.json> <jobs.json> <pulls.json>
 *
 * Three constraints that are not obvious from the code. Full reasoning in
 * docs/runbooks/pipeline-failure-notifications.md.
 *   1. Workflow Builder accepts only a FLAT object of STRINGIFIED values — no nesting, no arrays,
 *      no numbers. That is why the job list is pre-joined into one string.
 *   2. Values render as PLAIN TEXT, not mrkdwn. So links are bare URLs on their own line (Slack
 *      auto-links those), and nothing is HTML-escaped. Rebuilding the Slack side from an app
 *      manifest reverses both — see the runbook before doing that.
 *   3. Runs on bare `node`, not `tsx`, so the workflow can skip `npm ci`. Keep it dependency-free
 *      and free of non-erasable TypeScript (no enums, no namespaces).
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

/** The seven variables the Slack workflow declares. Renaming one means editing Slack too. */
type SlackPayload = {
  workflow: string;
  branch: string;
  event: string;
  run_url: string;
  author: string;
  failed_count: string;
  failed_jobs: string;
};

/** Mirrors the conclusion guard in notify-pipeline-failure.yml. */
const FAILED = new Set(['failure', 'timed_out']);

/**
 * Slack recommends keeping a message under 4000 characters. A job entry measures ~181 chars
 * (name, step, and a full GitHub URL), so 15 entries plus the surrounding template lands near
 * 3000. All 56 jobs failing would be ~12,600, hence a cap at all.
 */
const MAX_JOBS_LISTED = 15;

const [runPath, jobsPath, pullsPath] = process.argv.slice(2);
const run: WorkflowRun = JSON.parse(readFileSync(runPath, 'utf8'));
const { jobs }: { jobs: Job[] } = JSON.parse(readFileSync(jobsPath, 'utf8'));
const pulls: Pull[] = JSON.parse(readFileSync(pullsPath, 'utf8'));

const failedJobs = jobs.filter((job) => FAILED.has(job.conclusion ?? ''));

/** Fallback for every URL, so no key can end up undefined and vanish from the payload. */
const runUrl = run.html_url ?? '';

/** The list is newline-delimited, so a newline in a name would forge an extra entry. */
const oneLine = (value: string): string => String(value).replace(/[\r\n]+/g, ' ');

/** GitHub labels an un-named step `Run <command>`. The prefix is redundant in the message. */
const stepLabel = (name: string): string => oneLine(name).replace(/^Run /, '');

/**
 * Two lines per job: description, then the bare URL. `#step:<n>:1` is GitHub's anchor for
 * "step n, log line 1". An infra failure reports `Set up job` at number 1, which is correct.
 */
const jobEntry = (job: Job): string => {
  const step = job.steps?.find((candidate) => FAILED.has(candidate.conclusion ?? ''));
  const name = oneLine(job.name);
  const jobUrl = job.html_url ?? runUrl;
  const label = step ? `${name} — step ${step.number} "${stepLabel(step.name)}"` : `${name} — no failing step recorded`;
  return `• ${label}\n${step ? `${jobUrl}#step:${step.number}:1` : jobUrl}`;
};

const buildJobList = (): string => {
  // A run-level `timed_out` cancels its jobs rather than failing them, and a manual dispatch
  // applies no conclusion filter — so an empty list is reachable and must still say something.
  if (failedJobs.length === 0) {
    return `• No individual job reported a failure — inspect the run itself\n${runUrl}`;
  }
  const entries = failedJobs.slice(0, MAX_JOBS_LISTED).map(jobEntry);
  const omitted = failedJobs.length - entries.length;
  if (omitted > 0) entries.push(`• and ${omitted} more failed ${omitted === 1 ? 'job' : 'jobs'}`);
  return entries.join('\n');
};

const attribution = (): string => {
  // Merged only: `/commits/{sha}/pulls` returns OPEN PRs when the commit is not on the default
  // branch (every v* push), so an attacker could otherwise put their name on our notifications.
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
