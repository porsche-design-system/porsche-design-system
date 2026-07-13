import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advisoryIdentities, compareAudits } from './audit-compare.ts';

const baseline = {
  vulnerabilities: {
    lodash: { via: [{ source: 1001, name: 'lodash' }] },
  },
};
const current = {
  vulnerabilities: {
    lodash: { via: [{ source: 1001, name: 'lodash' }] },
    minimatch: { via: [{ source: 2002, name: 'minimatch' }, 'brace-expansion'] },
  },
};

test('advisoryIdentities keys by source id and package name, ignoring string via entries', () => {
  assert.deepEqual([...advisoryIdentities(current)].sort(), ['1001:lodash', '2002:minimatch']);
});

test('compareAudits reports newly introduced advisories only', () => {
  const result = compareAudits(baseline, current);
  assert.deepEqual(result.introduced, ['2002:minimatch']);
  assert.deepEqual(result.resolved, []);
});

test('compareAudits reports resolved advisories', () => {
  const result = compareAudits(current, baseline);
  assert.deepEqual(result.introduced, []);
  assert.deepEqual(result.resolved, ['2002:minimatch']);
});
