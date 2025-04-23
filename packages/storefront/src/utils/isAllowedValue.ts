import type { PropMeta } from '@porsche-design-system/component-meta';

export const isAllowedValue = (allowedValues: PropMeta['allowedValues'], value: 'number'): boolean => {
  if (Array.isArray(allowedValues) && allowedValues.includes(value)) {
    return true;
  }
  if (allowedValues === 'number' && value === 'number') {
    return true;
  }
  // TODO: Implement this function, currently not necessary since we do not allow objects properties to be configured
  if (typeof allowedValues === 'object') {
    return false;
  }
  return false;
};
