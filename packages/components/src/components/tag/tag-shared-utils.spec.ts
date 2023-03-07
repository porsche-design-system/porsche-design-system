import type { TagColor, TagColorDeprecated } from './tag-utils';
import type { Theme } from '../../types';
import { getThemedColors } from '../../styles';
import { getThemedBackgroundColor } from './tag-shared-utils';

describe('getThemedBackgroundColor()', () => {
  it.each<[Exclude<TagColor, TagColorDeprecated>, Theme]>([
    ['background-base', 'light'],
    ['primary', 'light'],
    ['notification-success', 'light'],
    ['notification-warning', 'light'],
    ['notification-error', 'light'],
    ['notification-info', 'light'],
    ['background-surface', 'light'],
    ['background-base', 'dark'],
    ['primary', 'dark'],
    ['notification-success', 'dark'],
    ['notification-warning', 'dark'],
    ['notification-error', 'dark'],
    ['notification-info', 'dark'],
    ['background-surface', 'dark'],
  ])('should return correct backgroundColor for color: %s, theme: %s', (color, theme) => {
    const themedColors = getThemedColors(theme);
    expect(getThemedBackgroundColor(color, themedColors)).toMatchSnapshot();
  });
});
