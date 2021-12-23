import { getComponentCss } from './spinner-styles';
import type { ThemeExtendedElectricDark } from '../../../types';
import type { SpinnerSize } from './spinner-utils';

describe('getComponentCss()', () => {
  it.each<[SpinnerSize, ThemeExtendedElectricDark]>([
    ['small', 'light'],
    ['medium', 'light'],
    ['large', 'light'],
    ['inherit', 'light'],
    [{ base: 'medium', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }, 'light'],
    ['small', 'dark'],
    ['medium', 'dark'],
    ['large', 'dark'],
    ['inherit', 'dark'],
    [{ base: 'medium', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }, 'dark'],
  ])('should return correct css for size: %j and theme %s', (size, theme) => {
    expect(getComponentCss(size, theme)).toMatchSnapshot();
  });
});
