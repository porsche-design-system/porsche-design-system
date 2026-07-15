import assert from 'node:assert/strict';
import { test } from 'node:test';
import { type Fingerprint, emptyLedger, fingerprintKey, hasFailedRemedy, recordRemedy } from './ledger.ts';

const fp = (over: Partial<Fingerprint> = {}): Fingerprint => ({
  declarer: 'karma@6.4.0',
  peer: 'chokidar',
  demandedRange: '^3.0.0',
  providerVersion: '4.0.1',
  ...over,
});

test('fingerprintKey is stable and unique per conflict tuple', () => {
  assert.equal(fingerprintKey(fp()), 'karma@6.4.0|chokidar|^3.0.0|4.0.1');
  assert.notEqual(fingerprintKey(fp()), fingerprintKey(fp({ providerVersion: '4.0.2' })));
});

test('emptyLedger has a schema version and no entries', () => {
  assert.deepEqual(emptyLedger(), { schemaVersion: 1, entries: [] });
});

test('recordRemedy appends an entry', () => {
  const led = recordRemedy(emptyLedger(), { fingerprint: fp(), remedy: 'override chokidar@4', outcome: 'FAILED' });
  assert.equal(led.entries.length, 1);
  assert.equal(led.entries[0].outcome, 'FAILED');
});

test('recordRemedy is idempotent for the same fingerprint + remedy', () => {
  const entry = { fingerprint: fp(), remedy: 'override chokidar@4', outcome: 'FAILED' as const };
  const led = recordRemedy(recordRemedy(emptyLedger(), entry), entry);
  assert.equal(led.entries.length, 1);
});

test('hasFailedRemedy is true only when a FAILED entry exists for the fingerprint', () => {
  const led = recordRemedy(emptyLedger(), { fingerprint: fp(), remedy: 'override chokidar@4', outcome: 'FAILED' });
  assert.equal(hasFailedRemedy(led, fp()), true);
  assert.equal(hasFailedRemedy(led, fp({ providerVersion: '9.9.9' })), false);
});

test('a non-FAILED outcome does not count as a failed remedy', () => {
  const led = recordRemedy(emptyLedger(), { fingerprint: fp(), remedy: 'widen wrapper range', outcome: 'RESOLVED' });
  assert.equal(hasFailedRemedy(led, fp()), false);
});
