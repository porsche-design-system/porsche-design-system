import { getSlottedCss } from './link-social-styles';
import { BreakpointCustomizable, Theme } from '../../../types';
import { getComponentCss } from './link-social-styles';
import { SocialIconName } from './link-social-utils';

describe('getComponentCss()', () => {
  it.each<[SocialIconName, BreakpointCustomizable<boolean>, Theme]>([
    ['logo-facebook', false, 'light'],
    ['logo-facebook', false, 'dark'],
    ['logo-google', false, 'light'],
    ['logo-google', false, 'dark'],
    ['logo-instagram', false, 'light'],
    ['logo-instagram', false, 'dark'],
    ['logo-linkedin', false, 'light'],
    ['logo-linkedin', false, 'dark'],
    ['logo-pinterest', false, 'light'],
    ['logo-pinterest', false, 'dark'],
    ['logo-twitter', false, 'light'],
    ['logo-twitter', false, 'dark'],
    ['logo-wechat', false, 'light'],
    ['logo-wechat', false, 'dark'],
    ['logo-whatsapp', false, 'light'],
    ['logo-whatsapp', false, 'dark'],
    ['logo-xing', false, 'light'],
    ['logo-xing', false, 'dark'],
    ['logo-youtube', false, 'light'],
    ['logo-youtube', false, 'dark'],
    ['logo-youtube', { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'dark'],
  ])('should return correct css for variant: %s, hideLabel: %s and theme: %s', (variant, hideLabel, theme) => {
    expect(getComponentCss(variant, hideLabel, theme)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link-social');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link-social');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
