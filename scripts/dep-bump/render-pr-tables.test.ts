import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { BumpChange } from './classify-bump.ts';
import type { HeldBackResult } from './held-back.ts';
import { MARKER, renderTables } from './render-pr-tables.ts';

const updated: BumpChange[] = [
  { name: '@angular/core', from: '22.0.4', to: '22.0.6', major: false, level: 'patch' },
  { name: 'vite', from: '5.4.0', to: '6.0.0', major: true, level: 'major' },
];

const held: HeldBackResult = {
  status: 'COMPLETE',
  packages: [
    { name: 'ag-grid-community', current: '35.3.1', latest: '36.0.0', level: 'major', reason: 'family' },
    { name: '@playwright/test', current: '1.40.0', latest: '1.40.1', level: 'patch', reason: 'held' },
  ],
};

test('renderTables emits both tables with the idempotency marker, levels and reasons', () => {
  const md = renderTables(updated, held);
  assert.ok(md.startsWith(MARKER));
  assert.match(md, /Updated dependencies \(2\)/);
  assert.match(md, /\| `@angular\/core` \| 22\.0\.4 \| 22\.0\.6 \| PATCH \|/);
  assert.match(md, /\| `vite` \| 5\.4\.0 \| 6\.0\.0 \| MAJOR \|/);
  assert.match(md, /Available updates held back \(2\)/);
  assert.match(md, /\| `ag-grid-community` \| 35\.3\.1 \| 36\.0\.0 \| MAJOR \| minor\/patch only \|/);
  assert.match(md, /\| `@playwright\/test` \| 1\.40\.0 \| 1\.40\.1 \| PATCH \| permanently held \|/);
});

test('renderTables shows an explicit empty state when nothing was updated', () => {
  const md = renderTables([], held);
  assert.match(md, /_No dependencies were updated\._/);
});

test('renderTables shows an all-up-to-date state when the held list is COMPLETE and empty', () => {
  const md = renderTables(updated, { status: 'COMPLETE', packages: [] });
  assert.match(md, /_No held-back updates: everything updatable is up to date\._/);
});

test('renderTables warns loudly when held-back data is UNAVAILABLE and never says "none"', () => {
  const md = renderTables(updated, { status: 'UNAVAILABLE', packages: [], note: 'tree not installed' });
  assert.match(md, /⚠️/);
  assert.match(md, /unavailable/i);
  assert.doesNotMatch(md, /everything updatable is up to date/);
});

test('renderTables appends the partial-data note when held-back status is INCOMPLETE', () => {
  const md = renderTables(updated, {
    status: 'INCOMPLETE',
    packages: held.packages,
    note: 'Some declared packages could not be evaluated; list may be partial.',
  });
  assert.match(md, /Available updates held back \(2\)/);
  assert.match(md, /list may be partial/);
});

test('renderTables appends advisory and pruned-override sections', () => {
  const md = renderTables(
    [],
    { status: 'COMPLETE', packages: [] },
    [{ name: 'lodash', severity: 'high', title: 'Prototype pollution' }],
    { schemaVersion: 1, removed: [{ name: 'minimatch@9' }], kept: [] },
  );
  assert.match(md, /### Security advisories \(1\)/);
  assert.match(md, /### Pruned overrides \(1\)/);
  assert.match(md, /`minimatch@9`/);
});
