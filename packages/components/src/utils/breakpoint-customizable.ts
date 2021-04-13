import { prefix } from './prefix';

export const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl'] as const;
export type Breakpoint = typeof BREAKPOINTS[number];
export type BreakpointValues<T> = {
  [key in Breakpoint]?: T;
} & {
  base: T;
};

// string is needed in order to pass and parse objects via prop decorator
export type BreakpointCustomizable<T> = T | BreakpointValues<T> | string;

type BreakpointValue = string | number | boolean; // TODO: replace with generic T
type ClassSuffixes = [string, string];

type JSXClasses = {
  [className: string]: boolean;
};

/* eslint-disable @typescript-eslint/indent */
export const parseJSON = (
  prop: BreakpointCustomizable<BreakpointValue>
): BreakpointValues<BreakpointValue> | BreakpointValue => {
  if (typeof prop === 'string') {
    try {
      // prop is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }" or "true" or "false"
      return JSON.parse(
        prop
          .replace(/'/g, '"') // convert single quotes to double quotes
          .replace(/[\s"]*([\w]*)[\s"]?:/g, '"$1":') // wrap keys in double quotes if they don't have them
      );
    } catch (e) {
      // prop is string, e.g. "block" or "inline"
      return prop;
    }
  } else {
    // prop is object, e.g. { base: 'block', l: 'inline' } or number, e.g. 123 or boolean, e.g. true
    return prop;
  }
};

const getClassName = (value: BreakpointValue, classSuffixes: ClassSuffixes): string =>
  typeof value === 'boolean' ? classSuffixes[value ? 0 : 1] : value.toString();

const getBreakpointSuffix = (breakpoint: Breakpoint): string => (breakpoint !== 'base' ? `-${breakpoint}` : '');

const createClass = (
  classPrefix: string,
  value: BreakpointValue,
  breakpoint: Breakpoint,
  classSuffixes: ClassSuffixes,
  disablePrefixP?: boolean
): JSXClasses => {
  if (value !== null && value !== undefined) {
    const className = `${classPrefix}-${getClassName(value, classSuffixes)}${getBreakpointSuffix(breakpoint)}`;
    return {
      [disablePrefixP ? className : prefix(className)]: true,
    };
  }
};

/**
 * @param classPrefix
 * @param prop
 * @param classSuffixes
 *  First value in array is used for true boolean values, second for false.
 *  It's only used when prop is a boolean or prop is a object/JSON5 that contains a boolean.
 */
export const mapBreakpointPropToPrefixedClasses = (
  classPrefix: string,
  prop: BreakpointCustomizable<BreakpointValue>,
  classSuffixes?: ClassSuffixes,
  disablePrefixP?: boolean
): JSXClasses => {
  const parsedProp = parseJSON(prop);

  return typeof parsedProp === 'object'
    ? Object.entries(parsedProp).reduce(
        (classes, [breakpoint, value]) => ({
          ...classes,
          ...createClass(classPrefix, value, breakpoint as Breakpoint, classSuffixes, disablePrefixP),
        }),
        {}
      )
    : createClass(classPrefix, parsedProp, 'base', classSuffixes, disablePrefixP);
};
