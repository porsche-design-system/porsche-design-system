import type { BreakpointCustomizable } from '../../../types';
import { getComponentCss } from './tabs-bar-styles';
import type { TabGradientColorTheme, TabSize, TabWeight } from './tabs-bar-utils';
import type { ThemeExtendedElectric } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<TabSize>, TabWeight, TabGradientColorTheme, ThemeExtendedElectric]>([
    ['small', 'regular', 'default', 'light'],
    ['small', 'regular', 'default', 'dark'],
    ['small', 'regular', 'default', 'light-electric'],
    ['medium', 'regular', 'default', 'light'],
    ['medium', 'regular', 'default', 'dark'],
    ['medium', 'regular', 'default', 'light-electric'],
    ['small', 'regular', 'surface', 'light'],
    ['small', 'semibold', 'default', 'light'],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, 'regular', 'default', 'light'],
  ])('should return correct css for size: %j, weight: %s, gradientColorScheme: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
