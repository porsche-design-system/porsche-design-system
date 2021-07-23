import { isDark, reflectThemeOnDark } from '.';

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

describe('reflectThemeOnDark()', () => {
  it('should return {theme: "dark"} for theme dark', () => {
    console.log(reflectThemeOnDark('dark'));
    expect(reflectThemeOnDark('dark')).toEqual({ theme: 'dark' });
  });
  it('should return {theme: "dark"} for theme dark', () => {
    expect(reflectThemeOnDark('light')).toBe(false);
  });
});
