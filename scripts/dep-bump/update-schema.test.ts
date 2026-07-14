import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import Ajv2020 from 'ajv/dist/2020';

const schema = JSON.parse(
  readFileSync(resolve(import.meta.dirname, '../../.turbo-spec/schemas/dep-bump-update.schema.json'), 'utf8')
);
const validate = new Ajv2020({ allErrors: true }).compile(schema);

test('schema accepts BLOCKED_PREEXISTING retaining filesChanged with a stopReason', () => {
  const ok = validate({
    schemaVersion: 1,
    outcome: 'BLOCKED_PREEXISTING',
    summary: 'bumps applied; pre-existing edge blocks the gate',
    filesChanged: ['package.json', 'package-lock.json'],
    stopReason: 'chokidar invalid edge is pre-existing, not attributable to this run',
  });
  assert.equal(ok, true, JSON.stringify(validate.errors));
});

test('schema rejects BLOCKED_PREEXISTING without a stopReason', () => {
  const ok = validate({
    schemaVersion: 1,
    outcome: 'BLOCKED_PREEXISTING',
    summary: 'bumps applied; pre-existing edge blocks the gate',
    filesChanged: ['package.json'],
    stopReason: null,
  });
  assert.equal(ok, false);
});

test('schema still accepts a plain RESOLVED outcome', () => {
  const ok = validate({ schemaVersion: 1, outcome: 'RESOLVED', summary: 'bumped' });
  assert.equal(ok, true, JSON.stringify(validate.errors));
});
