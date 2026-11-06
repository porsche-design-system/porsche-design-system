import { afterAll, expect, it, vi } from 'vitest';

// restoreMocks restores a spy only before the next test, so the last test's spy is still installed in afterAll.
it('declared', () => {
  const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  console.warn('declared text');
  expect(spy).toHaveBeenCalledWith('declared text');
});

afterAll(() => {
  console.warn('after a muted last test');
});
