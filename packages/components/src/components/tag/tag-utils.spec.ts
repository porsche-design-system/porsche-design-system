import { getThemedBackgroundHoverColor, getThemeForIcon, TagColor, TagColorDeprecated } from './tag-utils';
import type { Theme } from '../../types';
import { getThemedColors } from '../../styles';

describe('getThemeForIcon()', () => {
  it.each<[Parameters<typeof getThemeForIcon>[0], Parameters<typeof getThemeForIcon>[1], Theme]>([
    ['neutral-contrast-high', 'light', 'dark'],
    ['neutral-contrast-high', 'dark', 'light'],
    ['primary', 'light', 'dark'],
    ['primary', 'dark', 'light'],
    ['background-base', 'light', 'light'],
    ['background-base', 'dark', 'dark'],
  ])('should return correct theme for color: %s and theme: %s', (color, theme, result) => {
    expect(getThemeForIcon(color, theme)).toBe(result);
  });
});

const colorsWithThemeCombinations: [Exclude<TagColor, TagColorDeprecated>, Theme, boolean][] = [
  ['primary', 'light', false],
  ['background-base', 'light', false],
  ['background-surface', 'light', false],
  ['notification-success', 'light', false],
  ['notification-warning', 'light', false],
  ['notification-error', 'light', false],
  ['notification-info', 'light', false],
  ['primary', 'dark', true],
  ['background-base', 'dark', false],
  ['background-surface', 'dark', false],
  ['notification-success', 'dark', false],
  ['notification-warning', 'dark', false],
  ['notification-error', 'dark', false],
  ['notification-info', 'dark', false],
];

describe('getThemedBackgroundHoverColor()', () => {
  it.each<[Exclude<TagColor, TagColorDeprecated>, Theme, boolean]>(colorsWithThemeCombinations)(
    'should return correct backgroundColor for color: %s and theme: %s',
    (color, theme) => {
      const themedColors = getThemedColors(theme);
      expect(getThemedBackgroundHoverColor(color, themedColors, theme)).toMatchSnapshot();
    }
  );
});
