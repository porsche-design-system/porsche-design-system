import { prefix } from './prefix';

/* eslint-disable no-shadow */
enum Breakpoint {
  base = 'base',
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl'
}

type BreakpointValue = string | number | boolean;
type JSON5String = string;
type ClassSuffixes = [string, string];

interface JSXClasses {
  [className: string]: boolean;
}

interface BreakpointValues<T> {
  [Breakpoint.base]: T;
  [Breakpoint.xs]?: T;
  [Breakpoint.s]?: T;
  [Breakpoint.m]?: T;
  [Breakpoint.l]?: T;
  [Breakpoint.xl]?: T;
}

export type BreakpointCustomizable<T> = T | BreakpointValues<T> | JSON5String;

/* eslint-disable @typescript-eslint/indent */
const parseJSON = (
  prop: BreakpointCustomizable<BreakpointValue>
): BreakpointValues<BreakpointValue> | BreakpointValue => {
  if (typeof prop === 'string') {
    try {
      // prop is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }" or "true" or "false"
      return JSON.parse(
        prop
          .replace(/'/g, '"') // convert single quotes to double quotes
          .replace(/[\s"]*([\w\d]*)[\s"]?:/g, '"$1":') // wrap keys in double quotes if they don't have them
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
  classSuffixes: ClassSuffixes
): JSXClasses => ({
  ...(value !== null &&
    value !== undefined && {
      [prefix(`${classPrefix}-${getClassName(value, classSuffixes)}${getBreakpointSuffix(breakpoint)}`)]: true
    })
});

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
  classSuffixes?: ClassSuffixes
): JSXClasses => {
  const parsedProp = parseJSON(prop);

  return typeof parsedProp === 'object'
    ? Object.entries(parsedProp).reduce(
        (classes, [breakpoint, value]) => ({
          ...classes,
          ...createClass(classPrefix, value, breakpoint as Breakpoint, classSuffixes)
        }),
        {}
      )
    : createClass(classPrefix, parsedProp, Breakpoint.base, classSuffixes);
};
