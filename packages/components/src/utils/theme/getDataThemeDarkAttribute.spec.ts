import { getDataThemeDarkAttribute } from './getDataThemeDarkAttribute';

it("should return { theme: 'dark' } for dark theme", () => {
  expect(getDataThemeDarkAttribute('dark')).toEqual({ 'data-theme': 'dark' });
});

it('should return null for light theme', () => {
  expect(getDataThemeDarkAttribute('light')).toBe(null);
});
