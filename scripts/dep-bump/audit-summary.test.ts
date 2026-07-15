import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderAuditSummary, summarizeAudit } from './audit-summary.ts';

const report = {
  vulnerabilities: {
    lodash: {
      severity: 'high',
      via: [{ source: 1001, name: 'lodash', title: 'Prototype pollution' }],
    },
    minimatch: {
      severity: 'moderate',
      via: [{ source: 2002, name: 'minimatch', title: 'ReDoS' }, 'brace-expansion'],
    },
  },
};

test('summarizeAudit lists one row per object advisory, sorted by name', () => {
  assert.deepEqual(summarizeAudit(report), [
    { name: 'lodash', severity: 'high', title: 'Prototype pollution' },
    { name: 'minimatch', severity: 'moderate', title: 'ReDoS' },
  ]);
});

test('renderAuditSummary reports "no advisories" for an empty report', () => {
  const md = renderAuditSummary(summarizeAudit({}));
  assert.match(md, /### Security advisories \(0\)/);
  assert.match(md, /_No advisories/);
});

test('renderAuditSummary renders a report-only table', () => {
  const md = renderAuditSummary(summarizeAudit(report));
  assert.match(md, /### Security advisories \(2\)/);
  assert.match(md, /\| `lodash` \| high \| Prototype pollution \|/);
  assert.match(md, /report-only/i);
});
