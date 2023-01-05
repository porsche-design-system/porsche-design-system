import { getThemedTextColor } from './text-icon-styles';

xdescribe('getThemedTextColor()', () => {
  it.each<Parameters<typeof getThemedTextColor>>([
    ['light', 'brand'], // TODO: shall be deprecated with v3-alpha
    ['light', 'default'], // TODO: shall be deprecated with v3-alpha
    ['light', 'neutral-contrast-high'],
    ['light', 'neutral-contrast-medium'],
    ['light', 'neutral-contrast-low'],
    ['light', 'notification-success'],
    ['light', 'notification-warning'],
    ['light', 'notification-error'],
    ['light', 'notification-neutral'], // TODO: shall be deprecated with v3-alpha
    ['light', 'inherit'],
    ['dark', 'brand'], // TODO: shall be deprecated with v3-alpha
    ['dark', 'default'], // TODO: shall be deprecated with v3-alpha
    ['dark', 'neutral-contrast-high'],
    ['dark', 'neutral-contrast-medium'],
    ['dark', 'neutral-contrast-low'],
    ['dark', 'notification-success'],
    ['dark', 'notification-warning'],
    ['dark', 'notification-error'],
    ['dark', 'notification-neutral'], // TODO: shall be deprecated with v3-alpha
    ['dark', 'inherit'],
  ])('should return correct css for theme: %s and textColor: %s', (...args) => {
    expect(getThemedTextColor(...args)).toMatchSnapshot();
  });
});
