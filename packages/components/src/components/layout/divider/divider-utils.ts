import type { BreakpointCustomizable } from '../../../types';

export const DIVIDER_COLORS = ['neutral-contrast-high', 'neutral-contrast-medium', 'neutral-contrast-low'] as const;
export type DividerColor = typeof DIVIDER_COLORS[number];

export const DIVIDER_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export type DividerOrientationType = typeof DIVIDER_ORIENTATIONS[number];
export type DividerOrientation = BreakpointCustomizable<DividerOrientationType>;
