import { getComponentCss } from './tag-status-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-default', true, 'light'],
    ['background-default', false, 'light'],
    ['neutral-contrast-high', true, 'light'],
    ['notification-success', true, 'light'],
    ['notification-warning', true, 'light'],
    ['notification-error', true, 'light'],
    ['notification-neutral', true, 'light'],
    ['background-surface', true, 'light'],
    ['background-default', true, 'dark'],
    ['background-default', false, 'dark'],
    ['neutral-contrast-high', true, 'dark'],
    ['notification-success', true, 'dark'],
    ['notification-warning', true, 'dark'],
    ['notification-error', true, 'dark'],
    ['notification-neutral', true, 'dark'],
    ['background-surface', true, 'dark'],
  ])('should return correct css for color: %s, isFocusable: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
