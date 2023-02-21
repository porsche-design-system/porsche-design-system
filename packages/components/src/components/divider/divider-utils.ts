export const DIVIDER_COLORS_DEPRECATED = [
  'neutral-contrast-high',
  'neutral-contrast-medium',
  'neutral-contrast-low',
] as const;

export const DIVIDER_COLORS = [
  'contrast-low',
  'contrast-medium',
  'contrast-high',
  ...DIVIDER_COLORS_DEPRECATED,
] as const;
export type DividerColor = typeof DIVIDER_COLORS[number];

export const DIVIDER_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export type DividerOrientation = typeof DIVIDER_ORIENTATIONS[number];
