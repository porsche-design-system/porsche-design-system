import type { PropMeta } from '@porsche-design-system/component-meta';

export const isDefaultValue = (defaultValue: PropMeta['defaultValue'] | undefined, currentValue: string) => {
  if (defaultValue === undefined) return false;

  if (typeof defaultValue === 'string') {
    return defaultValue === currentValue;
  }

  if (typeof defaultValue === 'boolean') {
    return defaultValue ? currentValue === 'true' : currentValue === 'false';
  }
};
