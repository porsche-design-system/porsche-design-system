import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyBump, isHeld } from './classify-bump.ts';

const HELD = ['@porsche-design-system/**', '@angular/**', 'ng-packagr', 'zone.js'];

test('isHeld matches scoped globs and exact names', () => {
  assert.equal(isHeld('@porsche-design-system/components', HELD), true);
  assert.equal(isHeld('@angular/core', HELD), true);
  assert.equal(isHeld('zone.js', HELD), true);
  assert.equal(isHeld('react', HELD), false);
});

test('classifyBump flags majors and reports NO_CHANGES', () => {
  const before = { react: '18.3.1', typescript: '5.9.2', vite: '5.4.0' };
  const after = { react: '19.0.0', typescript: '5.9.3', vite: '5.4.0' };
  const result = classifyBump(before, after, HELD);
  assert.equal(result.outcome, 'CHANGED');
  assert.deepEqual(result.changes, [
    { name: 'react', from: '18.3.1', to: '19.0.0', major: true },
    { name: 'typescript', from: '5.9.2', to: '5.9.3', major: false },
  ]);
  assert.deepEqual(result.heldViolations, []);
  assert.equal(classifyBump(before, before, HELD).outcome, 'NO_CHANGES');
});

test('classifyBump records held-back violations', () => {
  const before = { '@angular/core': '20.0.0' };
  const after = { '@angular/core': '21.0.0' };
  const result = classifyBump(before, after, HELD);
  assert.deepEqual(result.heldViolations, ['@angular/core']);
});
