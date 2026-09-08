import { SPINNER_ARIA_ATTRIBUTES, SPINNER_COLORS, SPINNER_SIZES, SPINNER_SIZES_DEPRECATED } from './spinner-utils';

describe('SPINNER_COLORS', () => {
  it('should list supported color values', () => {
    expect(SPINNER_COLORS).toStrictEqual(['primary', 'inherit']);
  });
});

describe('SPINNER_SIZES_DEPRECATED', () => {
  it('should list deprecated size values', () => {
    expect(SPINNER_SIZES_DEPRECATED).toStrictEqual(['small', 'medium', 'large']);
  });
});

describe('SPINNER_SIZES', () => {
  it('should append the deprecated sizes after the current ones', () => {
    const current = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'inherit'] as const;
    expect(SPINNER_SIZES).toStrictEqual([...current, ...SPINNER_SIZES_DEPRECATED]);
  });
});

describe('SPINNER_ARIA_ATTRIBUTES', () => {
  it('should list supported aria attributes', () => {
    expect(SPINNER_ARIA_ATTRIBUTES).toStrictEqual(['aria-label']);
  });
});
