import { describe, expect, it } from 'vitest';
import { getMajorVersion, isVersionAtLeast } from '@/utils/pdsVersion';

describe('isVersionAtLeast()', () => {
  it.each<[version: string, minVersion: string, expected: boolean]>([
    ['3.29.0', '3.29.0', true],
    ['4.0.0', '3.29.0', true],
    ['3.30.0', '3.29.0', true],
    ['3.29.1', '3.29.0', true],
    ['2.99.99', '3.29.0', false],
    ['3.28.9', '3.29.0', false],
    ['3.29.0', '3.29.1', false],
  ])('should return %j >= %j as %s', (version, minVersion, expected) => {
    expect(isVersionAtLeast(version, minVersion)).toBe(expected);
  });

  it('should compare numerically instead of lexically', () => {
    expect(isVersionAtLeast('3.10.0', '3.9.0')).toBe(true);
    expect(isVersionAtLeast('3.9.0', '3.10.0')).toBe(false);
  });

  it('should ignore a leading "v"', () => {
    expect(isVersionAtLeast('v3.29.0', '3.29.0')).toBe(true);
    expect(isVersionAtLeast('3.28.0', 'v3.29.0')).toBe(false);
  });

  it('should treat missing parts as 0', () => {
    expect(isVersionAtLeast('4', '3.29.0')).toBe(true);
    expect(isVersionAtLeast('2', '3.29.0')).toBe(false);
  });
});

describe('getMajorVersion()', () => {
  it.each<[version: string, expected: number]>([
    ['4.7.0', 4],
    ['v3.2.1', 3],
    ['10.0.0', 10],
    ['2', 2],
  ])('should return the major version of %j', (version, expected) => {
    expect(getMajorVersion(version)).toBe(expected);
  });
});
