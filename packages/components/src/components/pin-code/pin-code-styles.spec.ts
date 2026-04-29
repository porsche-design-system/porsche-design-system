import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './pin-code-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', false, false, 1, true],
    [false, 'none', false, false, 1, false],
    [false, 'none', false, false, 2, false],
    [false, 'none', false, false, 3, false],
    [false, 'none', false, false, 4, false],
    [false, 'none', false, false, 5, false],
    [false, 'none', false, true, 6, false],
    [false, 'none', true, false, 1, false],
    [false, 'none', true, false, 2, false],
    [false, 'none', true, false, 3, false],
    [false, 'none', true, false, 4, false],
    [false, 'none', true, false, 5, false],
    [false, 'none', true, false, 5, true],
    [true, 'error', false, false, 6, false],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'success', false, false, 4, false],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s and length: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
