import { BreakpointCustomizable } from '../../../../utils';

export const TEXT_SIZES = ['x-small', 'small', 'medium', 'large', 'x-large', 'inherit'] as const;

export type TextSize = typeof TEXT_SIZES[number];

export const isSizeInherit = (size: BreakpointCustomizable<TextSize>): boolean =>
  JSON.stringify(size).includes('inherit');
