import { expect, it, vi } from 'vitest';

it('leaves fake timers on', () => {
  vi.useFakeTimers();
  expect(vi.isFakeTimers()).toBe(true);
});
