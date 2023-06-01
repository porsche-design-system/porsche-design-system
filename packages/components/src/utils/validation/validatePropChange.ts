import { deepEqual } from '../jss';

export const validatePropChange = (newVal, oldVal, propertyName, arrayOfRelevantPropNames): boolean =>
  !(arrayOfRelevantPropNames.includes(propertyName) && deepEqual(newVal, oldVal));
