import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', false, 'prefix', 'text', false, 'light'],
    [false, false, 'none', true, 'prefix', 'text', false, 'light'],
    [false, false, 'none', true, 'suffix', 'text', false, 'light'],
    [false, false, 'none', true, 'suffix', 'text', false, 'dark'],
    [false, false, 'success', false, 'prefix', 'text', false, 'light'],
    [false, false, 'success', true, 'prefix', 'text', false, 'light'],
    [false, false, 'success', true, 'suffix', 'text', false, 'light'],
    [false, false, 'success', true, 'suffix', 'text', false, 'dark'],
    [false, false, 'error', false, 'prefix', 'text', false, 'light'],
    [false, false, 'error', true, 'prefix', 'text', false, 'light'],
    [false, false, 'error', true, 'suffix', 'text', false, 'light'],
    [false, false, 'error', true, 'suffix', 'text', false, 'dark'],
    [true, false, 'none', false, 'prefix', 'text', false, 'light'],
    [true, false, 'none', true, 'prefix', 'text', false, 'light'],
    [true, false, 'none', true, 'prefix', 'text', false, 'light'],
    [true, false, 'success', false, 'prefix', 'text', false, 'light'],
    [true, false, 'success', true, 'prefix', 'text', false, 'light'],
    [true, false, 'success', true, 'prefix', 'text', false, 'light'],
    [true, false, 'error', false, 'prefix', 'text', false, 'light'],
    [true, false, 'error', true, 'prefix', 'text', false, 'light'],
    [true, false, 'error', true, 'prefix', 'text', false, 'light'],
    [false, false, 'none', false, 'prefix', 'password', false, 'light'],
    [false, false, 'success', false, 'prefix', 'password', false, 'light'],
    [false, false, 'error', false, 'prefix', 'password', false, 'light'],
    [true, false, 'none', false, 'prefix', 'password', false, 'light'],
    [true, false, 'success', false, 'prefix', 'password', false, 'light'],
    [true, false, 'error', false, 'prefix', 'password', false, 'light'],
    [true, true, 'error', false, 'prefix', 'password', false, 'light'],
    [false, false, 'none', false, 'prefix', 'search', false, 'light'],
    [false, false, 'none', false, 'prefix', 'search', true, 'light'],
    [false, false, 'none', false, 'prefix', 'search', true, 'light'],
    [false, false, 'none', false, 'prefix', 'search', true, 'light'],
    [false, false, 'none', true, 'prefix', 'number', false, 'light'],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      false,
      'prefix',
      'text',
      false,
      'light',
    ],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, hasUnitOrVisibleCounter: %s, unitPosition: %s, inputType: %s, isWithinForm: %s, theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-text-field-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-text-field-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
