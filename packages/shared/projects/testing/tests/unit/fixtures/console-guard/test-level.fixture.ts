import { expect, it, vi } from 'vitest';

it('undeclared warn', () => {
  console.warn('undeclared warn text');
});

it('undeclared error', () => {
  console.error('undeclared error text');
});

it('declared', () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  console.warn('declared text');
  expect(warnSpy).toHaveBeenCalledWith('declared text');
});

it('spy without mockImplementation', () => {
  const warnSpy = vi.spyOn(console, 'warn');
  console.warn('spied text');
  expect(warnSpy).toHaveBeenCalledWith('spied text');
});

it('printf', () => {
  console.error('Warning: %s', 'Button');
});

it('clean', () => {
  expect(true).toBe(true);
});
