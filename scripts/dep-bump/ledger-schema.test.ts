import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import Ajv2020 from 'ajv/dist/2020';

const schema = JSON.parse(
  readFileSync(resolve(import.meta.dirname, '../../.turbo-spec/schemas/dep-bump-ledger.schema.json'), 'utf8')
);
const validate = new Ajv2020({ allErrors: true }).compile(schema);

const fp = {
  declarer: 'karma@6.4.0',
  peer: 'chokidar',
  demandedRange: '^3.0.0',
  providerVersion: '4.0.1',
};

test('schema accepts an empty ledger', () => {
  const ok = validate({ schemaVersion: 1, entries: [] });
  assert.equal(ok, true, JSON.stringify(validate.errors));
});

test('schema accepts a ledger with a FAILED remedy entry', () => {
  const ok = validate({
    schemaVersion: 1,
    entries: [{ fingerprint: fp, remedy: 'override chokidar@4', outcome: 'FAILED' }],
  });
  assert.equal(ok, true, JSON.stringify(validate.errors));
});

test('schema rejects an entry with an unknown outcome', () => {
  const ok = validate({
    schemaVersion: 1,
    entries: [{ fingerprint: fp, remedy: 'x', outcome: 'MAYBE' }],
  });
  assert.equal(ok, false);
});

test('schema rejects an entry missing a fingerprint field', () => {
  const ok = validate({
    schemaVersion: 1,
    entries: [{ fingerprint: { declarer: 'a', peer: 'b', demandedRange: 'c' }, remedy: 'x', outcome: 'FAILED' }],
  });
  assert.equal(ok, false);
});
