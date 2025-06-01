import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentInputBaseStyles } from './input-base-styles';

describe('getFunctionalComponentInputBaseStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentInputBaseStyles>>([
    [false, false, 'none', true, false, 'light'],
    [false, false, 'none', true, false, 'light'],
    [false, false, 'none', false, false, 'light'],
    [false, true, 'none', true, false, 'light'],
    [false, true, 'none', false, false, 'light'],
    [false, false, 'success', true, false, 'light'],
    [false, false, 'success', false, false, 'light'],
    [false, true, 'success', true, true, 'light'],
    [false, true, 'success', false, true, 'light', { padding: 0 }],
    [false, false, 'error', true, false, 'light'],
    [false, false, 'error', false, false, 'light'],
    [false, true, 'error', true, false, 'light'],
    [false, true, 'error', false, false, 'light', { padding: 0 }],
    [true, true, 'error', false, false, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'dark'],
  ])(
    'should return correct css for isDisabledOrLoading: %s, hideLabel: %o, state: %s, button: %o, compact: %o, readOnly: %o, theme: %s, additionalInputJssStyle: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getCss(getFunctionalComponentInputBaseStyles(...args)));
    }
  );
});
