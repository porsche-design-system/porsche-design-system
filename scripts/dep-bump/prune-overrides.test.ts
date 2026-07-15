import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  overrideBaseName,
  planPrune,
  selectPruneCandidates,
  shouldRemoveOverride,
  type Overrides,
} from './prune-overrides.ts';

test('overrideBaseName strips a trailing @<major> only', () => {
  assert.equal(overrideBaseName('madge'), 'madge');
  assert.equal(overrideBaseName('minimatch@9'), 'minimatch');
  assert.equal(overrideBaseName('@scope/pkg@3'), '@scope/pkg');
  assert.equal(overrideBaseName('@scope/pkg'), '@scope/pkg');
});

test('selectPruneCandidates is empty when nothing related changed', () => {
  const overrides: Overrides = { 'minimatch@9': '9.0.7', next: { postcss: '^8.5.10' } };
  assert.deepEqual(selectPruneCandidates(overrides, []), []);
  assert.deepEqual(selectPruneCandidates(overrides, ['lodash']), []);
});

test('selectPruneCandidates matches direct and object-form children', () => {
  const overrides: Overrides = {
    'minimatch@9': '9.0.7',
    next: { postcss: '^8.5.10' },
    madge: { typescript: '$typescript' },
  };
  assert.deepEqual(selectPruneCandidates(overrides, ['minimatch']), ['minimatch@9']);
  assert.deepEqual(selectPruneCandidates(overrides, ['postcss']), ['next']);
  assert.deepEqual(selectPruneCandidates(overrides, ['minimatch', 'postcss']).sort(), ['minimatch@9', 'next']);
});

test('shouldRemoveOverride removes only on a clean install with no audit regression', () => {
  assert.equal(shouldRemoveOverride(true, false), true);
  assert.equal(shouldRemoveOverride(true, true), false);
  assert.equal(shouldRemoveOverride(false, false), false);
});

test('planPrune returns the same candidates as selectPruneCandidates', () => {
  const overrides = { 'minimatch@9': '9.0.7', next: { postcss: '^8.5.10' } };
  assert.deepEqual(planPrune(overrides, ['minimatch']), ['minimatch@9']);
  assert.deepEqual(planPrune(overrides, []), []);
});
