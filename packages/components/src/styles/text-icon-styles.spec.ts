import { getThemedTypographyColor } from './text-icon-styles';

describe('getThemedTextColor()', () => {
  it.each<Parameters<typeof getThemedTypographyColor>>([
    ['light', 'default'], // TODO: shall be deprecated with v3-alpha
    ['light', 'contrast-high'],
    ['light', 'contrast-medium'],
    ['light', 'contrast-low'],
    ['light', 'notification-success'],
    ['light', 'notification-warning'],
    ['light', 'notification-error'],
    ['light', 'inherit'],
    ['dark', 'default'], // TODO: shall be deprecated with v3-alpha
    ['dark', 'contrast-high'],
    ['dark', 'contrast-medium'],
    ['dark', 'contrast-low'],
    ['dark', 'notification-success'],
    ['dark', 'notification-warning'],
    ['dark', 'notification-error'],
    ['dark', 'inherit'],
  ])('should return correct css for theme: %s and textColor: %s', (...args) => {
    expect(getThemedTypographyColor(...args)).toMatchSnapshot();
  });
});
