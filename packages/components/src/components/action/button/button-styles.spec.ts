import { getComponentCss } from './button-styles';
import { BreakpointCustomizable, ButtonVariant, Theme } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[ButtonVariant, BreakpointCustomizable<boolean>, boolean, Theme]>([
    ['primary', false, false, 'light'],
    ['primary', false, false, 'dark'],
    ['secondary', false, false, 'light'],
    ['secondary', false, false, 'dark'],
    ['tertiary', false, false, 'light'],
    ['tertiary', false, false, 'dark'],
    ['primary', false, true, 'light'],
    ['primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, true, 'dark'],
  ])(
    'should return correct css for variant: %s, hideLabel: %s, isDisabledOrLoading: %s and theme: %s',
    (variant, hideLabel, isDisabledOrLoading, theme) => {
      expect(getComponentCss(variant, hideLabel, isDisabledOrLoading, theme)).toMatchSnapshot();
    }
  );
});
