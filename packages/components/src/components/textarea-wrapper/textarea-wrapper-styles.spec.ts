import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './textarea-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', true, 'light'],
    [false, true, false, 'none', true, 'light'],
    [false, false, false, 'none', false, 'light'],
    [false, false, true, 'none', true, 'light'],
    [false, false, true, 'none', false, 'light'],
    [false, false, false, 'success', true, 'light'],
    [false, false, false, 'success', false, 'light'],
    [false, false, true, 'success', true, 'light'],
    [false, false, true, 'success', false, 'light'],
    [false, false, false, 'error', true, 'light'],
    [false, false, false, 'error', false, 'light'],
    [false, false, true, 'error', true, 'light'],
    [false, false, true, 'error', false, 'light'],
    [true, false, true, 'error', false, 'light'],
    [false, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'light'],
    [false, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, isReadonly: %s, hideLabel: %o, state: %s, hasCounter: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
