import { getComponentCss, getSlottedCss } from './textarea-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', true],
    [false, false, 'none', false],
    [false, true, 'none', true],
    [false, true, 'none', false],
    [false, false, 'success', true],
    [false, false, 'success', false],
    [false, true, 'success', true],
    [false, true, 'success', false],
    [false, false, 'error', true],
    [false, false, 'error', false],
    [false, true, 'error', true],
    [false, true, 'error', false],
    [true, true, 'error', false],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true],
  ])('should return correct css for hideLabel: %o, state: %s and %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
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
