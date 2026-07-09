import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveVerdict } from './check-resolve.mjs';

test('passes when an override is recorded and the final log is ERESOLVE-free', () => {
  const overrides = [{ package: 'ag-grid-community', specifier: '35.3.0', reason: 'peer cap' }];
  const v = resolveVerdict(overrides, 'added 1200 packages in 30s\n');
  assert.equal(v.ok, true);
});

test("does NOT false-positive on npm's own ERESOLVE hint / audit summary prose", () => {
  // Exactly the text that tripped the old substring scan: npm prints these
  // itself; the agent never invoked the flags.
  const overrides = [{ package: 'ag-grid-community', specifier: '35.3.0', reason: 'peer cap' }];
  const noisyButClean =
    'added 1200 packages\n' +
    'run `npm audit fix --force` to fix them, or ...\n' +
    'retry this command with --force or --legacy-peer-deps\n';
  const v = resolveVerdict(overrides, noisyButClean);
  assert.equal(v.ok, true, `expected pass, got: ${v.reason}`);
});

test('fails when no override was recorded', () => {
  assert.equal(resolveVerdict([], 'added 1200 packages').ok, false);
  assert.equal(resolveVerdict(null, 'added 1200 packages').ok, false);
});

test('fails when the final install still reports ERESOLVE (unresolved)', () => {
  const overrides = [{ package: 'ag-grid-community', specifier: '35.3.0', reason: 'x' }];
  const log = 'npm error code ERESOLVE\nnpm error Could not resolve dependency';
  const v = resolveVerdict(overrides, log);
  assert.equal(v.ok, false);
  assert.match(v.reason, /ERESOLVE/);
});

test('a missing/empty log is treated as clean (absence is not an ERESOLVE)', () => {
  const overrides = [{ package: 'x', specifier: '1.0.0', reason: 'y' }];
  assert.equal(resolveVerdict(overrides, '').ok, true);
});
