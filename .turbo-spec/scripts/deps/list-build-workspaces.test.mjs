import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildWorkspaceDirs } from './list-build-workspaces.mjs';

test('derives distinct dist-workspace dirs from the workspaces globs', () => {
  const ws = [
    'packages/*',
    'packages/components-angular/dist/angular-wrapper',
    'packages/components-js/dist/components-wrapper',
    'packages/shared/dist',
    'packages/components-react/projects/nextjs',
  ];
  assert.deepEqual(buildWorkspaceDirs(ws), [
    'packages/components-angular/dist',
    'packages/components-js/dist',
    'packages/shared/dist',
  ]);
});

test('collapses multiple wrappers under the same dist into one dir', () => {
  const ws = [
    'packages/components-angular/dist/angular-wrapper',
    'packages/components-angular/dist/other-wrapper',
  ];
  assert.deepEqual(buildWorkspaceDirs(ws), ['packages/components-angular/dist']);
});

test('ignores non-dist workspaces and handles empty/undefined input', () => {
  assert.deepEqual(buildWorkspaceDirs(['packages/*', 'packages/tokens/projects/tokens-meta']), []);
  assert.deepEqual(buildWorkspaceDirs([]), []);
  assert.deepEqual(buildWorkspaceDirs(undefined), []);
});

test('does not match a path that merely contains "distribution"', () => {
  assert.deepEqual(buildWorkspaceDirs(['packages/distribution-tools']), []);
});
