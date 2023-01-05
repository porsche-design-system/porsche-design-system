export type Breakpoint = 'base' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpointBase = '0px';
export const breakpointXS = '480px';
export const breakpointS = '760px';
export const breakpointM = '1000px';
export const breakpointL = '1300px';
export const breakpointXL = '1760px';
export const breakpointXXL = '1920px';

export const breakpoint: { [key in Breakpoint]: string } = {
  base: breakpointBase,
  xs: breakpointXS,
  s: breakpointS,
  m: breakpointM,
  l: breakpointL,
  xl: breakpointXL,
  xxl: breakpointXXL,
};
