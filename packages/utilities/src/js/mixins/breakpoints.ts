type breakpoints = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpointValue = {
  xxs: 0,
  xs: 480,
  s: 760,
  m: 1000,
  l: 1300,
  xl: 1760,
  xxl: 1920
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

export const mediaQuery = (minBreakpoint: breakpoints | number, maxBreakpoint?: breakpoints | number): MediaQueryList => {
  if (minBreakpoint && maxBreakpoint) {
    if (breakpointValue[minBreakpoint] && breakpointValue[maxBreakpoint]) {
      return window.matchMedia(`(min-width: ${breakpointValue[minBreakpoint]}px) and (max-width: ${breakpointValue[maxBreakpoint]}px)`);
    }
    return window.matchMedia(`(min-width: ${minBreakpoint}px) and (max-width: ${maxBreakpoint}px)`);
  } else if (minBreakpoint) {
    if (breakpointValue[minBreakpoint]) {
      return window.matchMedia(`(min-width: ${breakpointValue[minBreakpoint]}px)`);
    }
    return window.matchMedia(`(min-width: ${minBreakpoint}px)`);
  }
};


