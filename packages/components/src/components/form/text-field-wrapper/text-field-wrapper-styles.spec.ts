import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', false, 'prefix', 'text'],
    [false, false, 'none', true, 'prefix', 'text'],
    [false, false, 'none', true, 'suffix', 'text'],
    [false, false, 'success', false, 'prefix', 'text'],
    [false, false, 'success', true, 'prefix', 'text'],
    [false, false, 'success', true, 'suffix', 'text'],
    [false, false, 'error', false, 'prefix', 'text'],
    [false, false, 'error', true, 'prefix', 'text'],
    [false, false, 'error', true, 'suffix', 'text'],
    [true, false, 'none', false, 'prefix', 'text'],
    [true, false, 'none', true, 'prefix', 'text'],
    [true, false, 'none', true, 'prefix', 'text'],
    [true, false, 'success', false, 'prefix', 'text'],
    [true, false, 'success', true, 'prefix', 'text'],
    [true, false, 'success', true, 'prefix', 'text'],
    [true, false, 'error', false, 'prefix', 'text'],
    [true, false, 'error', true, 'prefix', 'text'],
    [true, false, 'error', true, 'prefix', 'text'],
    [false, false, 'none', false, 'prefix', 'password'],
    [false, false, 'success', false, 'prefix', 'password'],
    [false, false, 'error', false, 'prefix', 'password'],
    [true, false, 'none', false, 'prefix', 'password'],
    [true, false, 'success', false, 'prefix', 'password'],
    [true, false, 'error', false, 'prefix', 'password'],
    [true, true, 'error', false, 'prefix', 'password'],
    [false, false, 'none', false, 'prefix', 'search'],
    [false, false, 'none', true, 'prefix', 'number'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, 'prefix', 'text'],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, hasUnitOrVisibleCounter: %s, unitPosition: %s, inputType: %s',
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
