import { colorDarken, getThemedColors, getThemedFormStateColors } from './colors';
import type { Theme, FormState, ThemeExtendedElectric } from '../types';

describe('colorDarken', () => {
  it('should contain darker colors', () => {
    expect(colorDarken).toMatchSnapshot();
  });
});

describe('getThemedColors()', () => {
  it.each<ThemeExtendedElectric>(['light', 'dark', 'light-electric'])(
    'should return correct colors for theme: %o',
    (theme) => {
      expect(getThemedColors(theme)).toMatchSnapshot();
    }
  );
});

describe('getThemedFormStateColors()', () => {
  it.each<[Theme, FormState]>([
    ['light', 'none'],
    ['light', 'success'],
    ['light', 'error'],
    ['dark', 'none'],
    ['dark', 'success'],
    ['dark', 'error'],
  ])('should return correct colors for theme: %o and state: %o', (theme, state) => {
    expect(getThemedFormStateColors(theme, state)).toMatchSnapshot();
  });
});
