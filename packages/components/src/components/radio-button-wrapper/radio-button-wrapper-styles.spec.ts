import { getComponentCss } from './radio-button-wrapper-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', true, false, 'light'],
    [false, 'none', false, true, 'light'],
    [true, 'none', true, true, 'light'],
    [true, 'none', false, false, 'light'],
    [false, 'success', true, false, 'light'],
    [false, 'success', false, true, 'light'],
    [true, 'success', true, true, 'light'],
    [true, 'success', false, false, 'light'],
    [false, 'error', true, false, 'light'],
    [false, 'error', false, true, 'light'],
    [true, 'error', true, true, 'light'],
    [true, 'error', false, false, 'light'],
    [false, 'none', true, false, 'dark'],
    [false, 'none', false, true, 'dark'],
    [true, 'none', true, true, 'dark'],
    [true, 'none', false, false, 'dark'],
    [false, 'success', true, false, 'dark'],
    [false, 'success', false, true, 'dark'],
    [true, 'success', true, true, 'dark'],
    [true, 'success', false, false, 'dark'],
    [false, 'error', true, false, 'dark'],
    [false, 'error', false, true, 'dark'],
    [true, 'error', true, true, 'dark'],
    [true, 'error', false, false, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'light'],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
