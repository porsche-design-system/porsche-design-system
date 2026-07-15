import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyRun, pickFreshRun, pickRun, type RunView } from './build-gate.ts';

test('classifyRun is PENDING until the run completes', () => {
  assert.equal(classifyRun(null), 'PENDING');
  assert.equal(classifyRun({ status: 'queued' }), 'PENDING');
  assert.equal(classifyRun({ status: 'in_progress' }), 'PENDING');
});

test('classifyRun maps a completed run to PASS/FAIL by conclusion', () => {
  assert.equal(classifyRun({ status: 'completed', conclusion: 'success' }), 'PASS');
  assert.equal(classifyRun({ status: 'completed', conclusion: 'failure' }), 'FAIL');
  assert.equal(classifyRun({ status: 'completed', conclusion: 'cancelled' }), 'FAIL');
});

test('pickRun selects the newest run matching the head sha', () => {
  const runs: RunView[] = [
    { databaseId: 1, headSha: 'aaa', createdAt: '2026-07-15T10:00:00Z' },
    { databaseId: 2, headSha: 'bbb', createdAt: '2026-07-15T11:00:00Z' },
    { databaseId: 3, headSha: 'bbb', createdAt: '2026-07-15T12:00:00Z' },
  ];
  assert.equal(pickRun(runs, 'bbb')?.databaseId, 3);
  assert.equal(pickRun(runs, 'ccc'), null);
});

test('pickFreshRun excludes stale runs in beforeIds and picks new ones', () => {
  const stale: RunView = { databaseId: 1, headSha: 'aaa', status: 'completed', conclusion: 'success', createdAt: '2026-07-15T10:00:00Z' };
  const before = new Set<number | undefined>([1]);

  // Only the stale run exists — nothing fresh yet
  assert.equal(pickFreshRun([stale], before, 'aaa'), null);
  assert.equal(classifyRun(pickFreshRun([stale], before, 'aaa')), 'PENDING');

  // A new run appears
  const fresh: RunView = { databaseId: 2, headSha: 'aaa', status: 'in_progress', createdAt: '2026-07-15T11:00:00Z' };
  assert.equal(pickFreshRun([stale, fresh], before, 'aaa')?.databaseId, 2);
});
