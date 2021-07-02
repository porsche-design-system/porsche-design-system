export type Breakpoint = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpoint: { [key in Breakpoint]: number } = {
  xxs: 0,
  xs: 480,
  s: 760,
  m: 1000,
  l: 1300,
  xl: 1760,
  xxl: 1920,
};

type BreakpointOrNumber = Breakpoint | number;

// TODO: provide more performant version without all the checks to be used internally (especially in JSS)?
export const mediaQuery = (minBreakpoint: BreakpointOrNumber, maxBreakpoint?: BreakpointOrNumber): string =>
  `@media (min-width: ${(typeof minBreakpoint !== 'number' && breakpoint[minBreakpoint]) || minBreakpoint}px)${
    maxBreakpoint
      ? ` and (max-width: ${(typeof maxBreakpoint !== 'number' && breakpoint[maxBreakpoint]) || maxBreakpoint}px)`
      : ''
  }`;
