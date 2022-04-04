import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', false, 'prefix', false],
    [false, false, 'none', true, 'prefix', false],
    [false, false, 'none', true, 'suffix', false],
    [false, false, 'success', false, 'prefix', false],
    [false, false, 'success', true, 'prefix', false],
    [false, false, 'success', true, 'suffix', false],
    [false, false, 'error', false, 'prefix', false],
    [false, false, 'error', true, 'prefix', false],
    [false, false, 'error', true, 'suffix', false],
    [true, false, 'none', false, 'prefix', false],
    [true, false, 'none', true, 'prefix', false],
    [true, false, 'none', true, 'prefix', false],
    [true, false, 'success', false, 'prefix', false],
    [true, false, 'success', true, 'prefix', false],
    [true, false, 'success', true, 'prefix', false],
    [true, false, 'error', false, 'prefix', false],
    [true, false, 'error', true, 'prefix', false],
    [true, false, 'error', true, 'prefix', false],
    [false, false, 'none', false, 'prefix', true],
    [false, false, 'success', false, 'prefix', true],
    [false, false, 'error', false, 'prefix', true],
    [true, false, 'none', false, 'prefix', true],
    [true, false, 'success', false, 'prefix', true],
    [true, false, 'error', false, 'prefix', true],
    [true, true, 'error', false, 'prefix', true],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, false, 'none', false, 'prefix', false],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, hasUnitOrVisibleCounter: %s, unitPosition: %s, isPassword: %s',
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
