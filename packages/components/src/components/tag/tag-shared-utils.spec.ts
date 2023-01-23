import { TagColor } from './tag-utils';
import { Theme } from '../../utils/theme';
import { getThemedColors } from '../../styles';
import { getThemedBackgroundColor } from './tag-shared-utils';

describe('getThemedBackgroundColor()', () => {
  it.each<[TagColor, Theme]>([
    ['background-default', 'light'],
    ['neutral-contrast-high', 'light'],
    ['notification-success', 'light'],
    ['notification-warning', 'light'],
    ['notification-error', 'light'],
    ['notification-information', 'light'],
    ['background-surface', 'light'],
    ['background-default', 'dark'],
    ['neutral-contrast-high', 'dark'],
    ['notification-success', 'dark'],
    ['notification-warning', 'dark'],
    ['notification-error', 'dark'],
    ['notification-information', 'dark'],
    ['background-surface', 'dark'],
  ])('should return correct backgroundColor for color: %s, theme: %s', (color, theme) => {
    const themedColors = getThemedColors(theme);
    expect(getThemedBackgroundColor(color, themedColors)).toMatchSnapshot();
  });
});
