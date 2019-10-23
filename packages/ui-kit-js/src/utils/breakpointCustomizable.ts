import JSON5 from 'json5';
import { prefix } from './prefix';

export type BreakpointCustomizable<T> = T | BreakpointValues<T> | string;
export interface BreakpointValues<T> {
  base: T;
  xs?: T;
  s?: T;
  m?: T;
  l?: T;
  xl?: T;
}
type BreakpointValue2 = string | number | boolean;
type BreakpointValues2 = BreakpointValues<BreakpointValue2>;

function parseBreakpointProp(prop: BreakpointValues2 | BreakpointValue2): BreakpointValues2 | BreakpointValue2 {
  if (typeof prop === 'string') {
    try {
      // prop is JSON5 string, e.g. "{ base: 'block', l: 'inline' }"
      return JSON5.parse(prop) as BreakpointValues2;
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

export const mapBreakpointPropToPrefixedClasses = (
  className: string,
  prop?: BreakpointCustomizable<string | number | boolean>,
  modTrue?: string,
  modFalse?: string
): {[cssClass: string]: boolean} => {

  prop = parseBreakpointProp(prop as BreakpointValues2 | string);

  if (prop === undefined) {
    return {};
  }

  let classes: any = {};

  if (typeof prop === 'number' || typeof prop === 'string') {
    classes[prefix(`${className}-${prop}`)] = true;
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
          ...{ [prefix(`${className}${modTrue}`)]: value === true },
          ...{ [prefix(`${className}${modFalse}`)]: value === false }
        };
      } else {
        classes = {
          ...classes,
          ...{
            [prefix(`${className}-${value}-${key}`)]:
            typeof value !== 'boolean' && value !== undefined && value !== null
          },
          ...{ [prefix(`${className}${modTrue}-${key}`)]: value === true },
          ...{ [prefix(`${className}${modFalse}-${key}`)]: value === false }
        };
      }
    });
  }

  return classes;
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
          ...{ [prefix(`${className}${modTrue}`)]: value === true },
          ...{ [prefix(`${className}${modFalse}`)]: value === false }
        };
      } else {
        classes = {
          ...classes,
          ...{
            [prefix(`${className}-${value}-${key}`)]:
              typeof value !== 'boolean' && value !== undefined && value !== null
          },
          ...{ [prefix(`${className}${modTrue}-${key}`)]: value === true },
          ...{ [prefix(`${className}${modFalse}-${key}`)]: value === false }
        };
      }
    });
  }

  return classes;
}
