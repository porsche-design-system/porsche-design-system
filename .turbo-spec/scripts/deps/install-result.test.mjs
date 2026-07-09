import assert from 'node:assert/strict';
import { test } from 'node:test';
import { decideResult } from './run-install.mjs';
import { gateVerdict } from './check-apply-result.mjs';

test('decideResult reports a clean install', () => {
  assert.deepEqual(decideResult(0, 'added 1000 packages'), {
    install_ok: true,
    failure: null,
  });
});

test('decideResult classifies a failed install', () => {
  const log = 'npm error code ERESOLVE\nnpm error peer eslint@"^8" from plugin';
  const r = decideResult(1, log);
  assert.equal(r.install_ok, false);
  assert.equal(r.failure.kind, 'peer_conflict_thirdparty');
});

test('gateVerdict passes a clean install', () => {
  assert.equal(gateVerdict({ install_ok: true, failure: null }), 'pass');
});

test('gateVerdict passes a third-party conflict (resolve-conflicts will fix)', () => {
  assert.equal(
    gateVerdict({ install_ok: false, failure: { kind: 'peer_conflict_thirdparty' } }),
    'pass'
  );
});

test('gateVerdict escalates other failures', () => {
  assert.equal(gateVerdict({ install_ok: false, failure: { kind: 'registry' } }), 'escalate');
  assert.equal(
    gateVerdict({ install_ok: false, failure: { kind: 'peer_conflict_ts_angular' } }),
    'escalate'
  );
  assert.equal(gateVerdict({ install_ok: false, failure: { kind: 'unknown' } }), 'escalate');
});

import { installArgs, cleanPaths, failureArtifact } from './run-install.mjs';

test('installArgs does a clean, quiet install (F1): --no-audit --no-fund', () => {
  assert.deepEqual(installArgs(), ['install', '--no-audit', '--no-fund']);
});

test('cleanPaths removes BOTH the lockfile and node_modules for ground truth (F1)', () => {
  assert.deepEqual(cleanPaths('/repo'), ['/repo/package-lock.json', '/repo/node_modules']);
  // default root
  assert.deepEqual(cleanPaths('.'), ['./package-lock.json', './node_modules']);
});

test('failureArtifact is null on a clean install — install-failure.json is NOT written (F5)', () => {
  assert.equal(failureArtifact({ install_ok: true, failure: null }), null);
});

test('failureArtifact returns a schema-shaped object on failure (F5): kind+packages, no install_ok', () => {
  const failure = { kind: 'peer_conflict_thirdparty', packages: ['ag-grid-community'], detail: 'x' };
  const art = failureArtifact({ install_ok: false, failure });
  assert.deepEqual(art, failure);
  assert.ok(!('install_ok' in art));
  assert.ok(Array.isArray(art.packages));
  assert.equal(typeof art.kind, 'string');
});

import { performInstall } from './run-install.mjs';

// D-sync: npm omits platform optionalDependencies (e.g. syncpack-darwin-arm64)
// after a clean `rm package-lock.json && npm install`. A second idempotent
// install tops them up. performInstall encodes that control flow with an
// injectable runner so we can assert it without touching the network.
test('performInstall runs a second top-up install when the first succeeds (D-sync)', () => {
  const calls = [];
  const run = (args) => {
    calls.push(args);
    return { status: 0, stdout: 'added 1200 packages', stderr: '' };
  };
  const { result, attempts } = performInstall(run);
  assert.equal(attempts, 2, 'clean install must be followed by a top-up install');
  assert.deepEqual(calls, [installArgs(), installArgs()]);
  assert.equal(result.install_ok, true);
});

test('performInstall does NOT top-up when the first install fails (D-sync)', () => {
  const calls = [];
  const run = (args) => {
    calls.push(args);
    return { status: 1, stdout: '', stderr: 'npm error code ERESOLVE\nnpm error peer x@"^8" from y' };
  };
  const { result, attempts } = performInstall(run);
  assert.equal(attempts, 1, 'a failed install must not be topped up');
  assert.equal(calls.length, 1);
  assert.equal(result.install_ok, false);
  assert.equal(result.failure.kind, 'peer_conflict_thirdparty');
});

test('performInstall install_ok reflects the final (top-up) attempt (D-sync)', () => {
  let n = 0;
  const run = () => (n++ === 0
    ? { status: 0, stdout: 'ok', stderr: '' }
    : { status: 1, stdout: '', stderr: 'npm error code ERESOLVE\nnpm error peer x@"^8" from y' });
  const { result, attempts } = performInstall(run);
  assert.equal(attempts, 2);
  assert.equal(result.install_ok, false, 'a failing top-up must surface as a failed install');
});
