import { getComponentCss } from './button-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['primary', false, false, 'light'],
    ['primary', false, false, 'dark'],
    ['secondary', false, false, 'light'],
    ['secondary', false, false, 'dark'],
    ['tertiary', false, false, 'light'],
    ['tertiary', false, false, 'dark'],
    ['primary', false, true, 'light'],
    ['primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, true, 'dark'],
  ])('should return correct css for variant: %s, hideLabel: %s, isDisabledOrLoading: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
