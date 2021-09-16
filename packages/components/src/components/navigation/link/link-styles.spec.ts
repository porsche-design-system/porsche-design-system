import { getComponentCss } from './link-styles';
import { BreakpointCustomizable, LinkVariant, Theme } from '../../../types';
import * as jssUtils from './../../../utils/jss';

describe('getComponentCss()', () => {
  it.each<[LinkVariant, BreakpointCustomizable<boolean>, boolean, Theme]>([
    ['primary', false, false, 'light'],
    ['primary', false, false, 'dark'],
    ['secondary', false, false, 'light'],
    ['secondary', false, false, 'dark'],
    ['tertiary', false, false, 'light'],
    ['tertiary', false, false, 'dark'],
    ['primary', false, true, 'light'],
    ['primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, true, 'dark'],
  ])(
    'should return correct css for variant: %s, hideLabel: %s, hasRef: %s and theme: %s',
    (variant, hideLabel, hasHref, theme) => {
      expect(getComponentCss(variant, hideLabel, hasHref, theme)).toMatchSnapshot();
    }
  );
});
