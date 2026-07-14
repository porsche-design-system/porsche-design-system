import assert from 'node:assert/strict';
import { test } from 'node:test';
import { selectImpactTests } from './select-impact-tests.ts';

test('root build/test-infra change triggers a full build and the broad unit matrix', () => {
  const plan = selectImpactTests(['typescript']);
  assert.ok(plan.commands.includes('npm run build'));
  assert.ok(plan.commands.includes('npm run test:unit:components'));
  assert.ok(plan.commands.includes('npm run test:unit:storefront'));
  assert.ok(plan.commands.includes('npm run test:unit:styles'));
  assert.equal(plan.broadenOrStop, false);
});

test('vitest (test runner) change runs the broad unit matrix, not just components', () => {
  const plan = selectImpactTests(['vitest']);
  assert.ok(plan.commands.includes('npm run test:unit:components-react'));
  assert.ok(plan.commands.includes('npm run test:unit:components-vue'));
  assert.ok(plan.commands.includes('npm run test:unit:utilities'));
});

test('react wrapper dep change triggers wrapper build and react unit tests', () => {
  const plan = selectImpactTests(['react-dom']);
  assert.ok(plan.commands.includes('npm run build:core-dependencies'));
  assert.ok(plan.commands.includes('npm run build:components-react'));
  assert.ok(plan.commands.includes('npm run test:unit:components-react'));
});

test('React tooling now in the family is validated against the react wrapper', () => {
  const plan = selectImpactTests(['@testing-library/react']);
  assert.ok(plan.commands.includes('npm run test:unit:components-react'));
  assert.equal(plan.broadenOrStop, false);
});

test('styling family change runs the styles build and styles unit tests', () => {
  for (const dep of ['sass', 'tailwindcss', '@emotion/react', '@vanilla-extract/css']) {
    const plan = selectImpactTests([dep]);
    assert.ok(plan.commands.includes('npm run build:styles'), `${dep} -> build:styles`);
    assert.ok(plan.commands.includes('npm run test:unit:styles'), `${dep} -> test:unit:styles`);
  }
});

test('storefront content dep change runs the storefront build and unit tests', () => {
  const plan = selectImpactTests(['react-syntax-highlighter']);
  assert.ok(plan.commands.includes('npm run build:storefront'));
  assert.ok(plan.commands.includes('npm run test:unit:storefront'));
});

test('a dep in multiple categories accumulates all relevant validations (next)', () => {
  const plan = selectImpactTests(['next']);
  assert.ok(plan.commands.includes('npm run test:unit:components-react'));
  assert.ok(plan.commands.includes('npm run test:unit:storefront'));
});

test('unknown dep broadens to the full build + broad unit matrix and flags broadenOrStop', () => {
  const plan = selectImpactTests(['some-unknown-lib']);
  assert.equal(plan.broadenOrStop, true);
  assert.ok(plan.commands.includes('npm run build'));
  assert.ok(plan.commands.includes('npm run test:unit:components'));
  assert.ok(plan.commands.includes('npm run test:unit:storefront'));
});

test('empty change set runs a conservative core build and components unit', () => {
  const plan = selectImpactTests([]);
  assert.deepEqual(plan.commands, ['npm run build:core-dependencies', 'npm run test:unit:components']);
  assert.equal(plan.broadenOrStop, false);
});
