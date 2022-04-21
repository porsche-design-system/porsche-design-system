import type { BreakpointCustomizable } from '../breakpoint-customizable';
import type { TextSize } from '../../types';

export const isSizeInherit = (size: BreakpointCustomizable<TextSize>): boolean => {
  return JSON.stringify(size).includes('inherit');
};
