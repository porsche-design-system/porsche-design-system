import { hasInvertedThemeColor, TagStatusColor } from './tag-status-utils';
import { Theme } from '../../../../types';

describe('hasInvertedThemeColor()', () => {
  it.each<[TagStatusColor, Theme, boolean]>([
    ['background-surface', 'light', false],
    ['background-default', 'light', false],
    ['neutral-contrast-high', 'light', true],
    ['notification-success', 'light', false],
    ['notification-warning', 'light', false],
    ['notification-error', 'light', false],
    ['notification-neutral', 'light', false],
    ['background-surface', 'dark', false],
    ['background-default', 'dark', false],
    ['neutral-contrast-high', 'dark', true],
    ['notification-success', 'dark', true],
    ['notification-warning', 'dark', true],
    ['notification-error', 'dark', true],
    ['notification-neutral', 'dark', true],
  ])('should for color: %s and theme: %s return %s', (color, theme, expected) => {
    expect(hasInvertedThemeColor(color, theme)).toBe(expected);
  });
});
