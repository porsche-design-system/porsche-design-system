import { TagColor } from './tag-utils';
import { Theme } from '../../utils/theme';
import { getThemedColors } from '../../styles';
import { getThemedBackgroundColor } from './tag-shared-utils';

describe('getThemedBackgroundColor()', () => {
  it.each<[TagColor, Theme]>([
    ['background-default', 'light'], // 'background-default' is deprecated (replaced with 'background-base')
    ['background-base', 'light'],
    ['neutral-contrast-high', 'light'], // 'neutral-contrast-high' is deprecated (replaced with 'primary')
    ['primary', 'light'],
    ['notification-success', 'light'],
    ['notification-warning', 'light'],
    ['notification-error', 'light'],
    ['notification-neutral', 'light'], // 'notification-neutral' is deprecated (replaced with 'notification-info')
    ['notification-info', 'light'],
    ['background-surface', 'light'],
    ['background-default', 'dark'], // 'background-default' is deprecated (replaced with 'background-base')
    ['background-base', 'dark'],
    ['neutral-contrast-high', 'dark'], // 'neutral-contrast-high' is deprecated (replaced with 'primary')
    ['primary', 'dark'],
    ['notification-success', 'dark'],
    ['notification-warning', 'dark'],
    ['notification-error', 'dark'],
    ['notification-neutral', 'dark'], // 'notification-neutral' is deprecated (replaced with 'notification-info')
    ['notification-info', 'dark'],
    ['background-surface', 'dark'],
  ])('should return correct backgroundColor for color: %s, theme: %s', (color, theme) => {
    const themedColors = getThemedColors(theme);
    expect(getThemedBackgroundColor(color, themedColors)).toMatchSnapshot();
  });
});
