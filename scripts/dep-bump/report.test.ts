import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildReport } from './report.ts';

test('RESOLVED update with passing verify is SUCCESS', () => {
  const report = buildReport({ outcome: 'RESOLVED', bumped: [{ name: 'react' }] }, { outcome: 'PASS' });
  assert.equal(report.verdict, 'SUCCESS');
  assert.deepEqual(report.bumped, [{ name: 'react' }]);
});

test('NO_CHANGES update is NO_CHANGES regardless of verify', () => {
  assert.equal(buildReport({ outcome: 'NO_CHANGES' }, null).verdict, 'NO_CHANGES');
});

test('BLOCKED update is BLOCKED and carries the stop reason', () => {
  const report = buildReport({ outcome: 'BLOCKED', stopReason: 'react@19 breaking major' }, null);
  assert.equal(report.verdict, 'BLOCKED');
  assert.equal(report.stopReason, 'react@19 breaking major');
});

test('RESOLVED update with missing verify is BLOCKED (unverified tree)', () => {
  assert.equal(buildReport({ outcome: 'RESOLVED' }, null).verdict, 'BLOCKED');
});

test('buildReport threads major hints into the report (defaults to UNAVAILABLE)', () => {
  const hints = [{ name: 'ag-grid-community', current: '35.3.1', latest: '36.0.0', reason: 'family' as const }];
  const withHints = buildReport({ outcome: 'NO_CHANGES' }, null, { status: 'COMPLETE', hints });
  assert.deepEqual(withHints.majorHints, hints);
  assert.equal(withHints.majorHintStatus, 'COMPLETE');
  const withoutHints = buildReport({ outcome: 'NO_CHANGES' }, null);
  assert.deepEqual(withoutHints.majorHints, []);
  assert.equal(withoutHints.majorHintStatus, 'UNAVAILABLE');
});

test('BLOCKED_PREEXISTING retains the bumps and reports a distinct escalation verdict', () => {
  const report = buildReport(
    {
      outcome: 'BLOCKED_PREEXISTING',
      bumped: [{ name: 'vite' }],
      stopReason: 'pre-existing chokidar invalid edge, not attributable to this run',
    },
    null
  );
  assert.equal(report.verdict, 'BLOCKED_PREEXISTING');
  assert.deepEqual(report.bumped, [{ name: 'vite' }]);
  assert.equal(report.stopReason, 'pre-existing chokidar invalid edge, not attributable to this run');
});
