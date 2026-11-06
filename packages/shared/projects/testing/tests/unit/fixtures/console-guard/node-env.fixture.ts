// @vitest-environment node
import { expect, it } from 'vitest';

it('undeclared warn', () => {
  console.warn('node env warn text');
});

it('clean', () => {
  expect(true).toBe(true);
});
