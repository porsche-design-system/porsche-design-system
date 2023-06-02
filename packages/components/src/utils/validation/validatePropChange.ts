import { isDeepEqual } from '../is-deep-equal';

export const validatePropChange = (
  newVal: unknown,
  oldVal: unknown,
  propertyName: string,
  arrayOfRelevantPropNames: string[]
): boolean => !(arrayOfRelevantPropNames.includes(propertyName) && isDeepEqual(newVal, oldVal));
