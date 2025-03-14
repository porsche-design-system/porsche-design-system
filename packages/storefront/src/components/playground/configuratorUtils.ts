import type { PropMeta } from '@porsche-design-system/component-meta';

export const isDefaultValue = (propMeta: PropMeta, currentValue: string | boolean | undefined) => {
  if (propMeta.type === 'Theme') return false;

  const defaultValue = propMeta.defaultValue;

  if (propMeta.type === 'boolean') {
    // defaultValue can be null which is falsy and equal to default value of false
    return defaultValue ? currentValue === 'true' || currentValue : currentValue === 'false' || !currentValue;
  }

  if (defaultValue === undefined || defaultValue === null) {
    return currentValue === undefined || currentValue === 'false';
  }

  if (typeof defaultValue === 'string') {
    return defaultValue === currentValue;
  }

  if (typeof defaultValue === 'number') {
    return `${defaultValue}` === currentValue;
  }
};
