import { breakpoint2Xl } from './breakpoint2Xl';
import { breakpointLg } from './breakpointLg';
import { breakpointMd } from './breakpointMd';
import type { Breakpoint } from './breakpointShared';
import { breakpointSm } from './breakpointSm';
import { breakpointXl } from './breakpointXl';
import { breakpointXs } from './breakpointXs';
import { breakpointBase } from './deprecated/breakpointBase';

/** @deprecated since v4.0.0, will be removed with next major release. Use xs | sm | md | lg | xl | 2xl instead. */
const breakpointLegacy = {
  base: breakpointBase,
  s: breakpointSm,
  m: breakpointMd,
  l: breakpointLg,
  xxl: breakpoint2Xl,
} as const;

export const breakpoint: { [key in Breakpoint]: number } = {
  xs: breakpointXs,
  sm: breakpointSm,
  md: breakpointMd,
  lg: breakpointLg,
  xl: breakpointXl,
  '2xl': breakpoint2Xl,
  ...breakpointLegacy,
};
