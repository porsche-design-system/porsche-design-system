import { getThemedBackgroundHoverColor, TagColor, TagColorDeprecated } from './tag-utils';
import type { Theme } from '../../types';
import { getThemedColors } from '../../styles';

const colorsWithThemeCombinations: [Exclude<TagColor, TagColorDeprecated>, Theme, boolean][] = [
  ['primary', 'light', false],
  ['background-base', 'light', false],
  ['background-surface', 'light', false],
  ['notification-success-soft', 'light', false],
  ['notification-warning-soft', 'light', false],
  ['notification-error-soft', 'light', false],
  ['notification-info-soft', 'light', false],
  ['primary', 'dark', true],
  ['background-base', 'dark', false],
  ['background-surface', 'dark', false],
  ['notification-success-soft', 'dark', false],
  ['notification-warning-soft', 'dark', false],
  ['notification-error-soft', 'dark', false],
  ['notification-info-soft', 'dark', false],
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
