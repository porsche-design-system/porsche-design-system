import type { IconSize, TextColor as IconColor, ThemeExtendedElectricDark } from '../../../types';
import { getComponentCss } from './icon-styles';

describe('getComponentCss()', () => {
  it.each<[IconColor, IconSize, ThemeExtendedElectricDark]>([
    ['default', 'small', 'light'],
    ['default', 'small', 'dark'],
    ['brand', 'small', 'light'],
    ['inherit', 'small', 'light'],
    ['default', 'large', 'light'],
    ['default', 'inherit', 'light'],
  ])('should return correct css for color: %s, size: %s and theme: %s', (color, size, theme) => {
    expect(getComponentCss(color, size, theme)).toMatchSnapshot();
  });
});
