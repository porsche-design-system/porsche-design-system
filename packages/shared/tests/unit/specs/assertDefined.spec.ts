import { describe, expect, it } from 'vitest';
import { assertDefined } from '../../../src/testing/assertDefined';

describe('assertDefined()', () => {
  it.each([null, undefined])('should throw for %s', (value) => {
    expect(() => assertDefined(value)).toThrow('expected value to be defined');
  });

  it.each([0, '', false, Number.NaN])('should not throw for the falsy but defined value %s', (value) => {
    expect(() => assertDefined(value)).not.toThrow();
  });

  it('should narrow the type so the value is usable afterwards', () => {
    const value = { id: 'a' } as { id: string } | null;
    assertDefined(value);
    // Compiles only because `asserts value is NonNullable<T>` removed `null` from the union.
    expect(value.id).toBe('a');
  });
});
