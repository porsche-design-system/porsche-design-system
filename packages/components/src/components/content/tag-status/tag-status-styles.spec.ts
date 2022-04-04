import { getComponentCss } from './tag-status-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['light', 'default', true],
    ['light', 'default', false],
    ['light', 'neutral-contrast-high', true],
    ['light', 'notification-success', true],
    ['light', 'notification-warning', true],
    ['light', 'notification-error', true],
    ['light', 'notification-neutral', true],
    ['light', 'background-surface', true],
    ['dark', 'default', true],
    ['dark', 'default', false],
    ['dark', 'neutral-contrast-high', true],
    ['dark', 'notification-success', true],
    ['dark', 'notification-warning', true],
    ['dark', 'notification-error', true],
    ['dark', 'notification-neutral', true],
    ['dark', 'background-surface', true],
  ])('should return correct css for theme: %s, color: %s and isFocusable: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
