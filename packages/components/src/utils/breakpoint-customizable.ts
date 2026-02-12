import type { Breakpoint } from '@porsche-design-system/emotion';

export type BreakpointValues<T> = {
  [key in Breakpoint]?: T;
} & {
  base: T;
};

// string is needed in order to pass and parse objects via prop decorator
export type BreakpointCustomizable<T> = T | BreakpointValues<T> | string;

export type BreakpointValue = string | number | boolean;

export const parseJSON = (
  prop: BreakpointCustomizable<BreakpointValue>
): BreakpointValues<BreakpointValue> | BreakpointValue => {
  if (typeof prop === 'string') {
    try {
      // prop is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }" or "true" or "false"
      return JSON.parse(
        prop
          .replace(/'/g, '"') // convert single quotes to double quotes
          .replace(/[\s"]?([a-z]+)[\s"]?:([^//])/g, '"$1":$2') // wrap keys in double quotes if they don't have them but ignore potential urls
      );
    } catch {
      // prop is string, e.g. "block" or "inline"
      return prop;
    }
  } else {
    // prop is object, e.g. { base: 'block', l: 'inline' } or number, e.g. 123 or boolean, e.g. true
    return prop;
  }
};
