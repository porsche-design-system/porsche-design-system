import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './radio-group-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', false, 'column', 'light'],
    [false, false, false, 'none', false, 'column', 'light'],
    [false, false, false, 'none', false, 'column', 'light'],
    [false, false, true, 'none', false, 'column', 'light'],
    [false, false, true, 'none', false, 'column', 'light'],
    [false, false, false, 'success', false, 'column', 'light'],
    [false, false, false, 'success', false, 'column', 'light'],
    [false, false, true, 'success', true, 'column', 'light'],
    [false, false, true, 'success', true, 'column', 'light'],
    [false, false, false, 'error', false, 'column', 'light'],
    [false, false, false, 'error', false, 'column', 'light'],
    [false, false, true, 'error', false, 'column', 'light'],
    [false, false, true, 'error', false, 'column', 'light'],
    [true, true, true, 'error', false, 'column', 'light'],
    [false, true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, 'column', 'light'],
    [true, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, 'column', 'dark'],
  ])(
    'should return correct css for disabled: %s, loading: %s, hideLabel: %o, state: %s, compact: %o, direction: %o, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
