import { isObject } from './jss';

export const isDeepEqual = <T extends Record<string, any>>(object1: T, object2: T): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length === keys2.length) {
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if ((areObjects && !isDeepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
        return false;
      }
    }
    return true;
  }
  return true;
};
