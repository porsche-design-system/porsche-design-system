import assert from 'node:assert/strict';
import { test } from 'node:test';
import { collectDepsFromFiles } from './collect-deps.ts';

test('collectDepsFromFiles merges dep fields across files via an injected reader', () => {
  const files: Record<string, string> = {
    'package.json': JSON.stringify({
      dependencies: { react: '19.0.0' },
      devDependencies: { typescript: '6.0.0' },
    }),
    'packages/a/package.json': JSON.stringify({
      optionalDependencies: { fsevents: '2.3.3' },
      dependencies: { react: '19.0.1' },
    }),
  };
  const deps = collectDepsFromFiles(Object.keys(files), (f) => files[f]);
  assert.deepEqual(deps, {
    react: '19.0.1',
    typescript: '6.0.0',
    fsevents: '2.3.3',
  });
});

test('collectDepsFromFiles skips files the reader cannot read', () => {
  const deps = collectDepsFromFiles(['gone.json', 'ok/package.json'], (f) => {
    if (f === 'gone.json') throw new Error('ENOENT');
    return JSON.stringify({ dependencies: { lodash: '4.17.21' } });
  });
  assert.deepEqual(deps, { lodash: '4.17.21' });
});

test('collectDepsFromFiles returns an empty map for no files', () => {
  assert.deepEqual(
    collectDepsFromFiles([], () => ''),
    {}
  );
});
