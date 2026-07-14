import assert from 'node:assert/strict';
import { test } from 'node:test';
import { treeProblems } from './tree-compare.ts';

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
