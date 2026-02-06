import { getThemedTypographyColor } from './text-icon-styles';

describe('getThemedTextColor()', () => {
  it.each<Parameters<typeof getThemedTypographyColor>>([
    ['primary'],
    ['contrast-high'],
    ['contrast-medium'],
    ['contrast-low'],
    ['success'],
    ['warning'],
    ['error'],
    ['inherit'],
    ['primary'],
    ['contrast-high'],
    ['contrast-medium'],
    ['contrast-low'],
    ['success'],
    ['warning'],
    ['error'],
    ['inherit'],
  ])('should return correct css for theme: %s and textColor: %s', (...args) => {
    expect(getThemedTypographyColor(...args)).toMatchSnapshot();
  });
});
