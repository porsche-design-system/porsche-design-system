import { hasInvertedThemeColor, TagColor } from './tag-utils';
import type { Theme } from '../../types';

describe('hasInvertedThemeColor()', () => {
  it.each<[TagColor, Theme, boolean]>([
    ['background-surface', 'light', false],
    ['background-default', 'light', false],
    ['neutral-contrast-high', 'light', true],
    ['notification-success', 'light', false],
    ['notification-warning', 'light', false],
    ['notification-error', 'light', false],
    ['notification-information', 'light', false],
    ['background-surface', 'dark', false],
    ['background-default', 'dark', false],
    ['neutral-contrast-high', 'dark', true],
    ['notification-success', 'dark', false],
    ['notification-warning', 'dark', false],
    ['notification-error', 'dark', false],
    ['notification-information', 'dark', false],
  ])('should for color: %s and theme: %s return %s', (color, theme, expected) => {
    expect(hasInvertedThemeColor(color, theme)).toBe(expected);
  });
});
