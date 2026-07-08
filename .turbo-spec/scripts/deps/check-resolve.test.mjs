import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findForbiddenFlags } from './check-resolve.mjs';

test('detects forbidden install flags', () => {
  assert.deepEqual(findForbiddenFlags('npm install --legacy-peer-deps'), ['--legacy-peer-deps']);
  assert.ok(findForbiddenFlags('npm install --force').length === 1);
  assert.ok(findForbiddenFlags('running npm audit fix now').length === 1);
});

test('passes a clean log', () => {
  assert.deepEqual(findForbiddenFlags('added 1200 packages in 30s'), []);
});
