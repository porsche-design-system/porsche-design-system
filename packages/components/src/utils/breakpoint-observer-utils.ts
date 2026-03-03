import { type Breakpoint, breakpoint, breakpoints } from '@porsche-design-system/emotion';
import type { BreakpointCustomizable } from './breakpoint-customizable';
import { mediaQueryLists } from './breakpoint-observer';

export const flippedBreakpoint = Object.entries(breakpoint).reduce(
  (result, [key, val]) => ({ ...result, [`${val}px`]: key }),
  {} as Record<string, Breakpoint>
);

export const getCurrentBreakpointKey = (): Breakpoint => {
  const lastMatchingMediaQuery = mediaQueryLists
    .filter((item) => item.matches)
    .map((item) => item.media)
    .pop();

  return flippedBreakpoint[/\d+px/.exec(lastMatchingMediaQuery)[0]] as Breakpoint;
};

export const getCurrentMatchingBreakpointValue = <T>(data: BreakpointCustomizable<T>): T => {
  if (typeof data === 'object') {
    const currentBreakpoint = internalBO.getCurrentBreakpointKey();
    const result = data[currentBreakpoint as keyof BreakpointCustomizable<T>];

    if (result) {
      return result;
    }

    const valuesArray = breakpoints.map((bp) => data[bp as keyof BreakpointCustomizable<T>]);
    // fill gaps with value from preceding breakpoint
    valuesArray.forEach((val, i, arr) => {
      if (val === undefined) {
        arr[i] = arr[i - 1];
      }
    });
    return valuesArray[breakpoints.indexOf(currentBreakpoint)];
  }

  return data as T;
};

export const internalBO = {
  getCurrentBreakpointKey,
};
