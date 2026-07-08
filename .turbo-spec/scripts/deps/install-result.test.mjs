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
