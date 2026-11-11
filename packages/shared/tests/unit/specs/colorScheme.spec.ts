import { describe, expect, it } from 'vitest';
import { COLOR_SCHEMES, colorSchemeNameMap, isColorScheme } from '../../../src/models/colorScheme';

describe('isColorScheme()', () => {
  it.each(COLOR_SCHEMES)('should accept %s', (colorScheme) => {
    expect(isColorScheme(colorScheme)).toBe(true);
  });

  it.each(['light', 'dark', 'light-dark', 'scheme-normal', 'scheme-only-dark', '', null, undefined])(
    'should reject %s',
    (value) => {
      expect(isColorScheme(value)).toBe(false);
    }
  );
});

describe('color scheme vocabulary', () => {
  it('should name every color scheme', () => {
    expect(COLOR_SCHEMES.map((colorScheme) => [colorScheme, colorSchemeNameMap[colorScheme]])).toEqual([
      ['scheme-light', 'Light'],
      ['scheme-dark', 'Dark'],
      ['scheme-light-dark', 'Light Dark'],
    ]);
  });
});
