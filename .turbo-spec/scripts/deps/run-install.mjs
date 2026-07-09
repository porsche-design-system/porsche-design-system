// Runs a CLEAN `npm install` (deleting the lockfile AND node_modules first, per
// the runbook — a plain reinstall keeps stale resolution and hides the real
// conflict), capturing exit status and log, and writing routable artifacts.
// ALWAYS exits 0 so it is safe as a stage pre_command (install failure is
// handled by the downstream gate, not by aborting the pipeline).
//
// Writes:
//   .turbo-spec/out/install.log          full install output
//   .turbo-spec/out/apply-result.json    { install_ok, failure }
//   .turbo-spec/out/install-failure.json { kind, packages, detail }  (failure only)

import { writeFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { classify } from './classify-install-failure.mjs';

/** Arguments for a clean, quiet install (no audit/fund noise in the log). */
export function installArgs() {
  return ['install', '--no-audit', '--no-fund'];
}

/** Paths wiped before install so resolution is computed from scratch. */
export function cleanPaths(root) {
  return [`${root}/package-lock.json`, `${root}/node_modules`];
}

/** Build the result object from an install exit status and its log. */
export function decideResult(status, log) {
  if (status === 0) return { install_ok: true, failure: null };
  return { install_ok: false, failure: classify(log) };
}

/**
 * The schema-shaped `install-failure.json` payload, or null when the install was
 * clean (in which case the file must NOT be written — the schema requires the
 * object and forbids null).
 */
export function failureArtifact(result) {
  return result?.install_ok ? null : result.failure;
}

/**
 * Run the clean install, then — only when it succeeded — a second idempotent
 * top-up install. npm omits platform-specific optionalDependencies (e.g.
 * syncpack's `syncpack-darwin-arm64` binary) from node_modules after a clean
 * `rm package-lock.json && npm install`; the lockfile still references them, so
 * a follow-up install re-adds them. The final result reflects the last attempt.
 *
 * @param {(args: string[]) => {status: number|null, stdout?: string, stderr?: string}} run
 * @returns {{ result: {install_ok: boolean, failure: object|null}, log: string, attempts: number }}
 */
export function performInstall(run) {
  const first = run(installArgs());
  const firstLog = `${first.stdout || ''}\n${first.stderr || ''}`;
  if ((first.status ?? 1) !== 0) {
    return { result: decideResult(first.status ?? 1, firstLog), log: firstLog, attempts: 1 };
  }
  const second = run(installArgs());
  const secondLog = `${second.stdout || ''}\n${second.stderr || ''}`;
  const log = `${firstLog}\n${secondLog}`;
  return { result: decideResult(second.status ?? 1, log), log, attempts: 2 };
}

function main(argv) {
  const root = argv[2] || '.';
  const outDir = '.turbo-spec/out';

  // Clean slate: remove the lockfile and node_modules so npm recomputes the tree.
  for (const p of cleanPaths(root)) {
    rmSync(p, { recursive: true, force: true });
  }

  const run = (args) =>
    spawnSync('npm', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const { result, log } = performInstall(run);
  writeFileSync(`${root}/${outDir}/install.log`, log);
  writeFileSync(`${root}/${outDir}/apply-result.json`, `${JSON.stringify(result, null, 2)}\n`);

  const failure = failureArtifact(result);
  const failurePath = `${root}/${outDir}/install-failure.json`;
  if (failure) {
    writeFileSync(failurePath, `${JSON.stringify(failure, null, 2)}\n`);
  } else {
    // Never leave a stale failure record next to a clean install.
    rmSync(failurePath, { force: true });
  }

  console.log(
    result.install_ok
      ? 'run-install: clean npm install succeeded'
      : `run-install: npm install failed (${result.failure.kind})`
  );
  return 0; // never abort the pipeline here
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
