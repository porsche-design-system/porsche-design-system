type breakpointValue = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpoint: { [key in breakpointValue]: number } = {
  xxs: 0,
  xs: 480,
  s: 760,
  m: 1000,
  l: 1300,
  xl: 1760,
  xxl: 1920,
};

export const mediaQuery = (minBreakpoint: breakpointValue | number, maxBreakpoint?: breakpointValue | number): string => {
  if (minBreakpoint && maxBreakpoint) {
    if (
      typeof minBreakpoint !== 'number' && breakpoint[minBreakpoint] &&
      typeof maxBreakpoint !== 'number' && breakpoint[maxBreakpoint]
    ) {
      return `@media (min-width: ${breakpoint[minBreakpoint]}px) and (max-width: ${breakpoint[maxBreakpoint]}px)`;
    }
    return `@media (min-width: ${minBreakpoint}px) and (max-width: ${maxBreakpoint}px)`;
  } else {
    if (typeof minBreakpoint !== 'number' && breakpoint[minBreakpoint]) {
      return `@media (min-width: ${breakpoint[minBreakpoint]}px)`;
    }
    return `@media (min-width: ${minBreakpoint}px)`;
  }
};
