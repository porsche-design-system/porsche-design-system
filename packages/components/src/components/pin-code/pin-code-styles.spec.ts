import { getComponentCss } from './pin-code-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', false, false, 1, true, 'light'],
    [false, 'none', false, false, 1, false, 'light'],
    [false, 'none', false, false, 2, false, 'light'],
    [false, 'none', false, false, 3, false, 'light'],
    [false, 'none', false, false, 4, false, 'light'],
    [false, 'none', false, false, 5, false, 'light'],
    [false, 'none', false, true, 6, false, 'light'],
    [false, 'none', true, false, 1, false, 'light'],
    [false, 'none', true, false, 2, false, 'light'],
    [false, 'none', true, false, 3, false, 'light'],
    [false, 'none', true, false, 4, false, 'light'],
    [false, 'none', true, false, 5, false, 'light'],
    [false, 'none', true, false, 5, true, 'light'],
    [true, 'error', false, false, 6, false, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'success', false, false, 4, false, 'light'],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s, length: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
