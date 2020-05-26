export type breakpoints = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpointValue:{[key in breakpoints]: number} = {
  xxs: 0,
  xs: 480,
  s: 760,
  m: 1000,
  l: 1300,
  xl: 1760,
  xxl: 1920,
};

export const breakpoint = {
  xxs: `${breakpointValue.xxs}px`,
  xs: `${breakpointValue.xs}px`,
  s: `${breakpointValue.s}px`,
  m: `${breakpointValue.m}px`,
  l: `${breakpointValue.l}px`,
  xl: `${breakpointValue.xl}px`,
  xxl: `${breakpointValue.xxl}px`
};

export const whatever = (minBreakpoint: breakpoints, maxBreakpoint: breakpoints) => {
  return `@media (min-width: ${breakpointValue[minBreakpoint]}px) and (max-width: ${breakpointValue[maxBreakpoint]}px)`
};
//TODO: like whatever! Implement CSS Types
export const mediaQuery = (minBreakpoint: breakpoints, maxBreakpoint?: breakpoints): string => {
  if (minBreakpoint && maxBreakpoint) {
    if (breakpointValue[minBreakpoint] && breakpointValue[maxBreakpoint]) {
      return `@media (min-width: ${breakpointValue[minBreakpoint]}px) and (max-width: ${breakpointValue[maxBreakpoint]}px)`;
    }
    return `@media (min-width: ${minBreakpoint}px) and (max-width: ${maxBreakpoint}px)`;
  } else if (minBreakpoint) {
    if (breakpointValue[minBreakpoint]) {
      return `@media (min-width: ${breakpointValue[minBreakpoint]}px)`;
    }
    return `@media (min-width: ${minBreakpoint}px)`;
  }
};


