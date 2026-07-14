import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildMajorHintResult, type NpmOutdated, renderMajorHints } from './major-hint.ts';
import type { DependencyPolicy } from './policy.ts';

const policy: DependencyPolicy = {
  ignored: ['@porsche-design-system/**', '@playwright/test', '@stencil/core'],
  minorOnly: ['ag-grid-community', '@angular/**', 'react', 'react-dom'],
};

test('buildMajorHintResult reports only policy-held majors, ignoring "other" majors', () => {
  const outdated: NpmOutdated = {
    'ag-grid-community': [
      { current: '35.3.1', wanted: '35.3.1', latest: '36.0.0' },
      { current: '35.3.1', wanted: '35.3.1', latest: '36.0.0' },
    ],
    typescript: [{ current: '6.0.3', wanted: '6.0.3', latest: '7.0.2' }],
    webpack: [{ current: '5.108.1', wanted: '5.108.4', latest: '6.0.0' }],
    'react-dom': { current: '19.2.0', wanted: '19.2.7', latest: '19.2.7' },
  };
  const result = buildMajorHintResult(true, true, outdated, policy);
  assert.equal(result.status, 'COMPLETE');
  assert.deepEqual(result.hints, [
    { name: 'ag-grid-community', current: '35.3.1', latest: '36.0.0', reason: 'family' },
    { name: 'typescript', current: '6.0.3', latest: '7.0.2', reason: 'typescript-ceiling' },
  ]);
});

test('buildMajorHintResult is UNAVAILABLE when npm outdated did not return parseable data', () => {
  const result = buildMajorHintResult(false, true, {}, policy);
  assert.equal(result.status, 'UNAVAILABLE');
  assert.deepEqual(result.hints, []);
});

test('buildMajorHintResult is UNAVAILABLE when the tree is not installed (never claims "none")', () => {
  const result = buildMajorHintResult(true, false, {}, policy);
  assert.equal(result.status, 'UNAVAILABLE');
  assert.deepEqual(result.hints, []);
});

test('buildMajorHintResult is COMPLETE with no hints when nothing is held back', () => {
  const result = buildMajorHintResult(true, true, {}, policy);
  assert.equal(result.status, 'COMPLETE');
  assert.deepEqual(result.hints, []);
});

test('buildMajorHintResult is INCOMPLETE when a held candidate cannot be evaluated', () => {
  const outdated: NpmOutdated = {
    'ag-grid-community': [{ wanted: '36.0.0', latest: '36.0.0' }],
  };
  const result = buildMajorHintResult(true, true, outdated, policy);
  assert.equal(result.status, 'INCOMPLETE');
  assert.deepEqual(result.hints, []);
});

test('renderMajorHints warns loudly when unavailable and never says "none"', () => {
  const md = renderMajorHints({ status: 'UNAVAILABLE', hints: [], note: 'tree not installed' });
  assert.match(md, /unavailable/i);
  assert.doesNotMatch(md, /No major updates are being held back/);
});

test('renderMajorHints lists held majors with their reason', () => {
  const md = renderMajorHints({
    status: 'COMPLETE',
    hints: [{ name: 'ag-grid-community', current: '35.3.1', latest: '36.0.0', reason: 'family' }],
  });
  assert.match(md, /## Held-back major updates \(apply by hand\)/);
  assert.match(md, /`ag-grid-community` 35\.3\.1 → \*\*36\.0\.0\*\*/);
  assert.match(md, /framework\/styling family/);
});

test('renderMajorHints reports the empty case only when collection completed', () => {
  assert.match(renderMajorHints({ status: 'COMPLETE', hints: [] }), /No major updates are being held back/);
});
