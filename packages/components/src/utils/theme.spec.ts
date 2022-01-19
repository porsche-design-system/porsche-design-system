import { isThemeDark, getThemeDarkAttribute, isThemeElectricLight, isThemeElectricDark } from './theme';

describe('isDark()', () => {
  it('should return true for "dark"', () => {
    expect(isThemeDark('dark')).toBe(true);
  });

  it('should return false for "light"', () => {
    expect(isThemeDark('light')).toBe(false);
  });

  it('should return false for everything else', () => {
    expect(isThemeDark('unknown' as any)).toBe(false);
  });
});

describe('isLightElectric()', () => {
  it('should return true for "light-electric"', () => {
    expect(isThemeElectricLight('light-electric')).toBe(true);
  });

  it('should return false for "light"', () => {
    expect(isThemeElectricLight('light')).toBe(false);
  });

  it('should return false for everything else', () => {
    expect(isThemeElectricLight('unknown' as any)).toBe(false);
  });
});

describe('isDarkElectric()', () => {
  it('should return true for "dark-electric"', () => {
    expect(isThemeElectricDark('dark-electric')).toBe(true);
  });

  it('should return false for "light"', () => {
    expect(isThemeElectricDark('light')).toBe(false);
  });

  it('should return false for everything else', () => {
    expect(isThemeElectricDark('unknown' as any)).toBe(false);
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
