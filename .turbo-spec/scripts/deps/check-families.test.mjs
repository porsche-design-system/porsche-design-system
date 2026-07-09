import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findSplitFamilies } from './check-families.mjs';

const report = (names) => ({ updates_exist: true, dependencies: names.map((name) => ({ name, from: 'x', to: 'y', instances: 1, bump: 'minor' })) });
const plan = (names) => ({ angular_bumped: false, updates: names.map((name) => ({ name, from: 'x', to: 'y' })) });

test('flags a partially-bumped family (proper non-empty subset)', () => {
  const r = report(['@angular/core', '@angular/cli', 'zone.js', 'vite']);
  const p = plan(['@angular/core', 'vite']);
  const splits = findSplitFamilies(r, p);
  assert.equal(splits.length, 1);
  assert.equal(splits[0].family, 'angular');
  assert.deepEqual(splits[0].missing.sort(), ['@angular/cli', 'zone.js']);
});

test('passes when every reported family member is planned', () => {
  const r = report(['@angular/core', '@angular/cli', 'zone.js']);
  const p = plan(['@angular/core', '@angular/cli', 'zone.js']);
  assert.deepEqual(findSplitFamilies(r, p), []);
});

test('passes when the whole family is deferred (none planned)', () => {
  const r = report(['@angular/core', '@angular/cli', 'zone.js', 'vite']);
  const p = plan(['vite']);
  assert.deepEqual(findSplitFamilies(r, p), []);
});

test('never flags the "other" group', () => {
  const r = report(['vite', 'typescript', 'esbuild']);
  const p = plan(['vite']);
  assert.deepEqual(findSplitFamilies(r, p), []);
});

test('reports only the split family when families are mixed', () => {
  const r = report(['react', 'react-dom', 'ag-grid-community', 'ag-grid-angular']);
  const p = plan(['react', 'react-dom', 'ag-grid-community']); // react whole, ag-grid split
  const splits = findSplitFamilies(r, p);
  assert.equal(splits.length, 1);
  assert.equal(splits[0].family, 'ag-grid');
  assert.deepEqual(splits[0].missing, ['ag-grid-angular']);
});

test('tolerates missing/empty inputs without throwing', () => {
  assert.deepEqual(findSplitFamilies({}, {}), []);
  assert.deepEqual(findSplitFamilies(null, null), []);
});
