import { getComponentCss, getSlottedCss } from './select-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', 'light'],
    [false, 'success', 'light'],
    [false, 'error', 'light'],
    [true, 'none', 'light'],
    [true, 'success', 'light'],
    [true, 'error', 'light'],
    [false, 'none', 'dark'],
    [false, 'success', 'dark'],
    [false, 'error', 'dark'],
    [true, 'none', 'dark'],
    [true, 'success', 'dark'],
    [true, 'error', 'dark'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', 'light'],
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
