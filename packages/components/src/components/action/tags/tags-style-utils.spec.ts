import { getThemedBackgroundColor } from './tags-style-utils';
import { getThemedColors } from '../../../../styles';
import type { TagStatusColor } from '../tag-status/tag-status-utils';
import type { Theme } from '../../../../types';

describe('getThemedBackgroundColor()', () => {
  it.each<[TagStatusColor, Theme]>([
    ['background-default', 'light'],
    ['neutral-contrast-high', 'light'],
    ['notification-success', 'light'],
    ['notification-warning', 'light'],
    ['notification-error', 'light'],
    ['notification-neutral', 'light'],
    ['background-surface', 'light'],
    ['background-default', 'dark'],
    ['neutral-contrast-high', 'dark'],
    ['notification-success', 'dark'],
    ['notification-warning', 'dark'],
    ['notification-error', 'dark'],
    ['notification-neutral', 'dark'],
    ['background-surface', 'dark'],
  ])('should return correct backgroundColor for color: %s, theme: %s', (color, theme) => {
    const themedColors = getThemedColors(theme);
    expect(getThemedBackgroundColor(color, themedColors)).toMatchSnapshot();
  });
});
