import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './input-search-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', false, false, false],
    [false, false, false, 'none', false, false, false],
    [false, false, false, 'none', false, false, true],
    [false, false, true, 'none', false, false, true],
    [false, false, true, 'none', false, false, true],
    [false, false, false, 'success', false, false, true],
    [false, false, false, 'success', false, false, true],
    [false, false, true, 'success', true, true, true],
    [false, false, true, 'success', true, true, true],
    [false, false, false, 'error', false, false, true],
    [false, false, false, 'error', false, false, false],
    [false, false, true, 'error', false, false, false],
    [false, false, true, 'error', false, false, false],
    [true, true, true, 'error', false, false, false],
    [false, true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, false, false],
    [true, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, false, false],
  ])(
    'should return correct css for disabled: %s, loading: %s, hideLabel: %o, state: %s, compact: %o, readOnly: %o and clear: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
