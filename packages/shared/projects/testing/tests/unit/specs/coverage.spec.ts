import { describe, expect, it } from 'vitest';
import { type CoverageTest, testCoverage } from '../../../src/coverage';

const getMissing = (item: string) => (item === 'covered' ? undefined : `specs/${item}.spec.ts`);

const collect = (options: Omit<Parameters<typeof testCoverage>[0], 'test'>): Record<string, () => void> => {
  const tests: Record<string, () => void> = {};
  const test: CoverageTest = (title, body) => {
    tests[title] = body;
  };
  testCoverage({ test, ...options });
  return tests;
};

describe('testCoverage()', () => {
  it('passes a covered item', () => {
    const tests = collect({ items: ['covered'], getMissing });
    expect(Object.keys(tests)).toEqual(['covered']);
    expect(() => tests.covered()).not.toThrow();
  });

  it('fails a missing item with the file to add', () => {
    expect(() => collect({ items: ['foo'], getMissing }).foo()).toThrow(new Error('add specs/foo.spec.ts'));
  });

  it('creates no item test for an allowlisted item that is missing', () => {
    const tests = collect({ items: ['foo'], getMissing, allowlist: ['foo'] });
    expect(Object.keys(tests)).toEqual(['foo (allowlisted)']);
    expect(() => tests['foo (allowlisted)']()).not.toThrow();
  });

  it('fails an allowlist entry whose item is covered', () => {
    const tests = collect({ items: ['covered'], getMissing, allowlist: ['covered'] });
    expect(() => tests['covered (allowlisted)']()).toThrow(new Error('stale allowlist entry: covered'));
  });

  it('fails an allowlist entry that is not an item', () => {
    const tests = collect({ items: ['covered'], getMissing, allowlist: ['gone'] });
    expect(() => tests['gone (allowlisted)']()).toThrow(new Error('stale allowlist entry: gone'));
  });

  it('fails when there are no items', () => {
    const tests = collect({ items: [], getMissing });
    expect(Object.keys(tests)).toEqual(['has items']);
    expect(() => tests['has items']()).toThrow(new Error('no items'));
  });
});
