import { parseJSONAttribute } from './json';

export const translate = <T extends Record<string, string>>(
  key: keyof T,
  propValues: T | string, // string to support json like string values via attributes
  fallbackValues: T,
  value?: string | number
): string => {
  const wording = (parseJSONAttribute(propValues) || fallbackValues)[key];
  return value !== null && value !== undefined ? wording.replace(/\{\{value}}/, `${value}`) : wording;
};
