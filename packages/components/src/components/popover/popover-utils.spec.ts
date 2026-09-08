import { vi } from 'vitest';
import { getPopoverBorderRadius } from './popover-utils';

describe('getPopoverBorderRadius()', () => {
  const popover = document.createElement('div');

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ['12px', 12], // non-compact radiusXl
    ['8px', 8], // compact radiusLg
    ['20px', 20], // custom via --p-popover-radius
    ['1.5px', 1.5], // fractional value
  ])('should return %s as %i', (borderRadius, expected) => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({ borderRadius } as CSSStyleDeclaration);

    expect(getPopoverBorderRadius(popover)).toBe(expected);
  });

  it.each(['', 'unset', undefined])('should return fallback when border-radius is "%s"', (borderRadius) => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({ borderRadius } as CSSStyleDeclaration);

    expect(getPopoverBorderRadius(popover)).toBe(12);
  });
});


