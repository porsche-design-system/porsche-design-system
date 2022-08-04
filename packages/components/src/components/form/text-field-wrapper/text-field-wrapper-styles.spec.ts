import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', false, 'prefix', 'text', false, false, false],
    [false, false, 'none', true, 'prefix', 'text', false, false, false],
    [false, false, 'none', true, 'suffix', 'text', false, false, false],
    [false, false, 'success', false, 'prefix', 'text', false, false, false],
    [false, false, 'success', true, 'prefix', 'text', false, false, false],
    [false, false, 'success', true, 'suffix', 'text', false, false, false],
    [false, false, 'error', false, 'prefix', 'text', false, false, false],
    [false, false, 'error', true, 'prefix', 'text', false, false, false],
    [false, false, 'error', true, 'suffix', 'text', false, false, false],
    [true, false, 'none', false, 'prefix', 'text', false, false, false],
    [true, false, 'none', true, 'prefix', 'text', false, false, false],
    [true, false, 'none', true, 'prefix', 'text', false, false, false],
    [true, false, 'success', false, 'prefix', 'text', false, false, false],
    [true, false, 'success', true, 'prefix', 'text', false, false, false],
    [true, false, 'success', true, 'prefix', 'text', false, false, false],
    [true, false, 'error', false, 'prefix', 'text', false, false, false],
    [true, false, 'error', true, 'prefix', 'text', false, false, false],
    [true, false, 'error', true, 'prefix', 'text', false, false, false],
    [false, false, 'none', false, 'prefix', 'password', false, false, false],
    [false, false, 'success', false, 'prefix', 'password', false, false, false],
    [false, false, 'error', false, 'prefix', 'password', false, false, false],
    [true, false, 'none', false, 'prefix', 'password', false, false, false],
    [true, false, 'success', false, 'prefix', 'password', false, false, false],
    [true, false, 'error', false, 'prefix', 'password', false, false, false],
    [true, true, 'error', false, 'prefix', 'password', false, false, false],
    [false, false, 'none', false, 'prefix', 'search', false, false, false],
    [false, false, 'none', false, 'prefix', 'search', true, false, false],
    [false, false, 'none', false, 'prefix', 'search', true, true, false],
    [false, false, 'none', false, 'prefix', 'search', true, true, true],
    [false, false, 'none', true, 'prefix', 'number', false, false, false],
    [
      false,
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      'none',
      false,
      'prefix',
      'text',
      false,
      false,
      false,
    ],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, hasUnitOrVisibleCounter: %s, unitPosition: %s, inputType: %s, isWithinForm: %s, hasAction: %s, hasActionLoading: %s',
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
