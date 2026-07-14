import assert from 'node:assert/strict';
import { test } from 'node:test';
import { collectMajorHints, type NpmOutdated, renderMajorHints } from './major-hint.ts';

test('collectMajorHints keeps only major gaps and dedupes array entries', () => {
  const outdated: NpmOutdated = {
    'ag-grid-community': [
      { current: '35.3.1', wanted: '35.3.1', latest: '36.0.0' },
      { current: '35.3.1', wanted: '35.3.1', latest: '36.0.0' },
    ],
    typescript: [{ current: '6.0.3', wanted: '6.0.3', latest: '7.0.2' }],
    webpack: [{ current: '5.108.1', wanted: '5.108.4', latest: '5.108.4' }],
    'react-dom': { current: '19.2.0', wanted: '19.2.7', latest: '19.2.7' },
  };
  assert.deepEqual(collectMajorHints(outdated), [
    { name: 'ag-grid-community', current: '35.3.1', latest: '36.0.0' },
    { name: 'typescript', current: '6.0.3', latest: '7.0.2' },
  ]);
});

test('collectMajorHints skips entries without current or latest', () => {
  const outdated: NpmOutdated = {
    'not-installed': [{ wanted: '2.0.0', latest: '2.0.0' }],
  };
  assert.deepEqual(collectMajorHints(outdated), []);
});

test('renderMajorHints renders a list or an empty note', () => {
  assert.match(renderMajorHints([]), /No major updates are being held back/);
  const md = renderMajorHints([{ name: 'ag-grid-community', current: '35.3.1', latest: '36.0.0' }]);
  assert.match(md, /## Held-back major updates \(apply by hand\)/);
  assert.match(md, /`ag-grid-community` 35\.3\.1 → \*\*36\.0\.0\*\*/);
});
