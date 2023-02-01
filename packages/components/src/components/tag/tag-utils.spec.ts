import { getThemedBackgroundHoverColor, getThemeForIcon, hasInvertedThemeColor, TagColor } from './tag-utils';
import type { Theme } from '../../types';
import { getThemedColors } from '../../styles';

describe('getThemeForIcon()', () => {
  it.each<Parameters<typeof getThemeForIcon>>([
    ['neutral-contrast-high', 'light'],
    ['neutral-contrast-high', 'dark'],
    ['primary', 'light'],
    ['primary', 'dark'],
    ['background-base', 'light'],
    ['background-base', 'dark'],
  ])('should return correct theme for color: %s and theme: %s', (...args) => {
    expect(getThemeForIcon(...args)).toMatchSnapshot();
  });
});

const colorsWithThemeCombinations: [TagColor, Theme, boolean][] = [
  ['background-surface', 'light', false],
  ['background-default', 'light', false],
  ['neutral-contrast-high', 'light', true],
  ['notification-success', 'light', false],
  ['notification-warning', 'light', false],
  ['notification-error', 'light', false],
  ['notification-neutral', 'light', false], // 'notification-neutral' is deprecated (replaced with 'notification-information')
  ['notification-info', 'light', false],
  ['background-surface', 'dark', false],
  ['background-default', 'dark', false],
  ['neutral-contrast-high', 'dark', true],
  ['notification-success', 'dark', false],
  ['notification-warning', 'dark', false],
  ['notification-error', 'dark', false],
  ['notification-neutral', 'dark', false], // 'notification-neutral' is deprecated (replaced with 'notification-information')
  ['notification-info', 'dark', false],
];

describe('hasInvertedThemeColor()', () => {
  it.each<[TagColor, Theme, boolean]>(colorsWithThemeCombinations)(
    'should for color: %s and theme: %s return %s',
    (color, theme, expected) => {
      expect(hasInvertedThemeColor(color, theme)).toBe(expected);
    }
  );
});

describe('getThemedBackgroundHoverColor()', () => {
  it.each<[TagColor, Theme, boolean]>(colorsWithThemeCombinations)(
    'should return correct backgroundColor for color: %s, theme: %s',
    (color, theme) => {
      const themedColors = getThemedColors(theme);
      expect(getThemedBackgroundHoverColor(color, themedColors, theme)).toMatchSnapshot();
    }
  );
});
