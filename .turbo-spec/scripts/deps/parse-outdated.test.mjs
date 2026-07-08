import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { test } from 'node:test';
import {
  buildReport,
  classifyBump,
  collectWritableDeps,
  findPackageJsons,
  parseSyncpackOutput,
  partitionOverrides,
} from './parse-outdated.mjs';

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

// --- overrides partitioning ---

const deps = { fs, path };

function makeRepo(pkgs) {
  const root = mkdtempSync(join(tmpdir(), 'parse-outdated-'));
  for (const [rel, contents] of Object.entries(pkgs)) {
    const file = join(root, rel);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, JSON.stringify(contents, null, 2));
  }
  return root;
}

test('collectWritableDeps gathers names from writable sections across packages, ignoring overrides', () => {
  const root = makeRepo({
    'package.json': {
      dependencies: { vue: '^3.5.39' },
      devDependencies: { biome: '^2.5.1' },
      overrides: { ejs: '^3.1.10', lodash: '^4.18.1' },
    },
    'packages/a/package.json': {
      peerDependencies: { react: '^19.0.0' },
      optionalDependencies: { fsevents: '^2.3.3' },
    },
  });
  try {
    const names = collectWritableDeps(root, deps);
    assert.ok(names.has('vue'));
    assert.ok(names.has('biome'));
    assert.ok(names.has('react'));
    assert.ok(names.has('fsevents'));
    // overrides-only names are NOT collected
    assert.ok(!names.has('ejs'));
    assert.ok(!names.has('lodash'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('findPackageJsons skips node_modules and dot directories', () => {
  const root = makeRepo({
    'package.json': { name: 'root' },
    'packages/a/package.json': { name: 'a' },
    'node_modules/dep/package.json': { name: 'dep' },
    '.cache/package.json': { name: 'cache' },
  });
  try {
    const found = findPackageJsons(root, deps).map((f) => f.replace(root, ''));
    assert.equal(found.length, 2);
    assert.ok(found.some((f) => f.endsWith('/package.json') && !f.includes('packages')));
    assert.ok(found.some((f) => f.includes('packages/a')));
    assert.ok(!found.some((f) => f.includes('node_modules')));
    assert.ok(!found.some((f) => f.includes('.cache')));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('partitionOverrides moves override-only deps out of the bump list', () => {
  const root = makeRepo({
    'package.json': {
      devDependencies: { biome: '^2.5.1' },
      overrides: { ejs: '^3.1.10' },
    },
  });
  try {
    const report = {
      updates_exist: true,
      dependencies: [
        { name: 'biome', from: '^2.5.1', to: '^2.5.2', instances: 4, bump: 'patch' },
        { name: 'ejs', from: '^3.1.10', to: '^6.0.1', instances: 1, bump: 'major' },
      ],
    };
    const out = partitionOverrides(report, root, deps);
    assert.deepEqual(
      out.dependencies.map((d) => d.name),
      ['biome']
    );
    assert.deepEqual(out.overrides_skipped, [
      { name: 'ejs', from: '^3.1.10', to: '^6.0.1' },
    ]);
    assert.equal(out.updates_exist, true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('a dep present in BOTH a writable section and overrides stays bumpable', () => {
  const root = makeRepo({
    'package.json': {
      dependencies: { qs: '^6.15.0' },
      overrides: { qs: '^6.15.3' },
    },
  });
  try {
    const report = {
      updates_exist: true,
      dependencies: [
        { name: 'qs', from: '^6.15.0', to: '^6.15.3', instances: 1, bump: 'patch' },
      ],
    };
    const out = partitionOverrides(report, root, deps);
    assert.deepEqual(out.dependencies.map((d) => d.name), ['qs']);
    assert.deepEqual(out.overrides_skipped, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('updates_exist becomes false when every reported dep is override-only', () => {
  const root = makeRepo({
    'package.json': { overrides: { ejs: '^3.1.10' } },
  });
  try {
    const report = {
      updates_exist: true,
      dependencies: [
        { name: 'ejs', from: '^3.1.10', to: '^6.0.1', instances: 1, bump: 'major' },
      ],
    };
    const out = partitionOverrides(report, root, deps);
    assert.equal(out.updates_exist, false);
    assert.deepEqual(out.dependencies, []);
    assert.equal(out.overrides_skipped.length, 1);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
