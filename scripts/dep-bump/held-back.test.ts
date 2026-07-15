import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildHeldBack, type NpmOutdated } from './held-back.ts';
import type { DependencyPolicy } from './policy.ts';

const policy: DependencyPolicy = {
  ignored: ['@porsche-design-system/**', '@playwright/test', '@stencil/core'],
  minorOnly: ['ag-grid-*', '@angular/**', 'react', 'react-dom', 'typescript'],
};

const declared = new Set([
  'ag-grid-community',
  '@playwright/test',
  'typescript',
  'webpack',
  'react-dom',
  '@porsche-design-system/components-js',
]);

test('buildHeldBack reports every declared dep with an available update, tagged by level and reason', () => {
  const outdated: NpmOutdated = {
    // family capped to minor: a major is available but held
    'ag-grid-community': [
      { current: '35.3.1', wanted: '35.3.1', latest: '36.0.0' },
      { current: '35.3.1', wanted: '35.3.1', latest: '36.0.0' },
    ],
    // permanently held: even a patch is held back
    '@playwright/test': { current: '1.40.0', wanted: '1.40.0', latest: '1.40.1' },
    // "other": not in any group — an available major that was NOT applied this run
    webpack: { current: '5.108.1', wanted: '5.108.1', latest: '6.0.0' },
    // already up to date (wanted === current === latest) — not held
    'react-dom': { current: '19.2.7', wanted: '19.2.7', latest: '19.2.7' },
  };
  const result = buildHeldBack(true, true, outdated, declared, policy);
  assert.equal(result.status, 'COMPLETE');
  assert.deepEqual(result.packages, [
    { name: '@playwright/test', current: '1.40.0', latest: '1.40.1', level: 'patch', reason: 'held' },
    { name: 'ag-grid-community', current: '35.3.1', latest: '36.0.0', level: 'major', reason: 'family' },
    { name: 'webpack', current: '5.108.1', latest: '6.0.0', level: 'major', reason: 'other' },
  ]);
});

test('buildHeldBack ignores transitive (non-declared) and @porsche-design-system internals', () => {
  const outdated: NpmOutdated = {
    // transitive dep not declared in any package.json
    'left-pad': { current: '1.0.0', wanted: '1.0.0', latest: '2.0.0' },
    // internal workspace package, declared but excluded
    '@porsche-design-system/components-js': { current: '1.0.0', wanted: '1.0.0', latest: '2.0.0' },
  };
  const result = buildHeldBack(true, true, outdated, declared, policy);
  assert.equal(result.status, 'COMPLETE');
  assert.deepEqual(result.packages, []);
});

test('buildHeldBack is UNAVAILABLE when npm outdated did not return parseable data', () => {
  const result = buildHeldBack(false, true, {}, declared, policy);
  assert.equal(result.status, 'UNAVAILABLE');
  assert.deepEqual(result.packages, []);
});

test('buildHeldBack is UNAVAILABLE when the tree is not installed (never claims "none")', () => {
  const result = buildHeldBack(true, false, {}, declared, policy);
  assert.equal(result.status, 'UNAVAILABLE');
  assert.deepEqual(result.packages, []);
});

test('buildHeldBack is COMPLETE with no packages when nothing is held back', () => {
  const result = buildHeldBack(true, true, {}, declared, policy);
  assert.equal(result.status, 'COMPLETE');
  assert.deepEqual(result.packages, []);
});

test('buildHeldBack is INCOMPLETE when a declared candidate lacks a resolvable version', () => {
  const outdated: NpmOutdated = {
    'ag-grid-community': [{ wanted: '36.0.0', latest: '36.0.0' }],
  };
  const result = buildHeldBack(true, true, outdated, declared, policy);
  assert.equal(result.status, 'INCOMPLETE');
  assert.deepEqual(result.packages, []);
});
