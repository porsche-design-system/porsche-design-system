export const DIVIDER_COLORS = [
  'neutral-contrast-high', // deprecated
  'neutral-contrast-medium', // deprecated
  'neutral-contrast-low', // deprecated
  'contrast-low',
  'contrast-medium',
  'contrast-high',
] as const;
export type DividerColor = typeof DIVIDER_COLORS[number];

export const DIVIDER_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export type DividerOrientation = typeof DIVIDER_ORIENTATIONS[number];
