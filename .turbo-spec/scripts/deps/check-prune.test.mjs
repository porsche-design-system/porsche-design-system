import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pruneVerdict } from './check-prune.mjs';

test('pass: install ok, no regression, well-formed removed, docs touched', () => {
  const v = pruneVerdict({
    installOk: true,
    regressed: false,
    removed: [{ key: 'braces', reason: 'advisory fixed upstream' }],
    docsTouched: true,
  });
  assert.equal(v.ok, true);
});

test('pass: nothing removed needs no docs edit', () => {
  const v = pruneVerdict({ installOk: true, regressed: false, removed: [], docsTouched: false });
  assert.equal(v.ok, true);
});

test('fail: audit regressed', () => {
  const v = pruneVerdict({ installOk: true, regressed: true, removed: [], docsTouched: false });
  assert.equal(v.ok, false);
});

test('fail: install broken', () => {
  const v = pruneVerdict({ installOk: false, regressed: false, removed: [], docsTouched: false });
  assert.equal(v.ok, false);
});

test('fail: removed something but did not touch docs', () => {
  const v = pruneVerdict({
    installOk: true,
    regressed: false,
    removed: [{ key: 'braces', reason: 'x' }],
    docsTouched: false,
  });
  assert.equal(v.ok, false);
});

test('fail: malformed removed entry (missing reason)', () => {
  const v = pruneVerdict({ installOk: true, regressed: false, removed: [{ key: 'braces' }], docsTouched: true });
  assert.equal(v.ok, false);
});
