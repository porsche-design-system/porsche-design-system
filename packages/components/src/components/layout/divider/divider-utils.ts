import type { BreakpointCustomizable } from '../../../utils';

export const DIVIDER_COLORS = ['neutral-contrast-high', 'neutral-contrast-medium', 'neutral-contrast-low'] as const;
export type DividerColor = typeof DIVIDER_COLORS[number];

export const DIVIDER_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export type DividerOrientation = BreakpointCustomizable<typeof DIVIDER_ORIENTATIONS[number]>;
