import type {
  ElementConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/components/playground/ConfiguratorControls';

/**
 * Questions:
 * x - How to deal with string values which have a default value? p-checkbox value default is "on". Text-field prop is not only deleted onBlur.
 * x - How to deal with mix of options and string? p-crest "allowedValues": ["_self", "_blank", "_parent", "_top", "string"] - Remove "string" from options
 * How to specify which slot/prop is shown/rendered in the markup? Currently all slots have to be specified in the story.
 * Add story information to componentMeta directly?
 * How to deal with href vs slotted anchor (slotsMeta already has hasAltProp but only for named slots )? p-popover description/default
 * ButtonGroup/LinkTileModelSignature has breakpoint customizable as default value. Currently not shown in the select of direction.
 * Some edge cases like p-carousel slidesPerPages which is type number | 'auto'
 * How to deal with aria attributes? Currently not shown in the configurator ('p-icon'). Shown for ('p-spinner') .
 *
 * Model Signature size inherit?
 * How to handle styles in examples? style tag currently works. Inline style is missing conversion react/vanilla.js. Tailwind would be also an option. Currently affecting p-carousel, p-radio-button-wrapper (Missing spacing)
 * How to render allowedValues ['string' | 'number'] like in p-segmented-control? Currently textfield since string can be any value.
 * How to deal with relations? e.g. p-text-field-wrapper needs input with type number when unit is used => Make stories function which gets the current state and returns the correct story
 * How to show undefined default value in select props?
 * Required * is shown at the end of the label and the reset button?
 *
 * When changing controlled props they won't be reflected on the markup in vanilla-js, is this confusing?
 *
 * TODO:
 * - [ ] - Dynamic import of React Component in Configurator
 * - [x] - Render Example
 * - [x] - Render markup
 * - [x] - Sync Playground Theme
 * - [x] - Sync Playground Dir
 * - [x] - Show if prop is default in select & select default
 * - [x] - AllowedValue string[] - select
 * - [x] - AllowedValue string - text input
 * - [x] - Show string attribute if configured in example in text field
 * - [x] - AllowedValue boolean - select (true/false)
 * - [x] - string[] - Remove prop from markup if its default
 * - [x] - string - Remove prop from markup if its default or empty string
 * - [x] - boolean - Remove prop from markup if its default
 * - [x] - filter deprecated props
 * - [x] - filter deprecated prop values (deprecatedValues)
 * - [x] - split element config and only keep config which changes in state, render rest separately
 * - [x] - fix keys
 * - [x] - AllowedValue string with default value
 * - [x] - AllowedValue number - text field
 * - [x] - ComponentSlots checkboxes/switches
 * - [x] - syntax highlight broken for p-fieldset-wrapper, radio-button-wrapper
 * - [x] - Add breakpoint customizable icon to configurator props p-tag
 * - [ ] - type string[] - multi-select currently filtered in ComponentProps
 * - [ ] - Refactor value conversions (default value, selects...)
 * - [ ] - console error when initially loading image of p-link-tile (image is still shown)
 * - [ ] - Weird error when changing form prop of p-select to empty string => form property gets set to null. Seems to be a general error when resetting a text-field prop. The example and generatedOutput looks good so maybe there is a problem when the component quickly disconnects and conntects again?
 * - [ ] - Error when setting theme initially
 * - [ ] - Link social icon error when switching icon back to undefined
 * - [ ] - Make slots toggleable if they are not required. Default slot required? In case of link required when href not set?
 * - [ ] - prop/slot relation? link href -> default slotted anchor
 * - [ ] - make all props removable?
 * - [ ] - values are not stored with correct types in state => true => 'true'
 * - [ ] - when closing banner properties show reset despite being in default state
 */

export type Story<Tag extends HTMLTagOrComponent = HTMLTagOrComponent> = {
  name?: string;
  state?: StoryState<Tag>;
  generator: (
    state?: StoryState<Tag>,
    updateState?: (componentName: string, property: string, value: any) => void
  ) => (string | ElementConfig | undefined)[];
};

export type StoryState<Tag extends HTMLTagOrComponent = HTMLTagOrComponent> = {
  /**
   * Properties have to be written in jsx syntax. (class => className, style => object). Property values have to be the real value (boolean, object etc.).
   */
  properties?: HTMLElementOrComponentProps<Tag>;
  slots?: SlotState<Tag>;
};

export type SlotState<Tag extends HTMLTagOrComponent> = {
  [SlotName in keyof SlotStories[Tag]]: Story<Tag>; // Ensures selected slot is a key in SlotVariants
};

// TODO: slotName must be typed to only allow slots of current component when PDS component is used
export type SlotStories<Tag extends HTMLTagOrComponent = HTMLTagOrComponent> = {
  [slotName: string]: {
    [storyName: string]: Story<Tag>;
  };
};
