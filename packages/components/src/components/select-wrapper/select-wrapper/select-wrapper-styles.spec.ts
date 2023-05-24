import { getComponentCss } from './select-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', 'light'],
    [false, true, false, 'success', 'light'],
    [false, false, false, 'error', 'light'],
    [false, true, true, 'none', 'light'],
    [false, false, true, 'success', 'light'],
    [false, true, true, 'error', 'light'],
    [false, false, false, 'none', 'dark'],
    [false, true, false, 'success', 'dark'],
    [false, false, false, 'error', 'dark'],
    [false, true, true, 'none', 'dark'],
    [false, false, true, 'success', 'dark'],
    [false, true, true, 'error', 'dark'],
    [true, false, true, 'error', 'dark'],
    [false, true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', 'light'],
  ])('should return correct css for disabled: %s, native: %s, hideLabel: %o, state: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
