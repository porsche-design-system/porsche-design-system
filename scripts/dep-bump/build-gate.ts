import { execFileSync } from 'node:child_process';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export type BuildConclusion = 'PASS' | 'FAIL' | 'PENDING';

export interface RunView {
  status?: string; // queued | in_progress | completed
  conclusion?: string; // success | failure | cancelled | ...
  databaseId?: number;
  headSha?: string;
  createdAt?: string;
}

const WORKFLOW = 'build.yml';
const IMAGE = process.env.TURBO_SPEC_BUILD_IMAGE ?? 'mcr.microsoft.com/playwright:v1.61.0-jammy';
const SLUG = process.env.TURBO_SPEC_BUILD_SLUG ?? 'dep-bump';
const POLL_MS = Number(process.env.TURBO_SPEC_BUILD_POLL_MS ?? 20_000);
const TIMEOUT_MS = Number(process.env.TURBO_SPEC_BUILD_TIMEOUT_MS ?? 45 * 60_000);

export function classifyRun(run: RunView | null): BuildConclusion {
  if (run?.status !== 'completed') return 'PENDING';
  return run.conclusion === 'success' ? 'PASS' : 'FAIL';
}

export function pickRun(runs: RunView[], headSha: string): RunView | null {
  const matching = runs
    .filter((r) => r.headSha === headSha)
    .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
  return matching[0] ?? null;
}

export function pickFreshRun(runs: RunView[], beforeIds: Set<number | undefined>, headSha: string): RunView | null {
  return pickRun(
    runs.filter((r) => !beforeIds.has(r.databaseId)),
    headSha,
  );
}

function sh(cmd: string, args: string[]): string {
  return execFileSync(cmd, args, { cwd: process.cwd(), encoding: 'utf8' });
}

function currentBranch(): string {
  return process.env.TURBO_SPEC_BRANCH ?? sh('git', ['rev-parse', '--abbrev-ref', 'HEAD']).trim();
}

function headSha(): string {
  return sh('git', ['rev-parse', 'HEAD']).trim();
}

function ensurePushed(branch: string, sha: string): void {
  // The dispatched build checks out `--ref <branch>`, so the bumped commit must
  // exist on origin. Push only when origin is behind (never force).
  const remote = sh('git', ['ls-remote', 'origin', `refs/heads/${branch}`]).trim();
  if (!remote.startsWith(sha)) {
    sh('git', ['push', 'origin', `HEAD:${branch}`]);
  }
}

function listRuns(branch: string): RunView[] {
  const raw = sh('gh', [
    'run',
    'list',
    `--workflow=${WORKFLOW}`,
    '--branch',
    branch,
    '--limit',
    '20',
    '--json',
    'databaseId,headSha,status,conclusion,createdAt',
  ]);
  return JSON.parse(raw) as RunView[];
}

async function main(): Promise<never> {
  const branch = currentBranch();
  const sha = headSha();
  ensurePushed(branch, sha);

  const before = new Set(listRuns(branch).map((r) => r.databaseId));
  sh('gh', ['workflow', 'run', WORKFLOW, '--ref', branch, '-f', `image=${IMAGE}`, '-f', `storefront-slug=${SLUG}`]);

  const deadline = Date.now() + TIMEOUT_MS;
  let run: RunView | null = null;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, POLL_MS));
    const runs = listRuns(branch);
    // Only accept a run created by THIS dispatch (new databaseId) on our sha;
    // never fall back to a stale run from a prior same-sha dispatch.
    run = pickFreshRun(runs, before, sha);
    const verdict = classifyRun(run);
    if (verdict !== 'PENDING') {
      writeVerdict('build-gate.json', {
        schemaVersion: 1,
        outcome: verdict,
        runId: run?.databaseId ?? null,
        sha,
        branch,
      });
      process.stdout.write(`[build-gate] ${verdict} (run ${run?.databaseId})\n`);
      process.exit(verdict === 'PASS' ? 0 : 1);
    }
  }
  writeVerdict('build-gate.json', {
    schemaVersion: 1,
    outcome: 'PENDING',
    runId: run?.databaseId ?? null,
    sha,
    branch,
  });
  process.stderr.write('[build-gate] timed out waiting for the CI build\n');
  process.exit(2);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void OUT_DIR;
  void main();
}
