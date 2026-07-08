import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isHeldBack } from './held-back.mjs';
import { findHeldBackViolations } from './check-heldback.mjs';

test('matches exact held-back names', () => {
  assert.equal(isHeldBack('@playwright/test'), true);
  assert.equal(isHeldBack('@stencil/core'), true);
});

test('matches scoped glob for @porsche-design-system/**', () => {
  assert.equal(isHeldBack('@porsche-design-system/components'), true);
  assert.equal(isHeldBack('@porsche-design-system/components-react'), true);
});

test('does not match unrelated deps', () => {
  assert.equal(isHeldBack('typescript'), false);
  assert.equal(isHeldBack('@angular/core'), false);
  assert.equal(isHeldBack('@playwright/experimental-ct'), false);
});

test('findHeldBackViolations flags held-back deps in a plan', () => {
  const plan = {
    updates: [
      { name: 'vite', from: '^8.1.0', to: '^8.1.3' },
      { name: '@stencil/core', from: '^4.0.0', to: '^4.1.0' },
      { name: '@porsche-design-system/components', from: '1.0.0', to: '1.1.0' },
    ],
  };
  assert.deepEqual(findHeldBackViolations(plan), [
    '@stencil/core',
    '@porsche-design-system/components',
  ]);
});

test('findHeldBackViolations passes a clean plan', () => {
  const plan = { updates: [{ name: 'vite', from: '^8.1.0', to: '^8.1.3' }] };
  assert.deepEqual(findHeldBackViolations(plan), []);
});
