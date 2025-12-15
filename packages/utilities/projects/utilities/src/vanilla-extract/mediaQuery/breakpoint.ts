import type { Breakpoint } from './breakpointShared';
import { breakpointBase } from './breakpointBase';
import { breakpointXS } from './breakpointXS';
import { breakpointS } from './breakpointS';
import { breakpointM } from './breakpointM';
import { breakpointL } from './breakpointL';
import { breakpointXL } from './breakpointXL';
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
