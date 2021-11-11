import { isDark, getThemeDarkAttribute } from './theme';

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

describe('getThemeDarkAttribute()', () => {
  it("should return { theme: 'dark' } for dark theme", () => {
    expect(getThemeDarkAttribute('dark')).toEqual({ theme: 'dark' });
  });
  it('should return null for light theme', () => {
    expect(getThemeDarkAttribute('light')).toBe(null);
  });
});
