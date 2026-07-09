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
