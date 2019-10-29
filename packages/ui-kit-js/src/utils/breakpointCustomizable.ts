import JSON5 from 'json5';
import {prefix} from './prefix';

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

function parseJSON5(prop: BreakpointCustomizable<BreakpointValue>): BreakpointValues<BreakpointValue> | BreakpointValue {
  if (typeof prop === 'string') {
    try {
      // prop is JSON5 string, e.g. "{ base: 'block', l: 'inline' }"
      return JSON5.parse(prop) as BreakpointValues<BreakpointValue>;
    } catch (error) {
      // prop is string, e.g. "block" or "inline"
      return prop;
    }
  }
  // prop is object, e.g. { base: 'block', l: 'inline' }
  // or number, e.g. 123
  // or boolean, e.g. true
  return prop;
}

function getClassName(value: BreakpointValue, classSuffixes: ClassSuffixes): string {
  if (typeof value === 'boolean') {
    return value ? classSuffixes[0] : classSuffixes[1];
  }
  return value.toString();
}

function getBreakpointSuffix(breakpoint: Breakpoint): string {
  if (breakpoint !== 'base') {
    return `-${breakpoint}`;
  }

  return '';
}

function createClass(classPrefix: string, value: BreakpointValue, breakpoint: Breakpoint, classSuffixes: ClassSuffixes): JSXClasses {
  if (value === undefined || value === null) {
    return {};
  }

  const className = getClassName(value, classSuffixes);
  const breakpointSuffix = getBreakpointSuffix(breakpoint);

  return {
    [prefix(`${classPrefix}-${className}${breakpointSuffix}`)]: true
  };
}

/**
 *
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

  const parsedProp = parseJSON5(prop);

  if (typeof parsedProp === 'object') {
    return Object.entries(parsedProp).reduce((classes, [breakpoint, value]) => {
      return {
        ...classes,
        ...createClass(classPrefix, value, breakpoint as Breakpoint, classSuffixes)
      };
    }, {});
  }

  return createClass(classPrefix, parsedProp, Breakpoint.base, classSuffixes);
};


// TODO: can be deleted after its replaced everywhere with mapBreakpointPropToPrefixedClasses()
export function mapBreakpointPropToClasses(
  className: string,
  prop?: BreakpointCustomizable<string | number | boolean>,
  modTrue?: string,
  modFalse?: string
): any {
  if (prop === undefined) {
    return {};
  }

  let classes: any = {};

  if (typeof prop === 'number' || typeof prop === 'string') {
    classes[prefix(`${className}-${prop}`)] = prop !== undefined && prop !== null;
  } else if (typeof prop === 'boolean') {
    classes[prefix(`${className}${modTrue}`)] = prop === true;
    classes[prefix(`${className}${modFalse}`)] = prop === false;
  } else {
    Object.keys(prop).forEach((key) => {
      const value: any = (prop as any)[key];

      if (key === 'base') {
        classes = {
          ...classes,
          ...{
            [prefix(`${className}-${value}`)]: typeof value !== 'boolean' && value !== undefined && value !== null
          },
          ...{[prefix(`${className}${modTrue}`)]: value === true},
          ...{[prefix(`${className}${modFalse}`)]: value === false}
        };
      } else {
        classes = {
          ...classes,
          ...{
            [prefix(`${className}-${value}-${key}`)]:
            typeof value !== 'boolean' && value !== undefined && value !== null
          },
          ...{[prefix(`${className}${modTrue}-${key}`)]: value === true},
          ...{[prefix(`${className}${modFalse}-${key}`)]: value === false}
        };
      }
    });
  }

  return classes;
}
