import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { buildReport, classifyBump, parseSyncpackOutput } from './parse-outdated.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const fixture = readFileSync(join(here, 'fixtures', 'syncpack-update-check.txt'), 'utf8');

test('parses every dependency line from real syncpack output', () => {
  const { dependencies } = parseSyncpackOutput(fixture);
  assert.equal(dependencies.length, 45);
});

test('captures name, frozen from/to specifiers and instance count', () => {
  const { dependencies } = parseSyncpackOutput(fixture);
  const byName = Object.fromEntries(dependencies.map((d) => [d.name, d]));

  assert.deepEqual(byName['@angular/build'], {
    name: '@angular/build',
    from: '^22.0.4',
    to: '^22.0.5',
    instances: 2,
    bump: 'patch',
  });
  // No range operator, two-digit instance count.
  assert.deepEqual(byName['@tailwindcss/postcss'], {
    name: '@tailwindcss/postcss',
    from: '^4.3.1',
    to: '^4.3.2',
    instances: 10,
    bump: 'patch',
  });
  assert.deepEqual(byName['@stackblitz/sdk'], {
    name: '@stackblitz/sdk',
    from: '1.11.0',
    to: '1.11.1',
    instances: 1,
    bump: 'patch',
  });
});

test('classifies major / minor / patch bumps', () => {
  const { dependencies } = parseSyncpackOutput(fixture);
  const byName = Object.fromEntries(dependencies.map((d) => [d.name, d]));
  assert.equal(byName['ag-grid-community'].bump, 'major'); // 35.3.1 -> 36.0.0
  assert.equal(byName['@react-router/dev'].bump, 'minor'); // ^8.0.1 -> ^8.1.0
  assert.equal(byName['@angular/build'].bump, 'patch'); // ^22.0.4 -> ^22.0.5
  assert.equal(byName['ejs'].bump, 'major'); // ^3.1.10 -> ^6.0.1
});

test('classifyBump handles edge cases directly', () => {
  assert.equal(classifyBump('^1.2.3', '^2.0.0'), 'major');
  assert.equal(classifyBump('~1.2.3', '~1.3.0'), 'minor');
  assert.equal(classifyBump('1.2.3', '1.2.4'), 'patch');
  assert.equal(classifyBump('^0.0.1653615', '^0.0.1657692'), 'patch');
  assert.equal(classifyBump('1.2.3', '1.2.3'), 'other');
});

test('parses the summary footer', () => {
  const { summary } = parseSyncpackOutput(fixture);
  assert.deepEqual(summary, { major: 18, minor: 43, patch: 103 });
});

test('ignores group headers, blank lines and the issues marker', () => {
  const { dependencies } = parseSyncpackOutput(fixture);
  for (const d of dependencies) {
    assert.ok(!d.name.includes('='), `unexpected header captured: ${d.name}`);
    assert.ok(!d.name.startsWith('Issues'));
  }
});

test('updates_exist is true when dependencies are present', () => {
  assert.equal(parseSyncpackOutput(fixture).updates_exist, true);
});

test('reports no updates for clean output', () => {
  const clean = '= Default Version Group ===\n\n✓ Dependencies are up to date\n';
  const report = parseSyncpackOutput(clean);
  assert.equal(report.updates_exist, false);
  assert.deepEqual(report.dependencies, []);
});

test('buildReport adds an ISO generated_at timestamp', () => {
  const report = buildReport(fixture, new Date('2025-01-02T03:04:05Z'));
  assert.equal(report.generated_at, '2025-01-02T03:04:05.000Z');
  assert.equal(report.updates_exist, true);
});
