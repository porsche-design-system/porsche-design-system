import { getComponentCss } from './pin-code-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', false, false, 1, 'light'],
    [false, 'none', false, false, 2, 'light'],
    [false, 'none', false, false, 3, 'light'],
    [false, 'none', false, false, 4, 'light'],
    [false, 'none', false, false, 5, 'light'],
    [false, 'none', false, true, 6, 'light'],
    [false, 'none', true, false, 1, 'light'],
    [false, 'none', true, false, 2, 'light'],
    [false, 'none', true, false, 3, 'light'],
    [false, 'none', true, false, 4, 'light'],
    [false, 'none', true, false, 5, 'light'],
    [true, 'error', false, false, 6, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'success', false, false, 4, 'light'],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s, length: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
