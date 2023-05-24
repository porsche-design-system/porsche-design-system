import type { TagColor, TagColorDeprecated } from './tag-utils';
import type { Theme } from '../../types';
import { getThemedColors } from '../../styles';
import { getThemedBackgroundColor } from './tag-shared-utils';

describe('getThemedBackgroundColor()', () => {
  it.each<[Exclude<TagColor, TagColorDeprecated>, Theme]>([
    ['background-base', 'light'],
    ['primary', 'light'],
    ['notification-success-soft', 'light'],
    ['notification-warning-soft', 'light'],
    ['notification-error-soft', 'light'],
    ['notification-info-soft', 'light'],
    ['background-surface', 'light'],
    ['background-base', 'dark'],
    ['primary', 'dark'],
    ['notification-success-soft', 'dark'],
    ['notification-warning-soft', 'dark'],
    ['notification-error-soft', 'dark'],
    ['notification-info-soft', 'dark'],
    ['background-surface', 'dark'],
  ])('should return correct backgroundColor for color: %s, theme: %s', (color, theme) => {
    const themedColors = getThemedColors(theme);
    expect(getThemedBackgroundColor(color, themedColors)).toMatchSnapshot();
  });
});
