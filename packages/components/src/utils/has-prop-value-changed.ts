import type { ComponentShouldUpdateChanges } from '@stencil/core';

const isSameArray = (a: readonly unknown[], b: readonly unknown[]): boolean =>
  a.length === b.length && a.every((val, i) => val === b[i]);

export const hasPropValueChanged = (newVal: unknown, oldVal: unknown): boolean => {
  if (newVal === null || oldVal === null || typeof newVal !== 'object' || typeof oldVal !== 'object') {
    // primitive types
    return newVal !== oldVal;
  }
  if (Array.isArray(newVal) && Array.isArray(oldVal)) {
    // type array
    return !isSameArray(newVal, oldVal);
  }
  // type object
  // currently this does not take care of nested objects (except 1-level arrays such as aria-controls element lists)
  return !(
    Object.keys(newVal).length === Object.keys(oldVal).length &&
    Object.entries(newVal as Record<string, any>).every(([key1, val1]) => {
      const val2 = oldVal[key1 as keyof unknown];
      return val1 === val2 || (Array.isArray(val1) && Array.isArray(val2) && isSameArray(val1, val2));
    })
  );
};

// Stencil calls componentShouldUpdate once per render cycle with every prop and state that changed since the last
// render, so the component has to update as soon as one of them actually differs.
export const hasAnyPropValueChanged = (changes: ComponentShouldUpdateChanges, ignoredProps: string[] = []): boolean =>
  Object.entries(changes).some(
    ([propName, { newVal, oldVal }]) => !ignoredProps.includes(propName) && hasPropValueChanged(newVal, oldVal)
  );
