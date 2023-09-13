import { getComponentCss } from './pin-code-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', false, false, false, 4, 'light'],
    [false, 'none', false, true, true, 6, 'light'],
    [false, 'none', true, false, false, 4, 'light'],
    [true, 'error', false, false, true, 6, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'success', false, false, false, 4, 'light'],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s, isWithinForm: %s, length: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
