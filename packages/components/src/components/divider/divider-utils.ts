/** @deprecated */
export const DIVIDER_COLORS_DEPRECATED = [
  'neutral-contrast-high',
  'neutral-contrast-medium',
  'neutral-contrast-low',
] as const;
/** @deprecated */
export type DividerColorDeprecated = typeof DIVIDER_COLORS_DEPRECATED[number];
export const DIVIDER_COLORS = [
  'contrast-low',
  'contrast-medium',
  'contrast-high',
  ...DIVIDER_COLORS_DEPRECATED,
] as const;
export type DividerColor = typeof DIVIDER_COLORS[number];

export const DIVIDER_DIRECTIONS = ['vertical', 'horizontal'] as const;
export type DividerDirection = typeof DIVIDER_DIRECTIONS[number];
