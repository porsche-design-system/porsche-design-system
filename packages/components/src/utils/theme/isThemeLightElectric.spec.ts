import { isThemeLightElectric } from './isThemeLightElectric';

it('should return true for "light-electric"', () => {
  expect(isThemeLightElectric('light-electric')).toBe(true);
});

it('should return false for "light"', () => {
  expect(isThemeLightElectric('light')).toBe(false);
});

it('should return false for everything else', () => {
  expect(isThemeLightElectric('unknown' as any)).toBe(false);
});
