import assert from 'node:assert/strict';
import { test } from 'node:test';
import { familyOf, FAMILIES } from './families.mjs';

test('familyOf maps Angular family members (glob + exact)', () => {
  assert.equal(familyOf('@angular/core'), 'angular');
  assert.equal(familyOf('@angular/cli'), 'angular');
  assert.equal(familyOf('ng-packagr'), 'angular');
  assert.equal(familyOf('zone.js'), 'angular');
});

test('familyOf distinguishes react from react-router', () => {
  assert.equal(familyOf('react'), 'react');
  assert.equal(familyOf('react-dom'), 'react');
  assert.equal(familyOf('@types/react'), 'react');
  assert.equal(familyOf('react-router'), 'react-router');
  assert.equal(familyOf('react-router-dom'), 'react-router');
  assert.equal(familyOf('@react-router/dev'), 'react-router');
});

test('familyOf maps ag-grid, tailwind, next, vitest, vanilla-extract', () => {
  assert.equal(familyOf('ag-grid-angular'), 'ag-grid');
  assert.equal(familyOf('@tailwindcss/postcss'), 'tailwind');
  assert.equal(familyOf('tailwindcss'), 'tailwind');
  assert.equal(familyOf('@next/swc-darwin-arm64'), 'next');
  assert.equal(familyOf('next'), 'next');
  assert.equal(familyOf('@vitest/ui'), 'vitest');
  assert.equal(familyOf('@vanilla-extract/css'), 'vanilla-extract');
});

test('familyOf returns "other" for unrelated packages', () => {
  assert.equal(familyOf('vite'), 'other');
  assert.equal(familyOf('typescript'), 'other');
  assert.equal(familyOf('some-random-pkg'), 'other');
});

test('FAMILIES never maps a name to two families (no ambiguous membership)', () => {
  const names = ['@angular/core', 'react', 'react-router', '@react-router/dev', 'ag-grid-react', 'next', '@next/swc-x', 'tailwindcss', '@vitest/ui'];
  for (const n of names) {
    const hits = Object.keys(FAMILIES).filter((f) => familyOf(n) === f);
    assert.equal(hits.length, 1, `${n} should resolve to exactly one family`);
  }
});
