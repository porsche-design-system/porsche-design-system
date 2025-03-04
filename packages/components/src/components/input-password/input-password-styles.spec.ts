import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './input-password-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', true, false, 'light'],
    [false, false, 'none', true, false, 'light'],
    [false, false, 'none', false, false, 'light'],
    [false, true, 'none', true, false, 'light'],
    [false, true, 'none', false, false, 'light'],
    [false, false, 'success', true, false, 'light'],
    [false, false, 'success', false, false, 'light'],
    [false, true, 'success', true, true, 'light'],
    [false, true, 'success', false, true, 'light'],
    [false, false, 'error', true, false, 'light'],
    [false, false, 'error', false, false, 'light'],
    [false, true, 'error', true, false, 'light'],
    [false, true, 'error', false, false, 'light'],
    [true, true, 'error', false, false, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, passwordToggle: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
