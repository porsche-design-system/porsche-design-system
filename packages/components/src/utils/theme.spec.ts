import { isThemeDark, getThemeDarkAttribute, isThemeLightElectric, isThemeDarkElectric } from './theme';

describe('isThemeDark()', () => {
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

describe('isThemeLightElectric()', () => {
  it('should return true for "light-electric"', () => {
    expect(isThemeLightElectric('light-electric')).toBe(true);
  });

  it('should return false for "light"', () => {
    expect(isThemeLightElectric('light')).toBe(false);
  });

  it('should return false for everything else', () => {
    expect(isThemeLightElectric('unknown' as any)).toBe(false);
  });
});

describe('isThemeDarkElectric()', () => {
  it('should return true for "dark-electric"', () => {
    expect(isThemeDarkElectric('dark-electric')).toBe(true);
  });

  it('should return false for "light"', () => {
    expect(isThemeDarkElectric('light')).toBe(false);
  });

  it('should return false for everything else', () => {
    expect(isThemeDarkElectric('unknown' as any)).toBe(false);
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
