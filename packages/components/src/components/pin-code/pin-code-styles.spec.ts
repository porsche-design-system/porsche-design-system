import { getComponentCss } from './pin-code-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', false, false, false, 'light'],
    [false, 'none', false, true, true, 'light'],
    [false, 'none', true, false, false, 'light'],
    [true, 'error', false, false, true, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'success', false, false, false, 'light'],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s, isWithinForm: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
