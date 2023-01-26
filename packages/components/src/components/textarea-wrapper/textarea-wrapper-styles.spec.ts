import { getComponentCss, getSlottedCss } from './textarea-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', true, true, 'light'],
    [false, false, 'none', false, false, 'light'],
    [false, true, 'none', true, true, 'light'],
    [false, true, 'none', false, false, 'light'],
    [false, false, 'success', true, true, 'light'],
    [false, false, 'success', false, false, 'light'],
    [false, true, 'success', true, true, 'light'],
    [false, true, 'success', false, false, 'light'],
    [false, false, 'error', true, true, 'light'],
    [false, false, 'error', false, false, 'light'],
    [false, true, 'error', true, true, 'light'],
    [false, true, 'error', false, false, 'light'],
    [true, true, 'error', false, false, 'light'],
    [false, false, 'none', true, false, 'light'],
    [false, false, 'none', false, true, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, true, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, true, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, isCounterVisible: %s, hasCounter: %s, theme: %s',
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
