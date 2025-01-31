import type { PropMeta } from '@porsche-design-system/component-meta';

export const isDefaultValue = (propMeta: PropMeta | undefined, currentValue: string | undefined) => {
  if (propMeta?.type === 'Theme') return false;

  const defaultValue = propMeta?.defaultValue;

  if (defaultValue === undefined || defaultValue === null) {
    return currentValue === undefined || currentValue === 'false';
  }

  if (typeof defaultValue === 'string') {
    return defaultValue === currentValue;
  }

  if (typeof defaultValue === 'number') {
    return `${defaultValue}` === currentValue;
  }

  if (typeof defaultValue === 'boolean') {
    return defaultValue ? currentValue === 'true' : currentValue === 'false';
  }
};
