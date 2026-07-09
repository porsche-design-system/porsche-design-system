import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  readOverrideKeys,
  withoutOverrideKeys,
  auditRegressed,
  verdictFromInstall,
  collectRemovable,
} from './prune-overrides.mjs';

test('readOverrideKeys flattens scalar and nested overrides', () => {
  const pkg = { overrides: { braces: '^3.0.3', next: { postcss: '^8.5.10' }, madge: { typescript: '$typescript' } } };
  assert.deepEqual(
    readOverrideKeys(pkg).sort(),
    ['braces', 'madge > typescript', 'next > postcss'].sort()
  );
});

test('readOverrideKeys is empty when no overrides', () => {
  assert.deepEqual(readOverrideKeys({}), []);
});

test('withoutOverrideKeys drops a scalar key', () => {
  const pkg = { overrides: { braces: '^3.0.3', qs: '^6.15.3' } };
  const out = withoutOverrideKeys(pkg, ['braces']);
  assert.deepEqual(out.overrides, { qs: '^6.15.3' });
  assert.deepEqual(pkg.overrides, { braces: '^3.0.3', qs: '^6.15.3' }); // input untouched
});

test('withoutOverrideKeys drops a nested child and prunes the emptied parent', () => {
  const pkg = { overrides: { next: { postcss: '^8.5.10' }, qs: '^6.15.3' } };
  const out = withoutOverrideKeys(pkg, ['next > postcss']);
  assert.deepEqual(out.overrides, { qs: '^6.15.3' });
});

test('withoutOverrideKeys keeps a nested parent that retains other children', () => {
  const pkg = { overrides: { p: { a: '1', b: '2' } } };
  const out = withoutOverrideKeys(pkg, ['p > a']);
  assert.deepEqual(out.overrides, { p: { b: '2' } });
});

test('auditRegressed false when after has no new advisory and no higher counts', () => {
  const base = { vulnerabilities: { total: 2, high: 1, moderate: 1 }, advisories: { '1179': {} } };
  const after = { vulnerabilities: { total: 2, high: 1, moderate: 1 }, advisories: { '1179': {} } };
  assert.equal(auditRegressed(base, after), false);
});

test('auditRegressed true when after introduces a new advisory id', () => {
  const base = { vulnerabilities: { total: 0 }, advisories: {} };
  const after = { vulnerabilities: { total: 1, high: 1 }, advisories: { '9999': {} } };
  assert.equal(auditRegressed(base, after), true);
});

test('auditRegressed true when a severity count rises even with same ids', () => {
  const base = { vulnerabilities: { total: 1, high: 1 }, advisories: { '1': {} } };
  const after = { vulnerabilities: { total: 2, high: 2 }, advisories: { '1': {} } };
  assert.equal(auditRegressed(base, after), true);
});

test('verdictFromInstall maps status and log to a verdict', () => {
  assert.equal(verdictFromInstall(0, 'added 1 package'), 'ok');
  assert.equal(verdictFromInstall(1, 'npm error ERESOLVE could not resolve'), 'eresolve');
  assert.equal(verdictFromInstall(1, 'npm error 404 Not Found'), 'other');
});

test('collectRemovable removes all candidates in one install when batch is clean', () => {
  const probe = () => ({ verdict: 'ok', regressed: false });
  const out = collectRemovable(['braces', 'qs'], probe);
  assert.deepEqual(out.removed.sort(), ['braces', 'qs']);
  assert.deepEqual(out.kept, []);
  assert.equal(out.installs, 1);
});

test('collectRemovable bisects to isolate one load-bearing candidate', () => {
  // 'qs' is load-bearing (removing it regresses); 'braces' is stale.
  const probe = (keys) => {
    const regressed = keys.includes('qs');
    return { verdict: 'ok', regressed };
  };
  const out = collectRemovable(['braces', 'qs'], probe);
  assert.deepEqual(out.removed, ['braces']);
  assert.deepEqual(out.kept, ['qs']);
  assert.ok(out.installs <= 6);
});

test('collectRemovable keeps a candidate whose removal causes ERESOLVE', () => {
  const probe = (keys) => ({
    verdict: keys.includes('glob-pin') ? 'eresolve' : 'ok',
    regressed: false,
  });
  const out = collectRemovable(['glob-pin'], probe);
  assert.deepEqual(out.removed, []);
  assert.deepEqual(out.kept, ['glob-pin']);
});

test('collectRemovable never exceeds the install cap with many load-bearing candidates', () => {
  // every candidate regresses -> without a cap guard the bisect tree hits 7 installs
  const probe = () => ({ verdict: 'ok', regressed: true });
  const out = collectRemovable(['a', 'b', 'c', 'd'], probe);
  assert.ok(out.installs <= 6, `installs ${out.installs} exceeded cap`);
  assert.deepEqual(out.kept.sort(), ['a', 'b', 'c', 'd'].sort());
  assert.deepEqual(out.removed, []);
});
