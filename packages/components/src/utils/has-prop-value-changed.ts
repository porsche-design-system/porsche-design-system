export const hasPropValueChanged = (newVal: unknown, oldVal: unknown): boolean => {
  if (typeof newVal !== 'object' || typeof oldVal !== 'object') {
    // primitive types
    return newVal !== oldVal;
  } else if (Array.isArray(newVal) && Array.isArray(oldVal)) {
    // type array
    return !(newVal.length === oldVal.length && newVal.sort().every((val, i) => val === oldVal.sort()[i]));
  } else {
    // type object
    // currently this does not take care of nested objects
    const keys1 = Object.keys(newVal);
    const keys2 = Object.keys(oldVal);

    if (keys1.length === keys2.length) {
      return Object.entries(newVal as Record<string, any>).every(([key1, val1]) => val1 !== oldVal[key1]);
    } else {
      return true;
    }
  }
};
