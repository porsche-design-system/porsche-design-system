import { getComponentCss } from './checkbox-wrapper-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', true, false, 'light'],
    [false, 'none', false, false, 'light'],
    [true, 'none', true, false, 'light'],
    [true, 'none', false, false, 'light'],
    [true, 'none', true, true, 'light'],
    [true, 'none', false, true, 'light'],
    [false, 'success', true, false, 'light'],
    [false, 'success', false, false, 'light'],
    [true, 'success', true, false, 'light'],
    [true, 'success', false, false, 'light'],
    [false, 'error', true, false, 'light'],
    [false, 'error', false, false, 'light'],
    [true, 'error', true, false, 'light'],
    [true, 'error', false, false, 'light'],
    [false, 'none', true, false, 'dark'],
    [false, 'none', false, false, 'dark'],
    [true, 'none', true, false, 'dark'],
    [true, 'none', false, false, 'dark'],
    [true, 'none', true, true, 'dark'],
    [true, 'none', false, true, 'dark'],
    [false, 'success', true, false, 'dark'],
    [false, 'success', false, false, 'dark'],
    [true, 'success', true, false, 'dark'],
    [true, 'success', false, false, 'dark'],
    [false, 'error', true, false, 'dark'],
    [false, 'error', false, false, 'dark'],
    [true, 'error', true, false, 'dark'],
    [true, 'error', false, false, 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'light'],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s and theme %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
