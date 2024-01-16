import { getComponentCss } from './select-wrapper-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, true, false, 'none', 'light'],
    [false, false, false, 'success', 'light'],
    [false, true, false, 'error', 'light'],
    [false, false, true, 'none', 'light'],
    [false, true, true, 'success', 'light'],
    [false, false, true, 'error', 'light'],
    [false, true, false, 'none', 'dark'],
    [false, false, false, 'success', 'dark'],
    [false, true, false, 'error', 'dark'],
    [false, false, true, 'none', 'dark'],
    [false, true, true, 'success', 'dark'],
    [false, false, true, 'error', 'dark'],
    [true, true, true, 'error', 'dark'],
    [false, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', 'light'],
  ])(
    'should return correct css for disabled: %s, hasCustomDropdown: %s, hideLabel: %o, state: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
