import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyBump } from './classify-bump.ts';
import type { DependencyPolicy } from './policy.ts';

const POLICY: DependencyPolicy = {
  ignored: ['@porsche-design-system/**', '@playwright/test', '@stencil/core'],
  minorOnly: ['@angular/**', 'ng-packagr', 'zone.js', 'react', 'ag-grid-*', '@emotion/**'],
};

test('classifyBump flags majors and reports NO_CHANGES', () => {
  const before = { vite: '5.4.0', typescript: '5.9.2', webpack: '5.94.0' };
  const after = { vite: '6.0.0', typescript: '5.9.3', webpack: '5.94.0' };
  const result = classifyBump(before, after, POLICY);
  assert.equal(result.outcome, 'CHANGED');
  assert.deepEqual(result.changes, [
    { name: 'typescript', from: '5.9.2', to: '5.9.3', major: false, level: 'patch' },
    { name: 'vite', from: '5.4.0', to: '6.0.0', major: true, level: 'major' },
  ]);
  // Non-family majors are allowed — no violation.
  assert.deepEqual(result.heldViolations, []);
  assert.equal(classifyBump(before, before, POLICY).outcome, 'NO_CHANGES');
});

test('classifyBump allows minor/patch on families but flags family majors', () => {
  const before = { '@angular/core': '22.0.4', react: '19.2.0', 'ag-grid-community': '35.3.1' };
  const after = { '@angular/core': '22.0.6', react: '19.2.7', 'ag-grid-community': '36.0.0' };
  const result = classifyBump(before, after, POLICY);
  // Angular patch and React minor are permitted; only the ag-grid major violates.
  assert.deepEqual(result.heldViolations, ['ag-grid-community']);
});

test('classifyBump flags any change to permanently ignored deps', () => {
  const before = { '@stencil/core': '4.0.0' };
  const after = { '@stencil/core': '4.0.1' };
  const result = classifyBump(before, after, POLICY);
  assert.deepEqual(result.heldViolations, ['@stencil/core']);
});
