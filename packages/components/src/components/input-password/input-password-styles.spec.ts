import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './input-password-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', true, false, false, false, 'light'],
    [false, false, 'none', true, false, false, false, 'light'],
    [false, false, 'none', false, false, false, false, 'light'],
    [false, true, 'none', true, false, false, false, 'light'],
    [false, true, 'none', false, false, false, false, 'light'],
    [false, false, 'success', true, false, false, false, 'light'],
    [false, false, 'success', false, false, false, false, 'light'],
    [false, true, 'success', true, true, true, true, 'light'],
    [false, true, 'success', false, true, true, true, 'light'],
    [false, false, 'error', true, false, false, true, 'light'],
    [false, false, 'error', false, false, false, true, 'light'],
    [false, true, 'error', true, false, false, true, 'light'],
    [false, true, 'error', false, false, false, false, 'light'],
    [true, true, 'error', false, false, false, false, 'light'],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      true,
      false,
      false,
      false,
      'light',
    ],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      true,
      false,
      false,
      false,
      'dark',
    ],
  ])(
    'should return correct css for disabled: %s, hideLabel: %o, state: %s, toggle: %o, compact: %o, readOnly: %o, loading: %o, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
