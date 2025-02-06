import type {
  ConfiguratorTagNames,
  ElementConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/components/playground/ConfiguratorControls';

// TODO: slotName must be typed to only allow slots of current component when PDS component is used
export type SlotStories<Tag extends HTMLTagOrComponent = HTMLTagOrComponent> = {
  [slotName: string]: {
    [storyName: string]: Story<Tag>;
  };
};

export type ComponentSlotStory = {
  [Tag in ConfiguratorTagNames]: SlotStories<Tag>; // Required keys
} & {
  [Tag in keyof JSX.IntrinsicElements]?: SlotStories<Tag>; // Optional keys
};

export const componentSlotStories: ComponentSlotStory = {
  'p-accordion': {},
  'p-banner': {},
  'p-button': {},
  'p-button-group': {},
  'p-button-pure': {},
  'p-button-tile': {},
  'p-canvas': {},
  'p-carousel': {},
  'p-checkbox': {},
  'p-checkbox-wrapper': {},
  'p-content-wrapper': {},
  'p-crest': {},
  'p-display': {},
  'p-divider': {},
  'p-fieldset': {},
  'p-fieldset-wrapper': {},
  'p-flex': {},
  'p-flex-item': {},
  'p-flyout': {},
  'p-flyout-multilevel': {},
  'p-flyout-multilevel-item': {},
  'p-grid': {},
  'p-grid-item': {},
  'p-heading': {},
  'p-headline': {},
  'p-icon': {},
  'p-inline-notification': {},
  'p-link-pure': {},
  'p-link-social': {},
  'p-link-tile': {},
  'p-link-tile-model-signature': {},
  'p-link-tile-product': {},
  'p-marque': {},
  'p-modal': {},
  'p-model-signature': {},
  'p-multi-select': {},
  'p-multi-select-option': {},
  'p-optgroup': {},
  'p-pagination': {},
  'p-pin-code': {},
  'p-popover': {},
  'p-radio-button-wrapper': {},
  'p-scroller': {},
  'p-segmented-control': {},
  'p-segmented-control-item': {},
  'p-select': {},
  'p-select-option': {},
  'p-select-wrapper': {},
  'p-sheet': {},
  'p-spinner': {},
  'p-stepper-horizontal': {},
  'p-stepper-horizontal-item': {},
  'p-switch': {},
  'p-table': {},
  'p-table-body': {},
  'p-table-cell': {},
  'p-table-head-cell': {},
  'p-table-row': {},
  'p-table-head-row': {},
  'p-table-head': {},
  'p-tabs': {},
  'p-tabs-item': {},
  'p-tabs-bar': {},
  'p-tag': {},
  'p-tag-dismissible': {},
  'p-text': {},
  'p-text-field-wrapper': {},
  'p-text-list': {},
  'p-text-list-item': {},
  'p-textarea': {},
  'p-textarea-wrapper': {},
  'p-toast': {},
  'p-wordmark': {},
};

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

export type ComponentsStory = {
  [Tag in ConfiguratorTagNames]: Story<Tag>;
};

export type Story<Tag extends HTMLTagOrComponent = HTMLTagOrComponent> = {
  name?: string;
  state?: StoryState<Tag>;
  generator: (
    state?: StoryState<Tag>,
    updateState?: (componentName: string, property: string, value: any) => void
  ) => (string | ElementConfig | undefined)[];
};

export type StoryState<Tag extends HTMLTagOrComponent = HTMLTagOrComponent> = {
  properties?: HTMLElementOrComponentProps<Tag>;
  slots?: SlotState<Tag>;
};

export type SlotState<Tag extends HTMLTagOrComponent> = {
  [SlotName in keyof ComponentSlotStory[Tag]]: Story<Tag>; // Ensures selected slot is a key in SlotVariants
};

/**
 * Properties have to be written in jsx syntax. (class => className, style => object). Property values have to be the real value (boolean, object etc.).
 */
export const componentsStory: ComponentsStory = {
  // Unused only for typing purposes
  'p-flex-item': { generator: ({ properties } = {}) => [] },
  'p-flyout-multilevel-item': { generator: ({ properties } = {}) => [] },
  'p-grid-item': { generator: ({ properties } = {}) => [] },
  'p-multi-select-option': { generator: ({ properties } = {}) => [] },
  'p-segmented-control-item': { generator: ({ properties } = {}) => [] },
  'p-select-option': { generator: ({ properties } = {}) => [] },
  'p-stepper-horizontal-item': { generator: ({ properties } = {}) => [] },
  'p-table-body': { generator: ({ properties } = {}) => [] },
  'p-table-cell': { generator: ({ properties } = {}) => [] },
  'p-table-head-cell': { generator: ({ properties } = {}) => [] },
  'p-table-row': { generator: ({ properties } = {}) => [] },
  'p-table-head-row': { generator: ({ properties } = {}) => [] },
  'p-table-head': { generator: ({ properties } = {}) => [] },
  'p-tabs-item': { generator: ({ properties } = {}) => [] },
  'p-text-list-item': { generator: ({ properties } = {}) => [] },
};

// TODO: Revised config for dynamic generation of children based on active slots
// type Config = {
//   tag: TagName | keyof HTMLElementTagNameMap; // The component tag e.g. 'p-button'
//   properties?: Record<string, string | boolean | object>; // The component attributes/props written in camelCase e.g. { hideLabel: 'true' }
//   children?: (string | Config)[]; // Nested children either as string for text or ElementConfig for nested components
// };
//
// type Configuration = {
//   props: object;
//   activeSlots: string[];
// };
//
// type ConfigGen = (config: Configuration) => Config[];
//
// type SlotConfig = {
//   name: string;
//   slot: ConfigGen;
// };
//
// const defaultFlyoutSlots: SlotConfig[] = [
//   {
//     name: 'header',
//     slot: () => [
//       {
//         tag: 'p-heading',
//         properties: { slot: 'header', size: 'large', tag: 'h2' },
//         children: ['Some Heading'],
//       },
//     ],
//   },
//   {
//     name: '',
//     slot: () => [{ tag: 'p-text', properties: { slot: '' }, children: ['Some Content'] }],
//   },
// ];
//
// /**
//  * Utility function to generate children dynamically based on active slot names.
//  */
// const generateChildren = (config: Configuration, content: SlotConfig[]) =>
//   content
//     .filter((slot) => config.activeSlots.includes(slot.name)) // Only include active slots
//     .flatMap((slot) => slot.slot(config, content));
//
// const newConfigTest: Record<string, ConfigGen> = {
//   'p-flyout': (config) => [
//     {
//       tag: 'p-flyout',
//       attributes: { open: 'false', aria: '{ "aria-label": "Some Heading" }' },
//       children: generateChildren(config, defaultFlyoutSlots),
//     },
//   ],
// };
//
// type Config = {
//   tag: TagName | keyof HTMLElementTagNameMap; // The component tag e.g. 'p-button'
//   properties?: Record<string, string | boolean | object>; // The component attributes/props written in camelCase e.g. { hideLabel: 'true' }
//   children?: (string | Config)[]; // Nested children either as string for text or ElementConfig for nested components
// };
//

// type NewStory = {
//   [x: string]: ConfiguratorConfig;
// };
//
// type GeneratorConfig = {
//   properties: object;
//   slots: object;
//   activeSlots: object;
// };
//
// type ConfiguratorConfig = {
//   config: {
//     properties: object;
//     activeSlots: object;
//   };
//   slots: {
//     [x: slotName]: {
//       [e: slotExample]: {
//         generator: ElementConfig[] | ((config: GeneratorConfig) => ElementConfig[]);
//       };
//     };
//   };
//   generator: ElementConfig[] | ((config: GeneratorConfig) => ElementConfig[]);
// };
//
// const test2: NewStory = {
//   // 'p-flyout': {
//   //   config: {
//   //     activeSlots: ['header'],
//   //     properties: { open: 'false', aria: '{ "aria-label": "Some Heading" }' },
//   //   },
//   //   generator: ({ activeSlots, properties }: ConfiguratorConfig) => [
//   //     {
//   //       tag: 'p-flyout',
//   //       properties,
//   //       children: [
//   //         ...(activeSlots.includes('header')
//   //           ? [
//   //               {
//   //                 tag: 'p-heading',
//   //                 properties: { slot: 'header', size: 'large', tag: 'h2' },
//   //                 children: ['Some Heading'],
//   //               },
//   //             ]
//   //           : []),
//   //       ],
//   //     },
//   //   ],
//   // },
//   'p-link': {
//     config: {
//       properties: { href: 'https://porsche.com' },
//       activeSlots: {
//         '': 'Slotted Anchor',
//       },
//     },
//     slots: {
//       '': {
//         Basic: {
//           generator: ['Some label'],
//         },
//         'Slotted Anchor': {
//           generator: [
//             {
//               tag: 'a',
//               properties: { href: 'https://porsche.com' },
//               children: ['Some Label'],
//             },
//           ],
//         },
//       },
//     },
//     generator: ({ properties, slots, activeSlots }) => [
//       {
//         tag: 'p-link',
//         properties,
//         children: Object.entries(activeSlots).map(([slotName, activeSlot]) => slots[slotName][activeSlot]),
//       },
//     ],
//   },
// };

// type GeneratorConfig = {
//   properties: Record<string, any>;
//   slots: Record<string, Record<string, { generator: (config?: GeneratorConfig) => ElementConfig[] }>>;
//   activeSlots: Record<string, string>;
// };
//
// type ConfiguratorConfig = {
//   config: {
//     properties: Record<string, any>;
//     activeSlots: Record<string, string>;
//   };
//   slots: Record<string, Record<string, { generator: (config?: GeneratorConfig) => ElementConfig[] }>>;
//   generator: (config: GeneratorConfig) => ElementConfig[];
// };
//
// type NewStory = Record<string, ConfiguratorConfig>;
//
// const test2: NewStory = {
//   'p-link': {
//     config: {
//       properties: { href: 'https://porsche.com' },
//       activeSlots: {
//         '': 'Slotted Anchor',
//       },
//     },
//     slots: {
//       '': {
//         Basic: {
//           generator: ({ properties } = {}) => [{ tag: 'span', children: ['Some label'] }],
//         },
//         'Slotted Anchor': {
//           generator: ({ properties } = {}) => [
//             {
//               tag: 'a',
//               properties: { href: 'https://porsche.com' },
//               children: ['Some Label'],
//             },
//           ],
//         },
//       },
//     },
//     generator: ({ properties, slots, activeSlots }) => [
//       {
//         tag: 'p-link',
//         properties,
//         children: Object.entries(activeSlots).flatMap(([slotName, activeSlot]) =>
//           slots[slotName]?.[activeSlot]?.generator?.()
//         ),
//       },
//     ],
//   },
// };

// const test = {
//   'p-flyout': {
//     state: {
//       properties: { open: false, aria: { 'aria-label': 'Some Heading' } },
//       slots: {
//         header: ({ properties, slots }) => slots.basic,
//         default: ({ properties, slots }) => slots.basic,
//         footer: ({ properties, slots }) => slots.basic,
//         'sub-footer': ({ properties, slots }) => slots.basic,
//       },
//     },
//     generator: ({ properties, slots }) => [
//       {
//         tag: 'p-flyout',
//         properties,
//         children: [
//           ...(slots.header()),
//           ...(slots.default()),
//           ...(slots.footer()),
//           ...(slots['sub-footer']()),
//         ],
//       },
//     ],
//   },
// }
