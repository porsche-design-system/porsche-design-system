import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './radio-group-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', false, 'column'],
    [false, false, false, 'none', false, 'column'],
    [false, false, false, 'none', false, 'column'],
    [false, false, true, 'none', false, 'column'],
    [false, false, true, 'none', false, 'column'],
    [false, false, false, 'success', false, 'column'],
    [false, false, false, 'success', false, 'column'],
    [false, false, true, 'success', true, 'column'],
    [false, false, true, 'success', true, 'column'],
    [false, false, false, 'error', false, 'column'],
    [false, false, false, 'error', false, 'column'],
    [false, false, true, 'error', false, 'column'],
    [false, false, true, 'error', false, 'column'],
    [true, true, true, 'error', false, 'column'],
    [false, true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, 'column'],
    [true, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, 'column'],
  ])(
    'should return correct css for disabled: %s, loading: %s, hideLabel: %o, state: %s, compact: %o and direction: %o',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
