import { BreakpointCustomizable, Theme } from '../../../types';
import { getComponentCss } from './link-social-styles';
import { SocialIconName } from './link-social-utils';

describe('getComponentCss()', () => {
  it.each<[SocialIconName, BreakpointCustomizable<boolean>, boolean, Theme]>([
    [undefined, false, false, 'light'],
    [undefined, false, false, 'dark'],
    ['logo-facebook', false, false, 'light'],
    ['logo-facebook', false, false, 'dark'],
    ['logo-google', false, false, 'light'],
    ['logo-google', false, false, 'dark'],
    ['logo-instagram', false, false, 'light'],
    ['logo-instagram', false, false, 'dark'],
    ['logo-linkedin', false, false, 'light'],
    ['logo-linkedin', false, false, 'dark'],
    ['logo-pinterest', false, false, 'light'],
    ['logo-pinterest', false, false, 'dark'],
    ['logo-twitter', false, false, 'light'],
    ['logo-twitter', false, false, 'dark'],
    ['logo-wechat', false, false, 'light'],
    ['logo-wechat', false, false, 'dark'],
    ['logo-whatsapp', false, false, 'light'],
    ['logo-whatsapp', false, false, 'dark'],
    ['logo-xing', false, false, 'light'],
    ['logo-xing', false, false, 'dark'],
    ['logo-youtube', false, false, 'light'],
    ['logo-youtube', false, false, 'dark'],
    ['logo-youtube', { base: true, xs: false, s: true, m: false, l: true, xl: false }, false, 'light'],
    ['logo-youtube', false, true, 'light'],
  ])('should return correct css for variant: %s, hideLabel: %s, hasHref: %s and theme: %s', (variant, hideLabel, hasHref, theme) => {
    expect(getComponentCss(variant, hideLabel, hasHref, theme)).toMatchSnapshot();
  });
});
