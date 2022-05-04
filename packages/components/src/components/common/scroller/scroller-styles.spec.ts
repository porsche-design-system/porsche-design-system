import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', true, 'light'],
    ['surface', true, 'dark'],
    ['default', true, 'light-electric'],
    ['surface', false, 'light'],
    ['default', false, 'dark'],
    ['surface', false, 'light-electric'],
  ])('should return correct css for gradientColorScheme: %s, hasTabsBarParent: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
