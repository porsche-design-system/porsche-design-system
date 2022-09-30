import { getComponentCss } from './link-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['primary', false, true, 'light'],
    ['primary', false, true, 'dark'],
    ['secondary', false, true, 'light'],
    ['secondary', false, true, 'dark'],
    ['tertiary', false, true, 'light'],
    ['tertiary', false, true, 'dark'],
    ['primary', false, false, 'light'],
    ['primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, false, 'dark'],
  ])('should return correct css for variant: %s, hideLabel: %s, hasSlottedAnchor: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
