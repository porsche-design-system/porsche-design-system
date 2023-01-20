import { getComponentCss } from './checkbox-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', true, 'light'],
    [false, 'none', false, 'light'],
    [true, 'none', true, 'light'],
    [true, 'none', false, 'light'],
    [false, 'success', true, 'light'],
    [false, 'success', false, 'light'],
    [true, 'success', true, 'light'],
    [true, 'success', false, 'light'],
    [false, 'error', true, 'light'],
    [false, 'error', false, 'light'],
    [true, 'error', true, 'light'],
    [true, 'error', false, 'light'],
    [false, 'none', true, 'dark'],
    [false, 'none', false, 'dark'],
    [true, 'none', true, 'dark'],
    [true, 'none', false, 'dark'],
    [false, 'success', true, 'dark'],
    [false, 'success', false, 'dark'],
    [true, 'success', true, 'dark'],
    [true, 'success', false, 'dark'],
    [false, 'error', true, 'dark'],
    [false, 'error', false, 'dark'],
    [true, 'error', true, 'dark'],
    [true, 'error', false, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'light'],
  ])('should return correct css for hideLabel: %o, state: %s and isDisabled: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
