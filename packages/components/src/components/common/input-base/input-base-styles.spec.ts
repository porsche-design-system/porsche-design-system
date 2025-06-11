import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentInputBaseStyles } from './input-base-styles';

describe('getFunctionalComponentInputBaseStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentInputBaseStyles>>([
    [false, false, false, 'none', true, false, 'light'],
    [false, false, false, 'none', true, false, 'light'],
    [false, false, false, 'none', false, false, 'light'],
    [false, false, true, 'none', true, false, 'light'],
    [false, false, true, 'none', false, false, 'light'],
    [false, false, false, 'success', true, false, 'light'],
    [false, false, false, 'success', false, false, 'light'],
    [false, false, true, 'success', true, true, 'light'],
    [false, false, true, 'success', false, true, 'light', { padding: 0 }],
    [false, false, false, 'error', true, false, 'light'],
    [false, false, false, 'error', false, false, 'light'],
    [false, false, true, 'error', true, false, 'light'],
    [false, false, true, 'error', false, false, 'light', { padding: 0 }],
    [true, true, true, 'error', false, false, 'light'],
    [false, true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'light'],
    [true, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'dark'],
  ])(
    'should return correct css for disabled: %s, loading: %s, hideLabel: %o, state: %s, button: %o, compact: %o, readOnly: %o, theme: %s, additionalInputJssStyle: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getCss(getFunctionalComponentInputBaseStyles(...args)));
    }
  );
});
