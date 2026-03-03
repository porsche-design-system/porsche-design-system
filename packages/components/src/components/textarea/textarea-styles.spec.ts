import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './textarea-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', true, true, 'vertical'],
    [false, true, false, 'none', true, true, 'vertical'],
    [false, false, false, 'none', false, true, 'vertical'],
    [false, false, true, 'none', true, true, 'vertical'],
    [false, false, true, 'none', false, true, 'vertical'],
    [false, false, false, 'success', true, true, 'vertical'],
    [false, false, false, 'success', false, false, 'vertical'],
    [false, false, true, 'success', true, false, 'vertical'],
    [false, false, true, 'success', false, false, 'vertical'],
    [false, false, false, 'error', true, false, 'vertical'],
    [false, false, false, 'error', false, false, 'vertical'],
    [false, false, true, 'error', true, false, 'vertical'],
    [false, false, true, 'error', false, false, 'vertical'],
    [true, false, true, 'error', false, false, 'vertical'],
    [false, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'vertical'],
    [false, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, false, 'vertical'],
  ])(
    'should return correct css for isDisabled: %s, isReadonly: %s, hideLabel: %o, state: %s, compact: %s, counter: %s and resize: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
