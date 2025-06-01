import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './input-number-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', false, false, 'light', false],
    [false, false, 'none', false, false, 'light', false],
    [false, false, 'none', false, false, 'light', false],
    [false, true, 'none', false, false, 'light', false],
    [false, true, 'none', false, false, 'light', false],
    [false, false, 'success', false, false, 'light', false],
    [false, false, 'success', false, false, 'light', false],
    [false, true, 'success', true, true, 'light', true],
    [false, true, 'success', true, true, 'light', true],
    [false, false, 'error', false, false, 'light', true],
    [false, false, 'error', false, false, 'light', true],
    [false, true, 'error', false, false, 'light', true],
    [false, true, 'error', false, false, 'light', false],
    [true, true, 'error', false, false, 'light', false],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, false, 'light', false],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, false, 'dark', false],
  ])(
    'should return correct css for isDisabledOrLoading: %s, hideLabel: %o, state: %s, compact: %o, readOnly: %o, theme: %s, controls: %o',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
