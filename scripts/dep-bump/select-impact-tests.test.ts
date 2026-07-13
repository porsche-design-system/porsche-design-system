import assert from 'node:assert/strict';
import { test } from 'node:test';
import { selectImpactTests } from './select-impact-tests.ts';

test('root build-tool change triggers full build and broad unit tests', () => {
  const plan = selectImpactTests(['typescript']);
  assert.ok(plan.commands.includes('npm run build'));
  assert.ok(plan.commands.includes('npm run test:unit:components'));
  assert.equal(plan.broadenOrStop, false);
});

test('react wrapper dep change triggers core build and react unit tests', () => {
  const plan = selectImpactTests(['react-dom']);
  assert.ok(plan.commands.includes('npm run build:core-dependencies'));
  assert.ok(plan.commands.includes('npm run test:unit:components-react'));
});

test('unknown dep broadens and flags broadenOrStop', () => {
  const plan = selectImpactTests(['some-unknown-lib']);
  assert.equal(plan.broadenOrStop, true);
  assert.ok(plan.commands.includes('npm run build'));
  assert.ok(plan.commands.includes('npm run test:unit:components'));
});

test('empty change set runs a conservative core build and components unit', () => {
  const plan = selectImpactTests([]);
  assert.deepEqual(plan.commands, ['npm run build:core-dependencies', 'npm run test:unit:components']);
  assert.equal(plan.broadenOrStop, false);
});
