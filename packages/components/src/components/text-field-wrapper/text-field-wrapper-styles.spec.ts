import { getComponentCss } from './text-field-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', false, 'prefix', 'text', true, false, true, 'light'],
    [false, false, 'none', true, 'prefix', 'text', true, false, false, 'light'],
    [false, false, 'none', true, 'suffix', 'text', true, false, true, 'light'],
    [false, false, 'none', true, 'suffix', 'text', true, false, false, 'dark'],
    [false, false, 'success', false, 'prefix', 'text', true, false, true, 'light'],
    [false, false, 'success', true, 'prefix', 'text', true, false, false, 'light'],
    [false, false, 'success', true, 'suffix', 'text', true, false, true, 'light'],
    [false, false, 'success', true, 'suffix', 'text', true, false, false, 'dark'],
    [false, false, 'error', false, 'prefix', 'text', true, false, true, 'light'],
    [false, false, 'error', true, 'prefix', 'text', true, false, false, 'light'],
    [false, false, 'error', true, 'suffix', 'text', true, false, true, 'light'],
    [false, false, 'error', true, 'suffix', 'text', true, false, false, 'dark'],
    [true, false, 'none', false, 'prefix', 'text', true, false, true, 'light'],
    [true, false, 'none', true, 'prefix', 'text', true, false, false, 'light'],
    [true, false, 'success', false, 'prefix', 'text', true, false, true, 'light'],
    [true, false, 'success', true, 'prefix', 'text', true, false, false, 'light'],
    [true, false, 'error', false, 'prefix', 'text', true, false, true, 'light'],
    [true, false, 'error', true, 'prefix', 'text', true, false, false, 'light'],
    [false, false, 'none', false, 'prefix', 'password', true, false, true, 'light'],
    [false, false, 'success', false, 'prefix', 'password', true, false, false, 'light'],
    [false, false, 'error', false, 'prefix', 'password', true, false, true, 'light'],
    [true, false, 'none', false, 'prefix', 'password', true, false, false, 'light'],
    [true, false, 'success', false, 'prefix', 'password', true, false, true, 'light'],
    [true, false, 'error', false, 'prefix', 'password', true, false, false, 'light'],
    [true, true, 'error', false, 'prefix', 'password', true, false, true, 'light'],
    [true, true, 'error', false, 'prefix', 'password', false, false, false, 'light'], // showPasswordToggle = false
    [false, false, 'none', false, 'prefix', 'search', true, false, true, 'light'],
    [false, false, 'none', false, 'prefix', 'search', true, true, false, 'light'],
    [false, false, 'none', false, 'prefix', 'search', true, true, true, 'light'],
    [false, false, 'none', true, 'prefix', 'number', true, false, true, 'light'],
    [
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
    ],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, hasUnitOrVisibleCounter: %s, unitPosition: %s, inputType: %s, showPasswordToggle: %s, isWithinForm: %s, hasSubmitButton: %s, theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
