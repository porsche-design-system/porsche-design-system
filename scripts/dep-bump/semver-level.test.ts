import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyLevel, isNewer } from './semver-level.ts';

test('classifyLevel classifies major, minor, patch', () => {
  assert.equal(classifyLevel('1.2.3', '2.0.0'), 'major');
  assert.equal(classifyLevel('1.2.3', '1.3.0'), 'minor');
  assert.equal(classifyLevel('1.2.3', '1.2.4'), 'patch');
});

test('classifyLevel coerces ranges and caret/tilde prefixes', () => {
  assert.equal(classifyLevel('^6.0.3', '^7.0.2'), 'major');
  assert.equal(classifyLevel('~19.2.0', '~19.2.7'), 'patch');
  assert.equal(classifyLevel('35.3.1', '36.0.0'), 'major');
});

test('classifyLevel treats a premajor jump as major', () => {
  assert.equal(classifyLevel('1.0.0', '2.0.0-beta.1'), 'major');
});

test('classifyLevel returns unknown when a version cannot be parsed', () => {
  assert.equal(classifyLevel('workspace:*', '1.0.0'), 'unknown');
  assert.equal(classifyLevel('1.0.0', 'not-a-version'), 'unknown');
});

test('isNewer is true only when the target is a greater version', () => {
  assert.equal(isNewer('35.3.1', '36.0.0'), true);
  assert.equal(isNewer('^6.0.3', '^7.0.2'), true);
  assert.equal(isNewer('19.2.7', '19.2.7'), false);
  assert.equal(isNewer('36.0.0', '35.3.1'), false);
  assert.equal(isNewer('1.0.0', 'not-a-version'), false);
});
