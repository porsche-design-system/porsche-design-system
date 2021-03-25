import { isDark } from '../../../src/utils';

describe('isDark()', () => {
  it('should return true for "dark"', () => {
    expect(isDark('dark')).toBe(true);
  });

  it('should return false for "light"', () => {
    expect(isDark('light')).toBe(false);
  });

  it('should return false for everything else', () => {
    expect(isDark('unknown' as any)).toBe(false);
  });
});
