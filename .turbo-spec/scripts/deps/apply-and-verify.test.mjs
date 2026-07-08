import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { applyPlanToPackageJson, findPackageJsons } from './apply-plan.mjs';
import { changedDeps, validateChanges } from './verify-equality.mjs';

test('applyPlanToPackageJson replaces existing specifiers across all fields', () => {
  const pkg = {
    dependencies: { vite: '^8.1.0', react: '^19.0.0' },
    devDependencies: { vite: '^8.1.0' },
    peerDependencies: { react: '^19.0.0' },
  };
  const updates = new Map([
    ['vite', '^8.1.3'],
    ['react', '^19.1.0'],
  ]);
  const changes = applyPlanToPackageJson(pkg, updates);
  assert.equal(pkg.dependencies.vite, '^8.1.3');
  assert.equal(pkg.devDependencies.vite, '^8.1.3');
  assert.equal(pkg.peerDependencies.react, '^19.1.0');
  assert.equal(changes.length, 4);
});

test('applyPlanToPackageJson never adds a missing dependency', () => {
  const pkg = { dependencies: { vite: '^8.1.0' } };
  const changes = applyPlanToPackageJson(pkg, new Map([['not-here', '^1.0.0']]));
  assert.equal(changes.length, 0);
  assert.ok(!Object.hasOwn(pkg.dependencies, 'not-here'));
});

test('findPackageJsons walks the tree and skips node_modules', () => {
  const dir = mkdtempSync(join(tmpdir(), 'applyplan-'));
  try {
    writeFileSync(join(dir, 'package.json'), '{}');
    mkdirSync(join(dir, 'packages', 'a'), { recursive: true });
    writeFileSync(join(dir, 'packages', 'a', 'package.json'), '{}');
    mkdirSync(join(dir, 'node_modules', 'x'), { recursive: true });
    writeFileSync(join(dir, 'node_modules', 'x', 'package.json'), '{}');
    const found = findPackageJsons(dir).map((p) => p.replace(dir, ''));
    assert.equal(found.length, 2);
    assert.ok(!found.some((p) => p.includes('node_modules')));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('end-to-end write preserves key order and updates only planned deps', () => {
  const dir = mkdtempSync(join(tmpdir(), 'applyplan2-'));
  try {
    const original = {
      name: 'pkg',
      dependencies: { vite: '^8.1.0', '@stencil/core': '^4.0.0' },
    };
    const file = join(dir, 'package.json');
    writeFileSync(file, `${JSON.stringify(original, null, 2)}\n`);
    const pkg = JSON.parse(readFileSync(file, 'utf8'));
    applyPlanToPackageJson(pkg, new Map([['vite', '^8.1.3']]));
    writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
    const result = JSON.parse(readFileSync(file, 'utf8'));
    assert.equal(result.dependencies.vite, '^8.1.3');
    assert.equal(result.dependencies['@stencil/core'], '^4.0.0'); // untouched
    assert.deepEqual(Object.keys(result), ['name', 'dependencies']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// --- verify-equality pure logic ---

test('changedDeps detects version bumps, adds and removes', () => {
  const head = { dependencies: { vite: '^8.1.0', gone: '^1.0.0' } };
  const work = { dependencies: { vite: '^8.1.3' }, devDependencies: { added: '^2.0.0' } };
  const changes = changedDeps(head, work);
  const byName = Object.fromEntries(changes.map((c) => [c.name, c]));
  assert.deepEqual(byName.vite, { field: 'dependencies', name: 'vite', from: '^8.1.0', to: '^8.1.3' });
  assert.equal(byName.gone.to, null);
  assert.equal(byName.added.from, null);
});

test('validateChanges passes when every change matches the frozen plan', () => {
  const plan = { updates: [{ name: 'vite', from: '^8.1.0', to: '^8.1.3' }] };
  const changes = [{ field: 'dependencies', name: 'vite', from: '^8.1.0', to: '^8.1.3' }];
  assert.deepEqual(validateChanges(changes, plan), []);
});

test('validateChanges flags an unplanned change', () => {
  const plan = { updates: [{ name: 'vite', from: '^8.1.0', to: '^8.1.3' }] };
  const changes = [{ field: 'dependencies', name: 'lodash', from: '^4.0.0', to: '^4.1.0' }];
  const v = validateChanges(changes, plan);
  assert.equal(v.length, 2); // unplanned lodash + vite not applied
  assert.ok(v.some((m) => m.includes('unplanned dependency changed: lodash')));
  assert.ok(v.some((m) => m.includes('planned dependency not applied')));
});

test('validateChanges flags a held-back change', () => {
  const plan = { updates: [] };
  const changes = [{ field: 'dependencies', name: '@stencil/core', from: '^4.0.0', to: '^4.1.0' }];
  const v = validateChanges(changes, plan);
  assert.ok(v.some((m) => m.includes('held-back dependency changed: @stencil/core')));
});

test('validateChanges flags a wrong target version', () => {
  const plan = { updates: [{ name: 'vite', from: '^8.1.0', to: '^8.1.3' }] };
  const changes = [{ field: 'dependencies', name: 'vite', from: '^8.1.0', to: '^8.2.0' }];
  const v = validateChanges(changes, plan);
  assert.ok(v.some((m) => m.includes('but plan froze ^8.1.3')));
});

test('validateChanges allows changes to excluded deps (e.g. typescript under Angular)', () => {
  const plan = {
    updates: [],
    excluded: [{ name: 'typescript', reason: 'deferred under Angular ceiling' }],
  };
  const changes = [
    { field: 'devDependencies', name: 'typescript', from: '^6.0.3', to: '^6.0.2' },
  ];
  assert.deepEqual(validateChanges(changes, plan), []);
});
