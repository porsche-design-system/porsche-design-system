export const hasPropValueChanged = (newVal: unknown, oldVal: unknown): boolean => {
  if (typeof newVal !== 'object' || typeof oldVal !== 'object') {
    // primitive types
    return newVal !== oldVal;
  } else if (Array.isArray(newVal) && Array.isArray(oldVal)) {
    // type array
    return !(newVal.length === oldVal.length && newVal.every((val, i) => val === oldVal[i]));
  } else {
    // type object
    // currently this does not take care of nested objects
    return !(
      Object.keys(newVal).length === Object.keys(oldVal).length &&
      Object.entries(newVal as Record<string, any>).every(([key1, val1]) => val1 === oldVal[key1])
    );
  }
};
