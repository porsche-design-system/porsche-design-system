import type { Breakpoint } from './mediaQueryShared';
import { breakpointUnitlessBase } from './breakpointUnitlessBase';
import { breakpointUnitlessXS } from './breakpointUnitlessXS';
import { breakpointUnitlessS } from './breakpointUnitlessS';
import { breakpointUnitlessM } from './breakpointUnitlessM';
import { breakpointUnitlessL } from './breakpointUnitlessL';
import { breakpointUnitlessXL } from './breakpointUnitlessXL';
import { breakpointUnitlessXXL } from './breakpointUnitlessXXL';

export const breakpointUnitless: { [key in Breakpoint]: number } = {
  base: breakpointUnitlessBase,
  xs: breakpointUnitlessXS,
  s: breakpointUnitlessS,
  m: breakpointUnitlessM,
  l: breakpointUnitlessL,
  xl: breakpointUnitlessXL,
  xxl: breakpointUnitlessXXL,
};
