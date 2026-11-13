import { beforeAll, expect, it } from 'vitest';

console.warn('import time');

beforeAll(() => {
  console.warn('before all');
});

it('passes', () => {
  expect(true).toBe(true);
});

// Last in the file, so the timer fires after every test and before the file's afterAll.
it('timer', () => {
  setTimeout(() => console.warn('late timer'), 0);
});
