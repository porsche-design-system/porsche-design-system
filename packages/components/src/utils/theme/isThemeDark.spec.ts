import { isThemeDark } from './isThemeDark';

it('should return true for "dark"', () => {
  expect(isThemeDark('dark')).toBe(true);
});

it('should return false for "light"', () => {
  expect(isThemeDark('light')).toBe(false);
});

it('should return false for everything else', () => {
  expect(isThemeDark('unknown' as any)).toBe(false);
});
