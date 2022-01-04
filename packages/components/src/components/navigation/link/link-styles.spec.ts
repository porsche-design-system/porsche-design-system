import { getComponentCss } from './link-styles';
import { BreakpointCustomizable, LinkVariant, Theme } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[LinkVariant, BreakpointCustomizable<boolean>, boolean, Theme]>([
    ['primary', false, true, 'light'],
    ['primary', false, true, 'dark'],
    ['secondary', false, true, 'light'],
    ['secondary', false, true, 'dark'],
    ['tertiary', false, true, 'light'],
    ['tertiary', false, true, 'dark'],
    ['primary', false, false, 'light'],
    ['primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, false, 'dark'],
  ])(
    'should return correct css for variant: %s, hideLabel: %s, hasSlottedAnchor: %s and theme: %s',
    (variant, hideLabel, hasSlottedAnchor, theme) => {
      expect(getComponentCss(variant, hideLabel, hasSlottedAnchor, theme)).toMatchSnapshot();
    }
  );
});
