import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runPrune } from './prune-overrides-run.mjs';

test('runPrune removes a stale candidate and records the result', () => {
  const pkg = { overrides: { braces: '^3.0.3', 'held-pin': '1.0.0' } };
  const baselineAudit = { vulnerabilities: { total: 0 }, advisories: {} };
  // probe(keys) → simulate: removing 'braces' is clean; nothing regresses.
  const probe = () => ({ status: 0, log: 'added', audit: { vulnerabilities: { total: 0 }, advisories: {} } });
  const out = runPrune({
    pkg,
    baselineAudit,
    candidates: ['braces'],
    probe,
  });
  assert.deepEqual(out.removed.map((r) => r.key), ['braces']);
  assert.equal(out.install_ok, true);
  assert.equal(out.regressed, false);
});

test('runPrune keeps a candidate whose removal regresses audit', () => {
  const pkg = { overrides: { qs: '^6.15.3' } };
  const baselineAudit = { vulnerabilities: { total: 0 }, advisories: {} };
  const probe = () => ({ status: 0, log: 'added', audit: { vulnerabilities: { total: 1, high: 1 }, advisories: { '9': {} } } });
  const out = runPrune({ pkg, baselineAudit, candidates: ['qs'], probe });
  assert.deepEqual(out.removed, []);
  assert.deepEqual(out.kept, ['qs']);
});
