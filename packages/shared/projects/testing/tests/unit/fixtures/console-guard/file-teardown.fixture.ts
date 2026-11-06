import { beforeAll, expect, it } from 'vitest';

// Vitest runs a beforeAll cleanup and a file fixture's teardown after every afterAll hook of the file.
const test = it.extend<{ fileFixture: number }>({
  fileFixture: [
    async ({}, use) => {
      await use(1);
      console.warn('file fixture teardown');
    },
    { scope: 'file', auto: true },
  ],
});

beforeAll(() => () => {
  console.warn('before all cleanup');
});

test('passes', () => {
  expect(true).toBe(true);
});
