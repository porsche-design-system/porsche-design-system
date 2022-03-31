import { getComponentCss } from './tag-status-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['light', 'default', 'car', true],
    ['light', 'neutral-contrast-high', 'highway', true],
    ['light', 'background-surface', undefined, true],
    ['dark', 'notification-error', 'car', false],
  ])('should return correct css for theme: %s, color: %s, icon: %s and isFocusable: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
