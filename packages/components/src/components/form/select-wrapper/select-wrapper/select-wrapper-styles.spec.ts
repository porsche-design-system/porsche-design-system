import { getComponentCss, getSlottedCss } from './select-wrapper-styles';
import type { BreakpointCustomizable, FormState, Theme } from '../../../../types';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<boolean>, FormState, Theme]>([
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
  ])('should return correct css for hideLabel: %o, state: %o and theme: %o', (hideLabel, state, theme) => {
    expect(getComponentCss(hideLabel, state, theme)).toMatchSnapshot();
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
