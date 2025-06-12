import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './input-password-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', true, false, false, 'light'],
    [false, false, false, 'none', true, false, false, 'light'],
    [false, false, false, 'none', false, false, false, 'light'],
    [false, false, true, 'none', true, false, false, 'light'],
    [false, false, true, 'none', false, false, false, 'light'],
    [false, false, false, 'success', true, false, false, 'light'],
    [false, false, false, 'success', false, false, false, 'light'],
    [false, false, true, 'success', true, true, true, 'light'],
    [false, false, true, 'success', false, true, true, 'light'],
    [false, false, false, 'error', true, false, false, 'light'],
    [false, false, false, 'error', false, false, false, 'light'],
    [false, false, true, 'error', true, false, false, 'light'],
    [false, false, true, 'error', false, false, false, 'light'],
    [true, true, true, 'error', false, false, false, 'light'],
    [
      false,
      true,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      true,
      false,
      false,

      'light',
    ],
    [true, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, false, 'dark'],
  ])(
    'should return correct css for disabled: %s, loading: %s, hideLabel: %o, state: %s, toggle: %o, compact: %o, readOnly: %o, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
