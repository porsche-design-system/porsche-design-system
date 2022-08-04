import { isThemeDarkElectric } from './isThemeDarkElectric';

it('should return true for "dark-electric"', () => {
  expect(isThemeDarkElectric('dark-electric')).toBe(true);
});

it('should return false for "light"', () => {
  expect(isThemeDarkElectric('light')).toBe(false);
});

it('should return false for everything else', () => {
  expect(isThemeDarkElectric('unknown' as any)).toBe(false);
});
