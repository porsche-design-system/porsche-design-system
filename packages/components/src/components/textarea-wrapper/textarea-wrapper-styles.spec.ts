import { getComponentCss, getSlottedCss } from './textarea-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', true, true],
    [false, false, 'none', false, false],
    [false, true, 'none', true, true],
    [false, true, 'none', false, false],
    [false, false, 'success', true, true],
    [false, false, 'success', false, false],
    [false, true, 'success', true, true],
    [false, true, 'success', false, false],
    [false, false, 'error', true, true],
    [false, false, 'error', false, false],
    [false, true, 'error', true, true],
    [false, true, 'error', false, false],
    [true, true, 'error', false, false],
    [false, false, 'none', true, false],
    [false, false, 'none', false, true],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, true],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, isCounterVisible: %s, hasCounter: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-textarea-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-textarea-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
