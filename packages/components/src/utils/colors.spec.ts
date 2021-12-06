import { colorDarken, getThemedColors, getThemedStateColors } from './colors';
import type { Theme, FormState } from '../types';

describe('colorDarken', () => {
  it('should contain darker colors', () => {
    expect(colorDarken).toMatchSnapshot();
  });
});

describe('getThemedColors()', () => {
  it.each<Theme>(['light', 'dark', 'light-electric'])('should return correct colors for theme: %o', (theme) => {
    expect(getThemedColors(theme)).toMatchSnapshot();
  });
});

describe('getThemedStateColors()', () => {
  it.each<[Exclude<Theme, 'light-electric'>, FormState]>([
    ['light', 'none'],
    ['light', 'success'],
    ['light', 'error'],
    ['dark', 'none'],
    ['dark', 'success'],
    ['dark', 'error'],
  ])('should return correct colors for theme: %o and state: %o', (theme, state) => {
    expect(getThemedStateColors(theme, state)).toMatchSnapshot();
  });
});
