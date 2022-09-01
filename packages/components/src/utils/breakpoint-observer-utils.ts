import type { Breakpoint } from '@porsche-design-system/utilities-v2';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import { mediaQueryLists } from './breakpoint-observer';
import type { BreakpointCustomizable, BreakpointKey } from './breakpoint-customizable';
import { BREAKPOINTS } from './breakpoint-customizable';

export const flippedBreakpoint = Object.entries(breakpoint).reduce(
  (result, [key, val]) => ({ ...result, [val]: key }),
  {} as Record<string, Breakpoint>
);

export const getCurrentBreakpointKey = (): BreakpointKey => {
  const lastMatchingMediaQuery = mediaQueryLists
    .filter((item) => item.matches)
    .map((item) => item.media)
    .pop();

  const matchingBreakpoint = flippedBreakpoint[/\d+px/.exec(lastMatchingMediaQuery)[0]];
  return matchingBreakpoint === 'xxs' ? 'base' : (matchingBreakpoint as BreakpointKey);
};

export const getCurrentMatchingBreakpointValue = <T>(data: BreakpointCustomizable<T>): T => {
  if (typeof data === 'object') {
    const currentBreakpoint = getCurrentBreakpointKey();

    const result = data[currentBreakpoint];
    if (result) {
      return result;
    } else {
      const valuesArray = BREAKPOINTS.map((bp) => data[bp]);
      // fill gaps with value from preceding breakpoint
      valuesArray.forEach((val, i, arr) => {
        if (val === undefined) {
          arr[i] = arr[i - 1];
        }
      });
      return valuesArray[BREAKPOINTS.indexOf(currentBreakpoint)];
    }
  } else {
    return data as T;
  }
};
