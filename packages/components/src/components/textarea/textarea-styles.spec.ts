import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './textarea-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', true, true, 'vertical', 'fixed', 'light'],
    [false, true, false, 'none', true, true, 'vertical', 'fixed', 'light'],
    [false, false, false, 'none', false, true, 'vertical', 'fixed', 'light'],
    [false, false, true, 'none', true, true, 'vertical', 'fixed', 'light'],
    [false, false, true, 'none', false, true, 'vertical', 'fixed', 'light'],
    [false, false, false, 'success', true, true, 'vertical', 'fixed', 'light'],
    [false, false, false, 'success', false, false, 'vertical', 'fixed', 'light'],
    [false, false, true, 'success', true, false, 'vertical', 'content', 'light'],
    [false, false, true, 'success', false, false, 'vertical', 'content', 'light'],
    [false, false, false, 'error', true, false, 'vertical', 'fixed', 'light'],
    [false, false, false, 'error', false, false, 'vertical', 'content', 'light'],
    [false, false, true, 'error', true, false, 'vertical', 'fixed', 'light'],
    [false, false, true, 'error', false, false, 'vertical', 'content', 'light'],
    [true, false, true, 'error', false, false, 'vertical', 'fixed', 'light'],
    [
      false,
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      true,
      false,
      'vertical',
      'content',
      'light',
    ],
    [
      false,
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      true,
      false,
      'vertical',
      'fixed',
      'dark',
    ],
  ])(
    'should return correct css for isDisabled: %s, isReadonly: %s, hideLabel: %o, state: %s, compact: %s, counter: %s, resize: %s, fieldSizing: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
