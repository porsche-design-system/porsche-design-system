import type { Breakpoint } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from './breakpoint-customizable';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import { mediaQueryLists } from './breakpoint-observer';
import { breakpoints } from '@porsche-design-system/utilities-v2';

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
    const currentBreakpoint = getCurrentBreakpointKey();

    const result = data[currentBreakpoint];
    if (result) {
      return result;
    } else {
      const valuesArray = breakpoints.map((bp) => data[bp]);
      // fill gaps with value from preceding breakpoint
      valuesArray.forEach((val, i, arr) => {
        if (val === undefined) {
          arr[i] = arr[i - 1];
        }
      });
      return valuesArray[breakpoints.indexOf(currentBreakpoint)];
    }
  } else {
    return data as T;
  }
};
