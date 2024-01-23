import { parseJSONAttribute } from './json';

export const translate = <T extends Record<string, string>>(
  propValues: T | string,
  fallbackValues: T,
  key: keyof T,
  value?: string | number
): string => {
  const wording = (parseJSONAttribute(propValues) || fallbackValues)[key];
  return value !== null && value !== undefined ? wording.replace(/\{\{value}}/, `${value}`) : wording;
};
