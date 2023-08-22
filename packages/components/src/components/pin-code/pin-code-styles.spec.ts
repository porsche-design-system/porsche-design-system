import { getComponentCss } from './pin-code-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', false, 'light'],
    [true, 'error', true, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'success', false, 'light'],
  ])('should return correct css for hideLabel: %o, state: %s, isDisabled: %s, theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
