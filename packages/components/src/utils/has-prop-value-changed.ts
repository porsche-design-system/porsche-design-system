import { isObject } from './jss';

export const hasPropValueChanged = (newVal: unknown, oldVal: unknown): boolean => {
  if (typeof newVal !== 'object' || typeof oldVal !== 'object') {
    // string, boolean, number
    return newVal === oldVal;
  } else if (Array.isArray(newVal) || Array.isArray(oldVal)) {
    return (
      Array.isArray(newVal) &&
      Array.isArray(oldVal) &&
      newVal.length === oldVal.length &&
      newVal.every((item) => oldVal.includes(item)) &&
      oldVal.every((item) => newVal.includes(item))
    );
  }

  const keys1 = Object.keys(newVal);
  const keys2 = Object.keys(oldVal);

  if (keys1.length === keys2.length) {
    for (const key of keys1) {
      const val1 = newVal[key];
      const val2 = oldVal[key];
      const areObjects = isObject(val1 as Record<string, any>) && isObject(val2 as Record<string, any>);
      if ((areObjects && !hasPropValueChanged(val1, val2)) || (!areObjects && val1 !== val2)) {
        return false;
      }
    }
    return true;
  }
  return false;
};
