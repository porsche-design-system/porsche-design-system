import type { BreakpointCustomizable } from '../../types';

export const ALIGN_LABELS = ['left', 'right'] as const;
export type AlignLabelType = typeof ALIGN_LABELS[number];
export type AlignLabel = BreakpointCustomizable<AlignLabelType>;
