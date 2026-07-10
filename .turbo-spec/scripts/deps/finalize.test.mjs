import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

// Integration tests for finalize.sh. The finalize crash we are guarding against
// is a macOS bash 3.2.57 runtime behaviour (empty-array expansion under `set -u`),
// so these tests MUST actually execute the script under /bin/bash — a pure-JS
// unit test cannot reproduce it. The non-dry cases mock `git push` and all `gh`
// calls, so they assert COMMAND SEQUENCING only; they are NOT real GitHub,
// permission, or network coverage (that is the job of the T0 preflight canary).

const FINALIZE = join(import.meta.dirname, 'finalize.sh');
const REAL_GIT = execFileSync('sh', ['-c', 'command -v git']).toString().trim();

/** Create a temp repo that mirrors the real one: `.turbo-spec/out/` gitignored,
 *  `.turbo-spec/` otherwise tracked, plus a tracked package.json + docs file. */
function makeRepo() {
  const dir = mkdtempSync(join(tmpdir(), 'finalize-'));
  const git = (...args) => execFileSync(REAL_GIT, args, { cwd: dir, stdio: 'pipe' });
  git('init', '-q');
  git('config', 'user.email', 't@t.co');
  git('config', 'user.name', 'test');
  git('config', 'commit.gpgsign', 'false');
  mkdirSync(join(dir, '.turbo-spec', 'out'), { recursive: true });
  mkdirSync(join(dir, 'docs'), { recursive: true });
  writeFileSync(join(dir, '.gitignore'), 'node_modules/\n');
  writeFileSync(join(dir, '.turbo-spec', '.gitignore'), 'out/\n');
  writeFileSync(join(dir, 'package.json'), '{"name":"x","dependencies":{"vite":"^8.1.0"}}\n');
  writeFileSync(join(dir, 'docs', 'dependencies.md'), '# deps\n');
  git('add', '-A');
  git('commit', '-qm', 'init');
  return { dir, git };
}

/** A minimal plan so assemble-pr-body.mjs has something to render. */
function writePlan(dir) {
  writeFileSync(
    join(dir, '.turbo-spec', 'out', 'update-plan.json'),
    JSON.stringify({ angular_bumped: false, updates: [{ name: 'vite', from: '^8.1.0', to: '^8.1.3', group: 'build' }] })
  );
}

/** Apply a legitimate tracked change so there is something to commit. */
function bumpDep(dir) {
  writeFileSync(join(dir, 'package.json'), '{"name":"x","dependencies":{"vite":"^8.1.3"}}\n');
}

/** Build a mock bin dir whose `git` delegates to the real git except for `push`,
 *  and whose `gh` records calls and returns a configurable existing-PR number. */
function makeMockBin(existingPr = '') {
  const bin = mkdtempSync(join(tmpdir(), 'finalize-bin-'));
  const log = join(bin, 'calls.log');
  writeFileSync(
    join(bin, 'git'),
    `#!/bin/sh\nif [ "$1" = "push" ]; then echo "git $*" >> "${log}"; exit 0; fi\nexec "${REAL_GIT}" "$@"\n`
  );
  writeFileSync(
    join(bin, 'gh'),
    `#!/bin/sh\necho "gh $*" >> "${log}"\n` +
      `if [ "$1" = "pr" ] && [ "$2" = "list" ]; then printf '%s' "${existingPr}"; fi\nexit 0\n`
  );
  chmodSync(join(bin, 'git'), 0o755);
  chmodSync(join(bin, 'gh'), 0o755);
  return { bin, log };
}

function runFinalize(dir, { dry = false, mockBin = null, env = {} } = {}) {
  const childEnv = { ...process.env, ...env };
  if (dry) childEnv.DEP_UPDATE_DRY = '1';
  if (mockBin) childEnv.PATH = `${mockBin.bin}:${process.env.PATH}`;
  const res = spawnSync('/bin/bash', [FINALIZE], { cwd: dir, encoding: 'utf8', env: childEnv });
  const calls = mockBin && existsSync(mockBin.log) ? readFileSync(mockBin.log, 'utf8') : '';
  return { status: res.status, stdout: res.stdout, stderr: res.stderr, calls };
}

function headSubject(dir) {
  return execFileSync(REAL_GIT, ['log', '-1', '--pretty=%s'], { cwd: dir }).toString().trim();
}

// --- (a) Dry matrix: the crash-fix regression guard --------------------------
// Every combination of the three optional inputs whose arrays blew up the run.
for (const issue of [true, false]) {
  for (const overrides of [true, false]) {
    for (const report of [true, false]) {
      test(`dry run commits with issue=${issue} overrides=${overrides} report=${report}`, () => {
        const { dir } = makeRepo();
        try {
          writePlan(dir);
          bumpDep(dir);
          if (overrides) writeFileSync(join(dir, '.turbo-spec', 'out', 'overrides-added.json'), '[]');
          if (report) writeFileSync(join(dir, '.turbo-spec', 'out', 'outdated-report.json'), '{"updates":[]}');
          const env = issue ? { ISSUE_NUMBER: '42' } : {};
          const r = runFinalize(dir, { dry: true, env });
          assert.equal(r.status, 0, `expected exit 0, got ${r.status}: ${r.stderr}`);
          assert.match(headSubject(dir), /^chore\(deps\): weekly dependency updates/);
          assert.ok(existsSync(join(dir, '.turbo-spec', 'out', 'pr-body.md')), 'PR body written');
        } finally {
          rmSync(dir, { recursive: true, force: true });
        }
      });
    }
  }
}

// --- (b) Idempotency / rerun -------------------------------------------------
test('rerun after a commit but no PR still pushes and opens a PR (no double commit)', () => {
  const { dir } = makeRepo();
  const mockBin = makeMockBin(''); // no existing PR
  try {
    writePlan(dir);
    bumpDep(dir);
    // First run commits locally (dry) — simulates "committed, then push/PR failed".
    runFinalize(dir, { dry: true });
    const before = execFileSync(REAL_GIT, ['rev-list', '--count', 'HEAD'], { cwd: dir }).toString().trim();
    // Rerun in non-dry mode: nothing new to commit, must still push + create PR.
    const r = runFinalize(dir, { mockBin });
    assert.equal(r.status, 0, r.stderr);
    const after = execFileSync(REAL_GIT, ['rev-list', '--count', 'HEAD'], { cwd: dir }).toString().trim();
    assert.equal(after, before, 'must NOT create a second commit');
    assert.match(r.calls, /git push/, 'must push');
    assert.match(r.calls, /gh pr create/, 'must open a PR when none exists');
  } finally {
    rmSync(dir, { recursive: true, force: true });
    rmSync(mockBin.bin, { recursive: true, force: true });
  }
});

test('an already-open PR is updated, not recreated', () => {
  const { dir } = makeRepo();
  const mockBin = makeMockBin('7'); // PR #7 already open
  try {
    writePlan(dir);
    bumpDep(dir);
    const r = runFinalize(dir, { mockBin });
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.calls, /gh pr edit 7/, 'must edit the existing PR');
    assert.doesNotMatch(r.calls, /gh pr create/, 'must NOT create a duplicate PR');
  } finally {
    rmSync(dir, { recursive: true, force: true });
    rmSync(mockBin.bin, { recursive: true, force: true });
  }
});

test('a genuine no-op (no changes, no prior commit) exits 1 for loop_back', () => {
  const { dir } = makeRepo();
  try {
    writePlan(dir); // plan exists but no dependency change was applied
    const r = runFinalize(dir, { dry: true });
    assert.equal(r.status, 1, `expected exit 1, got ${r.status}: ${r.stderr}`);
    assert.match(r.stderr, /nothing to finalize/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// --- (c) Staging guard -------------------------------------------------------
test('an unexpected untracked file stops finalize before committing (exit 2)', () => {
  const { dir } = makeRepo();
  try {
    writePlan(dir);
    bumpDep(dir);
    writeFileSync(join(dir, 'leaked.env'), 'SECRET=abc\n'); // stray, non-ignored
    const r = runFinalize(dir, { dry: true });
    assert.equal(r.status, 2, `expected exit 2, got ${r.status}: ${r.stderr}`);
    assert.match(r.stderr, /unexpected untracked files/);
    assert.match(r.stderr, /leaked\.env/);
    // Nothing was committed.
    assert.equal(headSubject(dir), 'init');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// --- (d) Missing plan --------------------------------------------------------
test('a missing update-plan.json is an environment error (exit 2)', () => {
  const { dir } = makeRepo();
  try {
    const r = runFinalize(dir, { dry: true });
    assert.equal(r.status, 2, `expected exit 2, got ${r.status}: ${r.stderr}`);
    assert.match(r.stderr, /nothing to finalize/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
