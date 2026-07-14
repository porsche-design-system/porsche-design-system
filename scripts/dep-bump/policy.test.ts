import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { matchesAny, matchesPattern, readDependencyPolicy } from './policy.ts';

test('matchesPattern handles scoped globs, prefix globs, and exact names', () => {
  assert.equal(matchesPattern('@angular/core', '@angular/**'), true);
  assert.equal(matchesPattern('@angular', '@angular/**'), true);
  assert.equal(matchesPattern('ag-grid-community', 'ag-grid-*'), true);
  assert.equal(matchesPattern('ag-grid-react', 'ag-grid-*'), true);
  assert.equal(matchesPattern('react', 'react'), true);
  // Exact names must not leak into siblings.
  assert.equal(matchesPattern('react-dom', 'react'), false);
  assert.equal(matchesPattern('@types/react-dom', '@types/react'), false);
  assert.equal(matchesPattern('@types/react-syntax-highlighter', '@types/react'), false);
  // `*` stays within a segment.
  assert.equal(matchesPattern('@ag-grid-community/core', 'ag-grid-*'), false);
});

test('matchesAny returns true when any pattern matches', () => {
  assert.equal(matchesAny('@emotion/react', ['react', '@emotion/**']), true);
  assert.equal(matchesAny('lodash', ['react', '@emotion/**']), false);
});

test('readDependencyPolicy derives ignored and minorOnly from updateGroups', () => {
  const dir = mkdtempSync(join(tmpdir(), 'policy-'));
  const configPath = join(dir, '.syncpackrc.json');
  writeFileSync(
    configPath,
    JSON.stringify({
      updateGroups: [
        { dependencies: ['@porsche-design-system/**', '@stencil/core'], isIgnored: true },
        { dependencies: ['@angular/**', 'react', 'ag-grid-*'], target: 'minor' },
        { dependencies: ['something-else'], target: 'latest' },
      ],
    })
  );
  const policy = readDependencyPolicy(configPath);
  assert.deepEqual(policy.ignored, ['@porsche-design-system/**', '@stencil/core']);
  assert.deepEqual(policy.minorOnly, ['@angular/**', 'react', 'ag-grid-*']);
});
