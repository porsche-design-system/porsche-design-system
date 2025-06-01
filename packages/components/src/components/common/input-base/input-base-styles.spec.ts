import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentInputBaseStyles } from './input-base-styles';

describe('getFunctionalComponentInputBaseStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentInputBaseStyles>>([
    [false, false, 'none', true, false, false, 'light'],
    [false, false, 'none', true, false, false, 'light'],
    [false, false, 'none', false, false, false, 'light'],
    [false, true, 'none', true, false, false, 'light'],
    [false, true, 'none', false, false, false, 'light'],
    [false, false, 'success', true, false, false, 'light'],
    [false, false, 'success', false, false, true, 'light'],
    [false, true, 'success', true, true, true, 'light'],
    [false, true, 'success', false, true, true, 'light', { padding: 0 }],
    [false, false, 'error', true, false, true, 'light'],
    [false, false, 'error', false, false, true, 'light'],
    [false, true, 'error', true, false, true, 'light'],
    [false, true, 'error', false, false, true, 'light', { padding: 0 }],
    [true, true, 'error', false, false, false, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, false, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, false, 'dark'],
  ])(
    'should return correct css for disabled: %s, hideLabel: %o, state: %s, button: %o, compact: %o, readOnly: %o, loading: %o, theme: %s, additionalInputJssStyle: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getCss(getFunctionalComponentInputBaseStyles(...args)));
    }
  );
});
