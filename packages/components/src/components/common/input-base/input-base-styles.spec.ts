import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentInputBaseStyles } from './input-base-styles';

describe('getFunctionalComponentInputBaseStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentInputBaseStyles>>([
    [false, false, false, 'none', true, false],
    [false, false, false, 'none', true, false],
    [false, false, false, 'none', false, false],
    [false, false, true, 'none', true, false],
    [false, false, true, 'none', false, false],
    [false, false, false, 'success', true, false],
    [false, false, false, 'success', false, false],
    [false, false, true, 'success', true, true],
    [false, false, true, 'success', false, true, { padding: 0 }],
    [false, false, false, 'error', true, false],
    [false, false, false, 'error', false, false],
    [false, false, true, 'error', true, false],
    [false, false, true, 'error', false, false, { padding: 0 }],
    [true, true, true, 'error', false, false],
    [false, true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false],
    [true, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false],
  ])(
    'should return correct css for disabled: %s, loading: %s, hideLabel: %o, state: %s, button: %o, compact: %o, readOnly: %o and additionalInputJssStyle: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getCss(getFunctionalComponentInputBaseStyles(...args)));
    }
  );
});
