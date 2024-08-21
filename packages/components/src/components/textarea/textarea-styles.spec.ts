import { getComponentCss } from './textarea-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', true, 'vertical', 'light'],
    [false, false, 'none', false, 'vertical', 'light'],
    [false, true, 'none', true, 'vertical', 'light'],
    [false, true, 'none', false, 'vertical', 'light'],
    [false, false, 'success', true, 'vertical', 'light'],
    [false, false, 'success', false, 'vertical', 'light'],
    [false, true, 'success', true, 'vertical', 'light'],
    [false, true, 'success', false, 'vertical', 'light'],
    [false, false, 'error', true, 'vertical', 'light'],
    [false, false, 'error', false, 'vertical', 'light'],
    [false, true, 'error', true, 'vertical', 'light'],
    [false, true, 'error', false, 'vertical', 'light'],
    [true, true, 'error', false, 'vertical', 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'vertical', 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'vertical', 'dark'],
  ])('should return correct css for isDisabled: %s, hideLabel: %o, state: %s, hasCounter: %s, theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
