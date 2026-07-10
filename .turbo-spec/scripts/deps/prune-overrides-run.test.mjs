import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runPrune, summarizeTimings } from './prune-overrides-run.mjs';

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

test('summarizeTimings flags install-dominated runs', () => {
  const s = summarizeTimings([
    { phase: 'probe:a', install_ms: 800, audit_ms: 100 },
    { phase: 'final', install_ms: 700, audit_ms: 100 },
  ]);
  assert.equal(s.probes, 2);
  assert.equal(s.install_ms, 1500);
  assert.equal(s.audit_ms, 200);
  assert.equal(s.total_ms, 1700);
  assert.equal(s.install_dominated, true);
});

test('summarizeTimings does not flag audit-dominated runs', () => {
  const s = summarizeTimings([
    { phase: 'probe:a', install_ms: 100, audit_ms: 900 },
  ]);
  assert.equal(s.install_dominated, false);
  assert.ok(s.install_fraction < 0.6);
});

test('summarizeTimings handles empty input without dividing by zero', () => {
  const s = summarizeTimings([]);
  assert.equal(s.total_ms, 0);
  assert.equal(s.install_fraction, 0);
  assert.equal(s.install_dominated, false);
});
