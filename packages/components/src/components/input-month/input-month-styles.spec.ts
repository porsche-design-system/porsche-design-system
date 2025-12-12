import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './input-month-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', false, false, 'light'],
    [false, false, false, 'none', false, false, 'light'],
    [false, false, true, 'none', false, false, 'light'],
    [false, false, false, 'success', false, false, 'light'],
    [false, false, true, 'success', true, true, 'light'],
    [false, false, false, 'error', false, false, 'light'],
    [false, false, true, 'error', false, false, 'light'],
    [true, true, true, 'error', false, false, 'light'],
    [false, true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, false, 'light'],
    [true, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, false, 'dark'],
  ])(
    'should return correct css for disabled: %s, loading: %s, hideLabel: %o, state: %s, compact: %o, readOnly: %o, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
