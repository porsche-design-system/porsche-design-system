import assert from 'node:assert/strict';
import { test } from 'node:test';
import { compareTree, treeProblems } from './tree-compare.ts';

test('treeProblems strips the trailing filesystem path so keys are host-stable', () => {
  const ls = {
    problems: [
      'extraneous: @emnapi/core@1.11.1 /Users/someone/repo/node_modules/@emnapi/core',
      'invalid: postcss@8.5.15 /home/runner/work/repo/node_modules/postcss',
    ],
  };
  assert.deepEqual(
    [...treeProblems(ls)].sort(),
    ['extraneous: @emnapi/core@1.11.1', 'invalid: postcss@8.5.15']
  );
});

test('treeProblems keeps path-less "missing ... required by" entries intact', () => {
  const ls = { problems: ['missing: chokidar@^3.0.0, required by karma@6.4.0'] };
  assert.deepEqual([...treeProblems(ls)], ['missing: chokidar@^3.0.0, required by karma@6.4.0']);
});

test('treeProblems returns an empty set when there are no problems', () => {
  assert.equal(treeProblems({}).size, 0);
  assert.equal(treeProblems({ problems: [] }).size, 0);
});

const baseline = {
  problems: [
    'invalid: chokidar@3.6.0 /repo/node_modules/karma/node_modules/chokidar',
    'extraneous: postcss@8.5.15 /repo/node_modules/postcss',
  ],
};

test('compareTree reports only edges NOT present at baseline as introduced', () => {
  const current = {
    problems: [
      'invalid: chokidar@3.6.0 /some/other/host/path/chokidar',
      'extraneous: postcss@8.5.15 /some/other/host/path/postcss',
      'invalid: react@19.0.0 /repo/node_modules/react',
    ],
  };
  const result = compareTree(baseline, current);
  assert.deepEqual(result.introduced, ['invalid: react@19.0.0']);
  assert.deepEqual(result.resolved, []);
});

test('compareTree reports edges present at baseline but gone now as resolved', () => {
  const current = { problems: ['invalid: chokidar@3.6.0 /x/chokidar'] };
  const result = compareTree(baseline, current);
  assert.deepEqual(result.introduced, []);
  assert.deepEqual(result.resolved, ['extraneous: postcss@8.5.15']);
});

test('compareTree with an identical tree introduces nothing (pre-existing tolerated)', () => {
  const result = compareTree(baseline, baseline);
  assert.deepEqual(result.introduced, []);
  assert.deepEqual(result.resolved, []);
});
