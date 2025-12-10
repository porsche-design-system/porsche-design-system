import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './textarea-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', true, true, 'vertical', 'light'],
    [false, true, false, 'none', true, true, 'vertical', 'light'],
    [false, false, false, 'none', false, true, 'vertical', 'light'],
    [false, false, true, 'none', true, true, 'vertical', 'light'],
    [false, false, true, 'none', false, true, 'vertical', 'light'],
    [false, false, false, 'success', true, true, 'vertical', 'light'],
    [false, false, false, 'success', false, false, 'vertical', 'light'],
    [false, false, true, 'success', true, false, 'vertical', 'light'],
    [false, false, true, 'success', false, false, 'vertical', 'light'],
    [false, false, false, 'error', true, false, 'vertical', 'light'],
    [false, false, false, 'error', false, false, 'vertical', 'light'],
    [false, false, true, 'error', true, false, 'vertical', 'light'],
    [false, false, true, 'error', false, false, 'vertical', 'light'],
    [true, false, true, 'error', false, false, 'vertical', 'light'],
    [
      false,
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      true,
      false,
      'vertical',
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
      'dark',
    ],
  ])(
    'should return correct css for isDisabled: %s, isReadonly: %s, hideLabel: %o, state: %s, compact: %s, counter: %s, resize: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
