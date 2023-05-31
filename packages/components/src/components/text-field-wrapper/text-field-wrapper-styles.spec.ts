import { getComponentCss } from './text-field-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', false, 'prefix', 'text', true, false, 'light'],
    [false, false, 'none', true, 'prefix', 'text', true, false, 'light'],
    [false, false, 'none', true, 'suffix', 'text', true, false, 'light'],
    [false, false, 'none', true, 'suffix', 'text', true, false, 'dark'],
    [false, false, 'success', false, 'prefix', 'text', true, false, 'light'],
    [false, false, 'success', true, 'prefix', 'text', true, false, 'light'],
    [false, false, 'success', true, 'suffix', 'text', true, false, 'light'],
    [false, false, 'success', true, 'suffix', 'text', true, false, 'dark'],
    [false, false, 'error', false, 'prefix', 'text', true, false, 'light'],
    [false, false, 'error', true, 'prefix', 'text', true, false, 'light'],
    [false, false, 'error', true, 'suffix', 'text', true, false, 'light'],
    [false, false, 'error', true, 'suffix', 'text', true, false, 'dark'],
    [true, false, 'none', false, 'prefix', 'text', true, false, 'light'],
    [true, false, 'none', true, 'prefix', 'text', true, false, 'light'],
    [true, false, 'success', false, 'prefix', 'text', true, false, 'light'],
    [true, false, 'success', true, 'prefix', 'text', true, false, 'light'],
    [true, false, 'error', false, 'prefix', 'text', true, false, 'light'],
    [true, false, 'error', true, 'prefix', 'text', true, false, 'light'],
    [false, false, 'none', false, 'prefix', 'password', true, false, 'light'],
    [false, false, 'success', false, 'prefix', 'password', true, false, 'light'],
    [false, false, 'error', false, 'prefix', 'password', true, false, 'light'],
    [true, false, 'none', false, 'prefix', 'password', true, false, 'light'],
    [true, false, 'success', false, 'prefix', 'password', true, false, 'light'],
    [true, false, 'error', false, 'prefix', 'password', true, false, 'light'],
    [true, true, 'error', false, 'prefix', 'password', true, false, 'light'],
    [true, true, 'error', false, 'prefix', 'password', false, false, 'light'], // showPasswordToggle = false
    [false, false, 'none', false, 'prefix', 'search', true, false, 'light'],
    [false, false, 'none', false, 'prefix', 'search', true, true, 'light'],
    [false, false, 'none', true, 'prefix', 'number', true, false, 'light'],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      false,
      'prefix',
      'text',
      true,
      false,
      'light',
    ],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, hasUnitOrVisibleCounter: %s, unitPosition: %s, inputType: %s, showPasswordToggle: %s, isWithinForm: %s, theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
