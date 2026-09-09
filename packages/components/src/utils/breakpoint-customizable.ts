import type { Breakpoint } from '@porsche-design-system/emotion';

export type BreakpointValues<T> = {
  [key in Breakpoint]?: T;
} & {
  base: T;
};

// string is needed in order to pass and parse objects via prop decorator
// TODO: [v5] drop the string member by allowing objects via property only, see #4708
export type BreakpointCustomizable<T> = T | BreakpointValues<T> | string;

export type BreakpointValue = string | number | boolean;

const parse = (prop: BreakpointCustomizable<BreakpointValue>): BreakpointValues<BreakpointValue> | BreakpointValue => {
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

// boolean props have to be parsed via parseJSONBoolean(), therefore the parameter type excludes them to make it
// impossible to lose the HTML boolean attribute shorthand by accident
export const parseJSON = (
  prop: BreakpointCustomizable<string | number>
): BreakpointValues<BreakpointValue> | BreakpointValue => parse(prop);

export const parseJSONBoolean = (prop: BreakpointCustomizable<boolean>): BreakpointValues<boolean> | boolean =>
  // prop is an HTML boolean attribute used without a value, e.g. <p-input-text hide-label>
  // Stencil resolves BreakpointCustomizable<T> to "any" and therefore skips its own boolean coercion
  // TODO: [v5] obsolete once objects can only be set via property, since Stencil coerces booleans itself then, see #4708
  (prop === '' ? true : parse(prop)) as BreakpointValues<boolean> | boolean;

// a BreakpointCustomizable value can be true for certain breakpoints only, e.g. { base: false, l: true },
// therefore styles which are needed as soon as it is true anywhere have to be determined like this
export const isTruthyForAnyBreakpoint = (prop: BreakpointCustomizable<boolean>): boolean => {
  const value = parseJSONBoolean(prop);
  return typeof value === 'object' ? Object.values(value).some(Boolean) : !!value;
};
