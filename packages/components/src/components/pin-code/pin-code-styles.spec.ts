import { getComponentCss } from './pin-code-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', false, false, 'light'],
    [false, 'none', false, true, 'light'],
    [false, 'none', true, false, 'light'],
    [true, 'error', false, false, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'success', false, false, 'light'],
  ])('should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s, theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
