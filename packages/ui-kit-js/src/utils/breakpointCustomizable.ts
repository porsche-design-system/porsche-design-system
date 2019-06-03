import { prefix } from "./prefix";

export type BreakpointCustomizable<T> = T | BreakpointValues<T>;

export interface BreakpointValues<T> {
  base: T;
  xs?: T;
  s?: T;
  m?: T;
  l?: T;
  xl?: T;
}

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

  if (typeof prop === "number" || typeof prop === "string") {
    classes[prefix(`${className}-${prop}`)] = prop !== undefined && prop !== null;
  } else if (typeof prop === "boolean") {
    classes[prefix(`${className}${modTrue}`)] = prop === true;
    classes[prefix(`${className}${modFalse}`)] = prop === false;
  } else {
    Object.keys(prop).forEach((key) => {
      const value: any = (prop as any)[key];

      if (key === "base") {
        classes = {
          ...classes,
          ...{
            [prefix(`${className}-${value}`)]: typeof value !== "boolean" && value !== undefined && value !== null
          },
          ...{ [prefix(`${className}${modTrue}`)]: value === true },
          ...{ [prefix(`${className}${modFalse}`)]: value === false }
        };
      } else {
        classes = {
          ...classes,
          ...{
            [prefix(`${className}-${value}-${key}`)]:
              typeof value !== "boolean" && value !== undefined && value !== null
          },
          ...{ [prefix(`${className}${modTrue}-${key}`)]: value === true },
          ...{ [prefix(`${className}${modFalse}-${key}`)]: value === false }
        };
      }
    });
  }

  return classes;
}
