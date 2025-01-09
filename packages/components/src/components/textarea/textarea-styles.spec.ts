import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './textarea-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', true, 'vertical', 'light'],
    [false, true, false, 'none', true, 'vertical', 'light'],
    [false, false, false, 'none', false, 'vertical', 'light'],
    [false, false, true, 'none', true, 'vertical', 'light'],
    [false, false, true, 'none', false, 'vertical', 'light'],
    [false, false, false, 'success', true, 'vertical', 'light'],
    [false, false, false, 'success', false, 'vertical', 'light'],
    [false, false, true, 'success', true, 'vertical', 'light'],
    [false, false, true, 'success', false, 'vertical', 'light'],
    [false, false, false, 'error', true, 'vertical', 'light'],
    [false, false, false, 'error', false, 'vertical', 'light'],
    [false, false, true, 'error', true, 'vertical', 'light'],
    [false, false, true, 'error', false, 'vertical', 'light'],
    [true, false, true, 'error', false, 'vertical', 'light'],
    [false, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'vertical', 'light'],
    [false, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'vertical', 'dark'],
  ])(
    'should return correct css for isDisabled: %s, isReadonly: %s, hideLabel: %o, state: %s, hasCounter: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
