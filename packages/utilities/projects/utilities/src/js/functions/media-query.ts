type BreakPoint = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpoint: { [key in BreakPoint]: number } = {
  xxs: 0,
  xs: 480,
  s: 760,
  m: 1000,
  l: 1300,
  xl: 1760,
  xxl: 1920
};

type BreakPointOrNumber = BreakPoint | number;

export const mediaQuery = (minBreakpoint: BreakPointOrNumber, maxBreakpoint?: BreakPointOrNumber): string =>
  `@media (min-width: ${(typeof minBreakpoint !== 'number' && breakpoint[minBreakpoint]) ?? minBreakpoint}px)${
    maxBreakpoint
      ? `and (max-width: ${(typeof maxBreakpoint !== 'number' && breakpoint[maxBreakpoint]) ?? maxBreakpoint}px)`
      : ''
  }`;
