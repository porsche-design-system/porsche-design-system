import { getComponentCss, getSlottedCss } from './select-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', 'light'],
    [false, false, 'success', 'light'],
    [false, false, 'error', 'light'],
    [false, true, 'none', 'light'],
    [false, true, 'success', 'light'],
    [false, true, 'error', 'light'],
    [false, false, 'none', 'dark'],
    [false, false, 'success', 'dark'],
    [false, false, 'error', 'dark'],
    [false, true, 'none', 'dark'],
    [false, true, 'success', 'dark'],
    [false, true, 'error', 'dark'],
    [true, true, 'error', 'dark'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', 'light'],
  ])('should return correct css for hideLabel: %o, state: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-select-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-select-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
