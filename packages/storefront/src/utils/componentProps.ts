import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TagName } from '@porsche-design-system/shared';
import type { PropMeta } from '@porsche-design-system/component-meta/src';

export type ConfiguratorProp = PropMeta & {
  defaultValue: string | null;
};

export const getComponentProps = (component: TagName): ConfiguratorProp => {
  const meta = getComponentMeta(component).propsMeta!;

  for (const [key, value] of Object.entries(meta)) {
    meta[key] = {
      ...value,
      defaultValue: value.defaultValue !== null ? String(value.defaultValue) : value.defaultValue,
    };
  }

  return meta;
};

// All required props which don't have a default value in componentMeta must be defined a value here
const componentProps = {
  'p-link-tile': {
    href: 'https://porsche.com',
    label: 'Some label',
    description: 'Some Description',
  },
};
