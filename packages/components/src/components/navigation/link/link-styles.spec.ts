import { getComponentCss, getSlottedCss } from './link-styles';
import { LinkVariant, Theme } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[LinkVariant, boolean, Theme]>([
    ['primary', false, 'light'],
    ['primary', false, 'dark'],
    ['secondary', false, 'light'],
    ['secondary', false, 'dark'],
    ['tertiary', false, 'light'],
    ['tertiary', false, 'dark'],
  ])('should return correct css for variant: %s', (variant, hideLabel, theme) => {
    expect(getComponentCss(variant, hideLabel, theme)).toMatchSnapshot();
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
