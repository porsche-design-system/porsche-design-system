import { isObject } from './jss';

export const isDeepEqual = <T extends Record<string, any>>(newVal: T, oldVal: T): boolean => {
  if (typeof newVal !== 'object' || typeof oldVal !== 'object') {
    return false;
  }
  const keys1 = Object.keys(newVal);
  const keys2 = Object.keys(oldVal);

  if (keys1.length === keys2.length) {
    for (const key of keys1) {
      const val1 = newVal[key];
      const val2 = oldVal[key];
      const areObjects = isObject(val1) && isObject(val2);
      if ((areObjects && !isDeepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
        return false;
      }
    }
    return true;
  }
  return true;
};
