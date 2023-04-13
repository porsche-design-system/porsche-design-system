import { getComponentCss } from './checkbox-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', true, false, false, 'light'],
    [false, 'none', false, false, false, 'light'],
    [true, 'none', true, false, false, 'light'],
    [true, 'none', false, false, false, 'light'],
    [true, 'none', true, true, false, 'light'],
    [true, 'none', false, true, true, 'light'],
    [false, 'success', true, false, false, 'light'],
    [false, 'success', false, false, false, 'light'],
    [true, 'success', true, false, false, 'light'],
    [true, 'success', false, false, false, 'light'],
    [false, 'error', true, false, false, 'light'],
    [false, 'error', false, false, false, 'light'],
    [true, 'error', true, false, false, 'light'],
    [true, 'error', false, false, false, 'light'],
    [false, 'none', true, false, false, 'dark'],
    [false, 'none', false, false, false, 'dark'],
    [true, 'none', true, false, false, 'dark'],
    [true, 'none', false, false, false, 'dark'],
    [true, 'none', true, true, false, 'dark'],
    [true, 'none', false, true, true, 'dark'],
    [false, 'success', true, false, false, 'dark'],
    [false, 'success', false, false, false, 'dark'],
    [true, 'success', true, false, false, 'dark'],
    [true, 'success', false, false, false, 'dark'],
    [false, 'error', true, false, false, 'dark'],
    [false, 'error', false, false, false, 'dark'],
    [true, 'error', true, false, false, 'dark'],
    [true, 'error', false, false, false, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, false, 'light'],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s, isChecked: %s and theme %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
