import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './text-field-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'none', false, 'prefix', 'text', true, false, true, 'light', undefined],
    [false, false, false, 'none', true, 'prefix', 'text', true, false, false, 'light', 3],
    [false, true, false, 'none', true, 'prefix', 'text', true, false, false, 'light', 3],
    [false, false, false, 'none', true, 'suffix', 'text', true, false, true, 'light', 3],
    [false, false, false, 'none', true, 'suffix', 'text', true, false, false, 'dark', 3],
    [false, false, false, 'success', false, 'prefix', 'text', true, false, true, 'light', undefined],
    [false, false, false, 'success', true, 'prefix', 'text', true, false, false, 'light', 3],
    [false, false, false, 'success', true, 'suffix', 'text', true, false, true, 'light', 3],
    [false, false, false, 'success', true, 'suffix', 'text', true, false, false, 'dark', 3],
    [false, false, false, 'error', false, 'prefix', 'text', true, false, true, 'light', undefined],
    [false, false, false, 'error', true, 'prefix', 'text', true, false, false, 'light', 3],
    [false, false, false, 'error', true, 'suffix', 'text', true, false, true, 'light', 3],
    [false, false, false, 'error', true, 'suffix', 'text', true, false, false, 'dark', 3],
    [true, false, false, 'none', false, 'prefix', 'text', true, false, true, 'light', undefined],
    [true, false, false, 'none', true, 'prefix', 'text', true, false, false, 'light', 3],
    [true, false, false, 'success', false, 'prefix', 'text', true, false, true, 'light', undefined],
    [true, false, false, 'success', true, 'prefix', 'text', true, false, false, 'light', 3],
    [true, false, false, 'error', false, 'prefix', 'text', true, false, true, 'light', undefined],
    [true, false, false, 'error', true, 'prefix', 'text', true, false, false, 'light', 3],
    [false, false, false, 'none', false, 'prefix', 'password', true, false, true, 'light', undefined],
    [false, false, false, 'success', false, 'prefix', 'password', true, false, false, 'light', undefined],
    [false, false, false, 'error', false, 'prefix', 'password', true, false, true, 'light', undefined],
    [true, false, false, 'none', false, 'prefix', 'password', true, false, false, 'light', undefined],
    [true, false, false, 'success', false, 'prefix', 'password', true, false, true, 'light', undefined],
    [true, false, false, 'error', false, 'prefix', 'password', true, false, false, 'light', undefined],
    [true, false, true, 'error', false, 'prefix', 'password', true, false, true, 'light', undefined],
    [true, false, true, 'error', false, 'prefix', 'password', false, false, false, 'light', undefined], // showPasswordToggle = false
    [false, false, false, 'none', false, 'prefix', 'search', true, false, true, 'light', undefined],
    [false, false, false, 'none', false, 'prefix', 'search', true, true, false, 'light', undefined],
    [false, false, false, 'none', false, 'prefix', 'search', true, true, true, 'light', undefined],
    [false, false, false, 'none', true, 'prefix', 'number', true, false, true, 'light', 3],
    [false, false, false, 'none', true, 'prefix', 'date', true, false, true, 'light', 3],
    [false, false, false, 'none', true, 'prefix', 'week', true, false, true, 'light', 3],
    [false, false, false, 'none', true, 'prefix', 'month', true, false, true, 'light', 3],
    [false, false, false, 'none', true, 'prefix', 'time', true, false, true, 'light', 3],
    [
      false,
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      false,
      'prefix',
      'text',
      true,
      false,
      false,
      'light',
      undefined,
    ],
  ])(
    'should return correct css for isDisabled: %s, isReadonly: %s, hideLabel: %o, state: %s, hasUnitOrVisibleCounter: %s, unitPosition: %s, inputType: %s, showPasswordToggle: %s, isWithinForm: %s, hasSubmitButton: %s, theme: %s, unitLength: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
