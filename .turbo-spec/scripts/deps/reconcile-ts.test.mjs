import assert from 'node:assert/strict';
import { test } from 'node:test';
import { reconcileTs, excludedTypescript } from './reconcile-ts.mjs';

test('applies the frozen target verbatim when its version is <= ceiling', () => {
  assert.deepEqual(reconcileTs('^5.9.3', '5.9.0'), { apply: false, version: null });
  assert.deepEqual(reconcileTs('^5.8.3', '5.9.0'), { apply: true, version: '^5.8.3' });
  assert.deepEqual(reconcileTs('~5.9.0', '5.9.0'), { apply: true, version: '~5.9.0' });
});

test('holds (no apply) when the frozen target exceeds the ceiling', () => {
  assert.deepEqual(reconcileTs('^6.0.3', '5.9.0'), { apply: false, version: null });
});

test('holds when there is no frozen target', () => {
  assert.deepEqual(reconcileTs(undefined, '5.9.0'), { apply: false, version: null });
  assert.deepEqual(reconcileTs(null, '5.9.0'), { apply: false, version: null });
  assert.deepEqual(reconcileTs('', '5.9.0'), { apply: false, version: null });
});

test('strips range operators before comparing (^, ~, >=, spaces)', () => {
  assert.deepEqual(reconcileTs('>=5.8.0', '5.9.0'), { apply: true, version: '>=5.8.0' });
  assert.deepEqual(reconcileTs('  ^5.9.0 ', '5.9.0'), { apply: true, version: '  ^5.9.0 ' });
});

test('excludedTypescript pulls the typescript entry with a frozen to from a plan', () => {
  const plan = { excluded: [{ name: 'typescript', from: '^5.9.2', to: '^5.9.3', reason: 'x' }] };
  assert.equal(excludedTypescript(plan)?.to, '^5.9.3');
});

test('excludedTypescript returns null when typescript is not deferred or lacks a target', () => {
  assert.equal(excludedTypescript({ excluded: [] }), null);
  assert.equal(excludedTypescript({ excluded: [{ name: 'typescript', reason: 'no target' }] }), null);
  assert.equal(excludedTypescript({}), null);
});
