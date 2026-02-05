import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './checkbox-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', true, false, false],
    [false, 'none', false, false, false],
    [true, 'none', true, false, false],
    [true, 'none', false, false, false],
    [true, 'none', true, true, true],
    [true, 'none', false, true, true],
    [false, 'success', true, false, false],
    [false, 'success', false, false, false],
    [true, 'success', true, false, false],
    [true, 'success', false, false, false],
    [false, 'error', true, false, false],
    [false, 'error', false, false, false],
    [true, 'error', true, false, false],
    [true, 'error', false, false, false],
    [false, 'none', true, false, false],
    [false, 'none', false, false, false],
    [true, 'none', true, false, false],
    [true, 'none', false, false, false],
    [true, 'none', true, true, false],
    [true, 'none', false, true, false],
    [false, 'success', true, false, false],
    [false, 'success', false, false, false],
    [true, 'success', true, false, false],
    [true, 'success', false, false, false],
    [false, 'error', true, false, false],
    [false, 'error', false, false, false],
    [true, 'error', true, false, false],
    [true, 'error', false, false, false],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, false],
  ])(
    'should return correct css for hideLabel: %o, state: %s, isDisabled: %s, isLoading: %s and compact %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
