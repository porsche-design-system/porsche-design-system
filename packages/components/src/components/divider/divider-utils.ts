export const DIVIDER_COLORS = ['contrast-lower', 'contrast-low', 'contrast-medium', 'contrast-high'] as const;
export type DividerColor = (typeof DIVIDER_COLORS)[number];

export const DIVIDER_DIRECTIONS = ['vertical', 'horizontal'] as const;
export type DividerDirection = (typeof DIVIDER_DIRECTIONS)[number];
