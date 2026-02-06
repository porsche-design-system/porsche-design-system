import { breakpointBase } from './breakpointBase';
import { breakpointL } from './breakpointL';
import { breakpointM } from './breakpointM';
import { breakpointS } from './breakpointS';
import type { Breakpoint } from './breakpointShared';
import { breakpointXL } from './breakpointXL';
import { breakpointXS } from './breakpointXS';
import { breakpointXXL } from './breakpointXXL';

export const breakpoint: { [key in Breakpoint]: number } = {
  base: breakpointBase,
  xs: breakpointXS,
  s: breakpointS,
  m: breakpointM,
  l: breakpointL,
  xl: breakpointXL,
  xxl: breakpointXXL,
};
