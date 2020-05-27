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

//TODO: Implement custom breakpoints -> breakpoints as interface?
export const mediaQuery = (minBreakpoint: breakpoints, maxBreakpoint?: breakpoints): string => {
  if (minBreakpoint && maxBreakpoint) {
    if (breakpointValue[minBreakpoint] && breakpointValue[maxBreakpoint]) {
      return `@media (min-width: ${breakpointValue[minBreakpoint]}px) and (max-width: ${breakpointValue[maxBreakpoint]}px)`;
    }
    return `@media (min-width: ${minBreakpoint}px) and (max-width: ${maxBreakpoint}px)`;
  } else {
    if (breakpointValue[minBreakpoint]) {
      return `@media (min-width: ${breakpointValue[minBreakpoint]}px)`;
    }
    return `@media (min-width: ${minBreakpoint}px)`;
  }
};


