import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './input-number-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', false, false, 'light', 'suffix', false],
    [false, false, 'none', false, false, 'light', 'suffix', false],
    [false, false, 'none', false, false, 'light', 'suffix', true],
    [false, true, 'none', false, false, 'light', 'suffix', true],
    [false, true, 'none', false, false, 'light', 'suffix', true],
    [false, false, 'success', false, false, 'light', 'suffix', true],
    [false, false, 'success', false, false, 'light', 'suffix', true],
    [false, true, 'success', true, true, 'light', 'prefix', true],
    [false, true, 'success', true, true, 'light', 'prefix', true],
    [false, false, 'error', false, false, 'light', 'prefix', true],
    [false, false, 'error', false, false, 'light', 'prefix', false],
    [false, true, 'error', false, false, 'light', 'prefix', false],
    [false, true, 'error', false, false, 'light', 'prefix', false],
    [true, true, 'error', false, false, 'light', 'prefix', false],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      false,
      false,
      'light',
      'suffix',
      false,
    ],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      false,
      false,
      'dark',
      'suffix',
      false,
    ],
  ])(
    'should return correct css for disabled: %s, hideLabel: %o, state: %s, compact: %o, readOnly: %o, theme: %s, unitPosition: %s, controls: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
