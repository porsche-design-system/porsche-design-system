import { getBackgroundColor } from './../../src/utils/stackblitz/openInStackBlitz';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import type { Theme, ColorScheme } from './../../src/models/index';

describe('getBackgroundColor()', () => {
  it.each<[Theme, ColorScheme, string]>([
    ['light', 'default', themeLight.background.base],
    ['light', 'surface', themeLight.background.surface],
    ['dark', 'default', themeDark.background.base],
    ['dark', 'surface', themeDark.background.surface],
  ])('should for Theme: %s, colorScheme: %s return %s', (theme, colorScheme, expected) => {
    expect(getBackgroundColor(theme, colorScheme)).toBe(expected);
  });
});
