import { isDeepEqual } from '../is-deep-equal';

export const validatePropChange = (newVal, oldVal, propertyName, arrayOfRelevantPropNames): boolean =>
  !(arrayOfRelevantPropNames.includes(propertyName) && isDeepEqual(newVal, oldVal));
