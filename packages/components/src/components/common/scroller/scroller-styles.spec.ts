import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', 'light'],
    ['surface', 'dark'],
    ['default', 'light-electric'],
    ['surface', 'light'],
    ['default', 'dark'],
    ['surface', 'light-electric'],
  ])('should return correct css for gradientColorScheme: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
