import { getThemedTextColors } from './text-icon-styles';

describe('getThemedTextColors()', () => {
  it.each<Parameters<typeof getThemedTextColors>>([
    ['light', 'brand'],
    ['light', 'default'],
    ['light', 'neutral-contrast-high'],
    ['light', 'neutral-contrast-medium'],
    ['light', 'neutral-contrast-low'],
    ['light', 'notification-success'],
    ['light', 'notification-warning'],
    ['light', 'notification-error'],
    ['light', 'notification-neutral'],
    ['light', 'inherit'],
    ['dark', 'brand'],
    ['dark', 'default'],
    ['dark', 'neutral-contrast-high'],
    ['dark', 'neutral-contrast-medium'],
    ['dark', 'neutral-contrast-low'],
    ['dark', 'notification-success'],
    ['dark', 'notification-warning'],
    ['dark', 'notification-error'],
    ['dark', 'notification-neutral'],
    ['dark', 'inherit'],
  ])('should return correct css for theme: %s and textColor: %s', (...args) => {
    expect(getThemedTextColors(...args)).toMatchSnapshot();
  });
});
