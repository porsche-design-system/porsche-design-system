import type { PropMeta } from '@porsche-design-system/component-meta';

export const isDefaultValue = (
  defaultValue: PropMeta['defaultValue'] | undefined,
  currentValue: string | undefined
) => {
  if (defaultValue === undefined) {
    return currentValue === undefined;
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
