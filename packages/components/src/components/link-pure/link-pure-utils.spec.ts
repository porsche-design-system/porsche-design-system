import { LINK_PURE_COLORS, LINK_PURE_SIZES, LINK_PURE_SIZES_DEPRECATED } from './link-pure-utils';

describe('LINK_PURE_SIZES_DEPRECATED', () => {
  it('should list deprecated size values', () => {
    expect(LINK_PURE_SIZES_DEPRECATED).toStrictEqual(['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large']);
  });
});

describe('LINK_PURE_SIZES', () => {
  it('should append the deprecated sizes after the current ones', () => {
    const current = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'inherit'] as const;
    expect(LINK_PURE_SIZES).toStrictEqual([...current, ...LINK_PURE_SIZES_DEPRECATED]);
  });
});

describe('LINK_PURE_COLORS', () => {
  it('should list supported color values', () => {
    expect(LINK_PURE_COLORS).toStrictEqual([
      'primary',
      'contrast-higher',
      'contrast-high',
      'contrast-medium',
      'inherit',
    ]);
  });
});
