import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TagName } from '@porsche-design-system/shared';
import type { PropMeta } from '@porsche-design-system/component-meta/src';
import ConfiguratorProps from '@/components/ConfigureProps.vue';

export type ComponentProps = {
  [propName: string]: ComponentProp;
};

type ComponentProp = PropMeta & {
  defaultValue: string | null; // Corresponds to the component default values which are not applied in the rendered markup (Used to set default values in configurator prop select)
  selectedValue?: any; // Value which will be applied to the rendered component markup
};

export const getComponentProps = (component: TagName): ComponentProps => {
  const meta = getComponentMeta(component).propsMeta!;
  const componentProps: ComponentProps = {};

  for (const [key, value] of Object.entries(meta)) {
    const convertedDefaultValue = value.defaultValue !== null ? String(value.defaultValue) : value.defaultValue; // Coverts boolean values to 'true' | 'false'
    componentProps[key] = {
      ...value,
      defaultValue: convertedDefaultValue,
      selectedValue: convertedDefaultValue, // TODO: Set selected value for required props
    };
  }

  return componentProps;
};

// All required props which don't have a default value in componentMeta must be defined a value here
const componentProps = {
  'p-link-tile': {
    href: 'https://porsche.com',
    label: 'Some label',
    description: 'Some Description',
  },
};
