import { getComponentCss, getSlottedCss } from './banner-inline-styles';
import type { Theme } from '../../../types';
import type { BannerInlineState } from './banner-inline-utils';

describe('getComponentCss()', () => {
  it.each<[BannerInlineState, Theme]>([
    ['neutral', 'light'],
    ['warning', 'light'],
    ['success', 'light'],
    ['error', 'light'],
    ['neutral', 'dark'],
    ['warning', 'dark'],
    ['success', 'dark'],
    ['error', 'dark'],
  ])('should return correct css for state: %s and theme: %s', (state, theme) => {
    expect(getComponentCss(state, theme)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-banner-inline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-banner-inline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
