import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentInputBaseStyles } from './input-base-styles';

describe('getFunctionalComponentInputBaseStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentInputBaseStyles>>([
    [false, false, false, 'none', true, false, null, null],
    [false, false, false, 'none', true, false, null, null],
    [false, false, false, 'none', false, false, null, null],
    [false, false, true, 'none', true, false, null, null],
    [false, false, true, 'none', false, false, null, null],
    [false, false, false, 'success', true, false, null, null],
    [false, false, false, 'success', false, false, null, null],
    [false, false, true, 'success', true, true, null, null],
    [false, false, true, 'success', false, true, { padding: 0 }, { padding: 0 }],
    [false, false, false, 'error', true, false, null, null],
    [false, false, false, 'error', false, false, null, null],
    [false, false, true, 'error', true, false, null, null],
    [false, false, true, 'error', false, false, { padding: 0 }, { padding: 0 }],
    [true, true, true, 'error', false, false, null, null],
    [false, true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, null, null],
    [true, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, null, null],
  ])(
    'should return correct css for disabled: %s, loading: %s, hideLabel: %o, state: %s, compact: %o, readOnly: %o, additionalInputJssStyle: %s and additionalHostJssStyle: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getCss(getFunctionalComponentInputBaseStyles(...args)));
    }
  );
});
