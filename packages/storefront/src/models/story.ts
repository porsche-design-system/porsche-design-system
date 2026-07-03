import type { ElementConfig, HTMLElementOrComponentProps, HTMLTagOrComponent } from '@/utils/generator/generator';

// TODO: Generic is not necessary for static stories without state
// TODO: Create type for generator result and share with ElementConfig children type.
export type Story<Tag extends HTMLTagOrComponent> = {
  name?: string;
  state?: StoryState<Tag>;
  /**
   * Slot names that are mandatory for this specific story (e.g. the trigger `button` in a controlled setup).
   * Their toggle in the "Slots" configurator is rendered active but disabled so the user cannot remove them.
   */
  requiredSlots?: string[];
  /**
   * Prop names that are not usable in this specific story (e.g. `open` in a popover's uncontrolled setup).
   * Their control in the "Properties" configurator is rendered but disabled so the user cannot change them.
   */
  disabledProps?: string[];
  generator: (state?: StoryState<Tag>) => (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
};

export type StoryState<Tag extends HTMLTagOrComponent> = {
  /**
   * Properties have to be written in jsx syntax. (class => className, style => object). Property values have to be the real value (boolean, object etc.).
   */
  properties?: HTMLElementOrComponentProps<Tag>;
  slots?: SlotState<Tag>;
};

export type SlotState<Tag extends HTMLTagOrComponent> = {
  [SlotName in keyof SlotStories<Tag>[Tag]]: Story<Tag>; // Ensures selected slot is a key in SlotVariants
};

// TODO: slotName must be typed to only allow slots of current component when PDS component is used
export type SlotStories<Tag extends HTMLTagOrComponent> = {
  [slotName: string]: {
    [storyName: string]: Story<Tag>;
  };
};
