import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getFunctionalComponentInputBaseStyles } from './input-base-styles';
import { getCss } from '../../../utils';

describe('getFunctionalComponentInputBaseStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentInputBaseStyles>>([
    [false, false, 'none', true, false, false, 'light', undefined],
    [false, false, 'none', true, false, false, 'light', undefined],
    [false, false, 'none', false, false, false, 'light', undefined],
    [false, true, 'none', true, false, false, 'light', undefined],
    [false, true, 'none', false, false, false, 'light', undefined],
    [false, false, 'success', true, false, false, 'light', undefined],
    [false, false, 'success', false, false, false, 'light', undefined],
    [false, true, 'success', true, true, true, 'light', undefined],
    [false, true, 'success', false, true, true, 'light', { padding: 0 }],
    [false, false, 'error', true, false, false, 'light', undefined],
    [false, false, 'error', false, false, false, 'light', undefined],
    [false, true, 'error', true, false, false, 'light', undefined],
    [false, true, 'error', false, false, false, 'light', { padding: 0 }],
    [true, true, 'error', false, false, false, 'light', undefined],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      true,
      false,
      false,
      'light',
      undefined,
    ],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      true,
      false,
      false,
      'dark',
      undefined,
    ],
  ])(
    'should return correct css for disabled: %s, hideLabel: %o, state: %s, button: %o, compact: %o, readOnly: %o, theme: %s, additionalDefaultJssStyle: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getCss(getFunctionalComponentInputBaseStyles(...args)));
    }
  );
});
