import { getComponentCss, getSlottedCss } from './link-styles';
import { LinkVariant, Theme } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[LinkVariant, Theme]>([
    ['primary', 'light'],
    ['primary', 'dark'],
    ['secondary', 'light'],
    ['secondary', 'dark'],
    ['tertiary', 'light'],
    ['tertiary', 'dark'],
  ])('should return correct css for variant: %s', (variant, theme) => {
    expect(getComponentCss(variant, theme)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
