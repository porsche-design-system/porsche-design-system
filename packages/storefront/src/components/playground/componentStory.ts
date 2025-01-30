import type { ConfiguratorTagNames, ElementConfig, PropTypeMapping } from '@/components/playground/Configurator';

type SlotStory = {
  [storyName: string]: {
    generator: (string | ElementConfig | undefined)[];
  };
};

type ComponentSlotStory = {
  [Tag in keyof PropTypeMapping]: {
    [slotName: string]: SlotStory;
  };
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
  'p-flyout': {
    header: {
      basic: {
        generator: [
          {
            tag: 'p-heading',
            properties: { slot: 'header', size: 'large', tag: 'h2' },
            children: ['Some Heading'],
          },
        ],
      },
    },
    default: {
      basic: {
        generator: [{ tag: 'p-text', children: ['Some Content'] }],
      },
      scrollable: {
        generator: [
          { tag: 'p-text', children: ['Some Content Begin'] },
          { tag: 'div', properties: { style: { width: '10px', height: '120vh', background: 'deeppink' } } },
          { tag: 'p-text', children: ['Some Content End'] },
        ],
      },
    },
    footer: {
      basic: {
        generator: [
          {
            tag: 'p-button-group',
            properties: { slot: 'footer' },
            children: [
              { tag: 'p-button', properties: { type: 'button' }, children: ['Proceed'] },
              { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
            ],
          },
        ],
      },
    },
    'sub-footer': {
      basic: {
        generator: [{ tag: 'p-text', properties: { slot: 'sub-footer' }, children: ['Some additional Sub-Footer'] }],
      },
    },
  },
  'p-flyout-multilevel': {},
  'p-flyout-multilevel-item': {},
  'p-grid': {},
  'p-grid-item': {},
  'p-heading': {},
  'p-headline': {},
  'p-icon': {},
  'p-inline-notification': {},
  'p-link': {},
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
 * Should we delete empty string text-field from props? Usually the default is undefined.
 * Model Signature size inherit?
 * How to handle styles in examples? style tag currently works. Inline style is missing conversion react/vanilla.js. Tailwind would be also an option. Currently affecting p-carousel, p-radio-button-wrapper (Missing spacing)
 * How to render allowedValues ['string' | 'number'] like in p-segmented-control? Currently textfield since string can be any value.
 * How to deal with relations? e.g. p-text-field-wrapper needs input with type number when unit is used => Make stories function which gets the current state and returns the correct story
 * How to show undefined default value in select props?
 * Required * is shown at the end of the label and the reset button?
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
 * - [ ] - Link social icon error when switching icon back to undefined
 */

export type SlotState<T extends keyof PropTypeMapping> = {
  [SlotName in keyof ComponentSlotStory[T]]: keyof ComponentSlotStory[T][SlotName]; // Ensures selected slot is a key in SlotVariants
};

export type StoryState<T extends keyof PropTypeMapping> = {
  properties?: PropTypeMapping[T];
  slots?: SlotState<T>;
  slotVariants?: ComponentSlotStory[T];
};

export type ComponentsStory = {
  [Tag in ConfiguratorTagNames]: {
    state?: StoryState<Tag>;
    generator: (state: StoryState<Tag>) => ElementConfig[];
  };
};

/**
 * Properties have to be written in jsx syntax. (class => className, style => object). Property values have to be the real value (boolean, object etc.).
 */
export const componentsStory: ComponentsStory = {
  // TODO: Add Story
  'p-accordion': {
    generator: ({ properties }) => [
      {
        tag: 'p-accordion',
        properties,
      },
    ],
  },
  'p-banner': {
    state: {
      properties: { open: true },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-banner',
        properties,
      },
    ],
  },
  'p-button': {
    generator: ({ properties }) => [
      {
        tag: 'p-button',
        properties,
        children: ['Some label'],
      },
    ],
  },
  'p-button-group': {
    generator: ({ properties }) => [
      {
        tag: 'p-button-group',
        properties,
        children: [
          { tag: 'p-button', properties: { variant: 'primary' }, children: ['Some label'] },
          { tag: 'p-button', properties: { variant: 'secondary' }, children: ['Some label'] },
        ],
      },
    ],
  },
  'p-button-pure': {
    generator: ({ properties }) => [
      {
        tag: 'p-button-pure',
        properties,
        children: ['Some label'],
      },
    ],
  },
  'p-button-tile': {
    state: {
      properties: { label: 'Some label', description: 'Some Description' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-button-tile',
        properties,
        children: [
          {
            tag: 'p-tag',
            properties: { slot: 'header', theme: 'dark', color: 'background-frosted', compact: true },
            children: ['Some tag'],
          },
          { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
        ],
      },
    ],
  },
  // TODO: Add story
  'p-canvas': {
    generator: ({ properties }) => [
      {
        tag: 'p-canvas',
        properties,
      },
    ],
  },
  'p-carousel': {
    state: {
      properties: { heading: 'Some heading' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-carousel',
        properties,
        children: [
          { tag: 'div', properties: { className: 'slide' }, children: ['Slide 1'] },
          { tag: 'div', properties: { className: 'slide' }, children: ['Slide 2'] },
          { tag: 'div', properties: { className: 'slide' }, children: ['Slide 3'] },
          { tag: 'div', properties: { className: 'slide' }, children: ['Slide 4'] },
        ],
      },
      {
        tag: 'style',
        children: [
          `.slide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #00b0f4;
    height: 150px;
    color: #010205;
  }`,
        ],
      },
    ],
  },
  'p-checkbox': {
    state: {
      properties: { label: 'Some label', name: 'some-name' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-checkbox',
        properties,
      },
    ],
  },
  'p-checkbox-wrapper': {
    state: {
      properties: { label: 'Some label' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-checkbox-wrapper',
        properties,
        children: [{ tag: 'input', properties: { type: 'checkbox', name: 'some-name' } }],
      },
    ],
  },
  'p-content-wrapper': {
    generator: ({ properties }) => [
      {
        tag: 'p-content-wrapper',
        properties,
        children: [{ tag: 'div', properties: { className: 'example-content' }, children: ['Some content'] }],
      },
    ],
  },
  'p-crest': {
    generator: ({ properties }) => [
      {
        tag: 'p-crest',
        properties,
      },
    ],
  },
  'p-display': {
    generator: ({ properties }) => [
      {
        tag: 'p-display',
        properties,
        children: ['The quick brown fox jumps over the lazy dog'],
      },
    ],
  },
  'p-divider': {
    generator: ({ properties }) => [
      {
        tag: 'p-divider',
        properties,
      },
    ],
  },
  'p-fieldset': {
    state: {
      properties: { label: 'Some legend label' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-fieldset',
        properties,
        children: [
          {
            tag: 'p-text-field-wrapper',
            properties: { label: 'Some label' },
            children: [{ tag: 'input', properties: { type: 'text', name: 'some-name' } }],
          },
        ],
      },
    ],
  },
  'p-fieldset-wrapper': {
    state: {
      properties: { label: 'Some legend label' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-fieldset-wrapper',
        properties,
        children: [
          {
            tag: 'p-text-field-wrapper',
            properties: { label: 'Some label' },
            children: [{ tag: 'input', properties: { type: 'text', name: 'some-name' } }],
          },
        ],
      },
    ],
  },
  'p-flex': {
    generator: ({ properties }) => [
      {
        tag: 'p-flex',
        properties: { ...properties, className: 'example-flex' },
        children: [
          { tag: 'p-flex-item', children: ['1'] },
          { tag: 'p-flex-item', children: ['2'] },
        ],
      },
      {
        tag: 'p-flex',
        properties: {
          className: 'example-flex',
        },
        children: [
          { tag: 'p-flex-item', children: ['1'] },
          { tag: 'p-flex-item', children: ['2'] },
        ],
      },
      {
        tag: 'style',
        children: [
          `.example-flex > :nth-child(1n) {
    background-color: #87cefa;
  }
  .example-flex > :nth-child(2n) {
    background-color: #00bfff;
  }
  .example-flex > * {
    padding: 0 6vw;
    color: #010205;
    text-align: center;
  }`,
        ],
      },
    ],
  },
  'p-flyout': {
    state: {
      properties: { open: false, aria: { 'aria-label': 'Some Heading' } },
      slots: {
        header: 'basic',
        default: 'basic',
        footer: 'basic',
        'sub-footer': 'basic',
      },
      slotVariants: componentSlotStories['p-flyout'],
    },
    generator: ({ properties, slots, slotVariants }) => [
      {
        tag: 'p-flyout',
        properties,
        children: Object.entries(slots ?? {}).flatMap(
          ([slotName, selectedSlot]) => slotVariants?.[slotName]?.[selectedSlot]?.generator
        ),
      },
    ],
  },
  // TODO: Add story
  'p-flyout-multilevel': {
    generator: ({ properties }) => [
      {
        tag: 'p-flyout-multilevel',
        properties,
      },
    ],
  },
  'p-grid': {
    generator: ({ properties }) => [
      {
        tag: 'p-grid',
        properties,
        children: [{ tag: 'p-grid-item', properties: { size: 12 }, children: ['12'] }],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 1 }, children: ['1'] },
          { tag: 'p-grid-item', properties: { size: 11 }, children: ['11'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 2 }, children: ['2'] },
          { tag: 'p-grid-item', properties: { size: 10 }, children: ['10'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 3 }, children: ['3'] },
          { tag: 'p-grid-item', properties: { size: 9 }, children: ['9'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 4 }, children: ['4'] },
          { tag: 'p-grid-item', properties: { size: 8 }, children: ['8'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 5 }, children: ['5'] },
          { tag: 'p-grid-item', properties: { size: 7 }, children: ['7'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 6 }, children: ['6'] },
          { tag: 'p-grid-item', properties: { size: 6 }, children: ['6'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 7 }, children: ['7'] },
          { tag: 'p-grid-item', properties: { size: 5 }, children: ['5'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 8 }, children: ['8'] },
          { tag: 'p-grid-item', properties: { size: 4 }, children: ['4'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 9 }, children: ['9'] },
          { tag: 'p-grid-item', properties: { size: 3 }, children: ['3'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 10 }, children: ['10'] },
          { tag: 'p-grid-item', properties: { size: 2 }, children: ['2'] },
        ],
      },
      {
        tag: 'p-grid',
        children: [
          { tag: 'p-grid-item', properties: { size: 11 }, children: ['11'] },
          { tag: 'p-grid-item', properties: { size: 1 }, children: ['1'] },
        ],
      },
      {
        tag: 'style',
        children: [
          `p-grid {
    margin-top: 8px;
  }
        p-grid-item {
    color: #010205;
    text-align: center;
    background: #87cefa;
    background-clip: content-box;
  }`,
        ],
      },
    ],
  },
  'p-heading': {
    generator: ({ properties }) => [
      {
        tag: 'p-heading',
        properties,
        children: ['The quick brown fox jumps over the lazy dog'],
      },
    ],
  },
  'p-headline': {
    generator: ({ properties }) => [
      {
        tag: 'p-headline',
        properties,
        children: ['The quick brown fox jumps over the lazy dog'],
      },
    ],
  },
  'p-icon': {
    generator: ({ properties }) => [
      {
        tag: 'p-icon',
        properties,
      },
    ],
  },
  'p-inline-notification': {
    state: { properties: { heading: 'Some heading', headingTag: 'h3', description: 'Some description.' } },
    generator: ({ properties }) => [
      {
        tag: 'p-inline-notification',
        properties,
      },
    ],
  },
  'p-link': {
    state: {
      properties: { href: 'https://porsche.com' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-link',
        properties,
        children: ['Some label'],
      },
    ],
  },
  'p-link-pure': {
    state: {
      properties: { href: 'https://porsche.com' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-link-pure',
        properties,
        children: ['Some label'],
      },
    ],
  },
  'p-link-social': {
    state: {
      properties: { href: 'https://example.com', icon: 'logo-facebook', target: '_blank', rel: 'nofollow noopener' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-link-social',
        properties,
        children: ['Facebook'],
      },
    ],
  },
  'p-link-tile': {
    state: {
      properties: { href: 'https://porsche.com', label: 'Some label', description: 'Some Description' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-link-tile',
        properties,
        children: [
          {
            tag: 'p-tag',
            properties: { slot: 'header', color: 'background-frosted', compact: true },
            children: ['Some tag'],
          },
          { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
        ],
      },
    ],
  },
  'p-link-tile-model-signature': {
    state: {
      properties: { heading: 'Some heading' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-link-tile-model-signature',
        properties,
        children: [
          {
            tag: 'p-tag',
            properties: { slot: 'header', color: 'background-frosted', compact: true },
            children: ['Some tag'],
          },
          { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
          {
            tag: 'p-link',
            properties: { slot: 'primary', href: 'https://porsche.com/#primary' },
            children: ['Primary label'],
          },
          {
            tag: 'p-link',
            properties: { slot: 'secondary', href: 'https://porsche.com/#secondary' },
            children: ['Secondary label'],
          },
        ],
      },
    ],
  },
  'p-link-tile-product': {
    state: {
      properties: { heading: 'Some heading', price: '1.911,00 €', href: 'https://porsche.com' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-link-tile-product',
        properties,
        children: [{ tag: 'img', properties: { src: 'assets/weekender.webp', alt: 'Some alt text' } }],
      },
    ],
  },
  'p-marque': {
    generator: ({ properties }) => [
      {
        tag: 'p-marque',
        properties,
      },
    ],
  },
  // TODO: Add story
  'p-modal': {
    generator: ({ properties }) => [
      {
        tag: 'p-modal',
        properties,
      },
    ],
  },
  'p-model-signature': {
    generator: ({ properties }) => [
      {
        tag: 'p-model-signature',
        properties,
      },
    ],
  },
  'p-multi-select': {
    state: {
      properties: { name: 'name', label: 'Some Label', description: 'Some description' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-multi-select',
        properties,
        children: [
          { tag: 'p-multi-select-option', properties: { value: 'a' }, children: ['Option A'] },
          { tag: 'p-multi-select-option', properties: { value: 'b' }, children: ['Option B'] },
          { tag: 'p-multi-select-option', properties: { value: 'c' }, children: ['Option C'] },
          { tag: 'p-multi-select-option', properties: { value: 'd' }, children: ['Option D'] },
          { tag: 'p-multi-select-option', properties: { value: 'e' }, children: ['Option E'] },
          { tag: 'p-multi-select-option', properties: { value: 'f' }, children: ['Option F'] },
        ],
      },
    ],
  },
  // 'p-multi-select': {
  //   propsStory: {
  //     name: { value: 'options' },
  //     label: { value: 'Some label' },
  //     description: { value: 'Some description' },
  //   },
  // }],
  // TODO: Add story
  'p-optgroup': {
    generator: ({ properties }) => [
      {
        tag: 'p-optgroup',
        properties,
      },
    ],
  },
  'p-pagination': {
    state: {
      properties: { totalItemsCount: 500, itemsPerPage: 25, activePage: 1 },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-pagination',
        properties,
      },
    ],
  },
  'p-pin-code': {
    state: {
      properties: { label: 'Some label' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-pin-code',
        properties,
      },
    ],
  },
  'p-popover': {
    generator: ({ properties }) => [
      {
        tag: 'p-popover',
        properties,
        children: ['Some additional content.'],
      },
    ],
  },
  'p-radio-button-wrapper': {
    state: {
      properties: {
        label: 'Some label',
      },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-radio-button-wrapper',
        properties,
        children: [{ tag: 'input', properties: { type: 'radio', name: 'some-name' } }],
      },
      {
        tag: 'p-radio-button-wrapper',
        properties: {
          label: 'Some label',
        },
        children: [{ tag: 'input', properties: { type: 'radio', name: 'some-name' } }],
      },
    ],
  },
  'p-scroller': {
    generator: ({ properties }) => [
      {
        tag: 'p-scroller',
        properties: { ...properties, className: 'scroller' },
        children: [
          {
            tag: 'p-tag',
            properties: { color: 'primary' },
            children: [
              {
                tag: 'button',
                properties: { type: 'button' },
                children: ['Some tag content'],
              },
            ],
          },
          {
            tag: 'p-tag',
            properties: { color: 'notification-info-soft' },
            children: [
              {
                tag: 'button',
                properties: { type: 'button' },
                children: ['Some tag content'],
              },
            ],
          },
          {
            tag: 'p-tag',
            properties: { color: 'notification-warning-soft' },
            children: [
              {
                tag: 'button',
                properties: { type: 'button' },
                children: ['Some tag content'],
              },
            ],
          },
          {
            tag: 'p-tag',
            properties: { color: 'primary' },
            children: [
              {
                tag: 'button',
                properties: { type: 'button' },
                children: ['Some tag content'],
              },
            ],
          },
          {
            tag: 'p-tag',
            properties: { color: 'notification-info-soft' },
            children: [
              {
                tag: 'button',
                properties: { type: 'button' },
                children: ['Some tag content'],
              },
            ],
          },
          {
            tag: 'p-tag',
            properties: { color: 'notification-warning-soft' },
            children: [
              {
                tag: 'button',
                properties: { type: 'button' },
                children: ['Some tag content'],
              },
            ],
          },
          {
            tag: 'p-tag',
            properties: { color: 'primary' },
            children: [
              {
                tag: 'button',
                properties: { type: 'button' },
                children: ['Some tag content'],
              },
            ],
          },
          {
            tag: 'p-tag',
            properties: { color: 'notification-info-soft' },
            children: [
              {
                tag: 'button',
                properties: { type: 'button' },
                children: ['Some tag content'],
              },
            ],
          },
        ],
      },
      {
        tag: 'style',
        children: [
          `.scroller {
    max-width: 600px;
    & > :not(:last-child) {
      margin-inline-end: 16px;
    }
  }`,
        ],
      },
    ],
  },
  'p-segmented-control': {
    generator: ({ properties }) => [
      {
        tag: 'p-segmented-control',
        properties,
        children: [
          { tag: 'p-segmented-control-item', properties: { value: '1' }, children: ['Option 1'] },
          { tag: 'p-segmented-control-item', properties: { value: '2' }, children: ['Option 2'] },
          { tag: 'p-segmented-control-item', properties: { value: '3' }, children: ['Option 3'] },
          { tag: 'p-segmented-control-item', properties: { value: '4' }, children: ['Option 4'] },
          { tag: 'p-segmented-control-item', properties: { value: '5' }, children: ['Option 5'] },
        ],
      },
    ],
  },
  'p-select': {
    state: {
      properties: {
        name: 'options',
        label: 'Some Label',
        description: 'Some description',
        value: 'a',
      },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-select',
        properties,
        children: [
          { tag: 'p-select-option', properties: { value: 'a' }, children: ['Option A'] },
          { tag: 'p-select-option', properties: { value: 'b' }, children: ['Option B'] },
          { tag: 'p-select-option', properties: { value: 'c' }, children: ['Option C'] },
          { tag: 'p-select-option', properties: { value: 'd' }, children: ['Option D'] },
          { tag: 'p-select-option', properties: { value: 'e' }, children: ['Option E'] },
          { tag: 'p-select-option', properties: { value: 'f' }, children: ['Option F'] },
        ],
      },
    ],
  },
  'p-select-wrapper': {
    state: {
      properties: { label: 'Some label' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-select-wrapper',
        properties,
        children: [
          {
            tag: 'select',
            properties: { name: 'some-name' },
            children: [
              { tag: 'option', properties: { value: 'a' }, children: ['Option A'] },
              { tag: 'option', properties: { value: 'b' }, children: ['Option B'] },
              { tag: 'option', properties: { value: 'c' }, children: ['Option C'] },
              { tag: 'option', properties: { value: 'd' }, children: ['Option D'] },
              { tag: 'option', properties: { value: 'e' }, children: ['Option E'] },
              { tag: 'option', properties: { value: 'f' }, children: ['Option F'] },
            ],
          },
        ],
      },
    ],
  },
  // TODO: Add story
  'p-sheet': {
    generator: ({ properties }) => [
      {
        tag: 'p-sheet',
        properties,
      },
    ],
  },
  'p-spinner': {
    state: {
      properties: { aria: { 'aria-label': 'Loading page content' } },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-spinner',
        properties,
      },
    ],
  },
  'p-stepper-horizontal': {
    generator: ({ properties }) => [
      {
        tag: 'p-stepper-horizontal',
        properties,
        children: [
          { tag: 'p-stepper-horizontal-item', properties: { state: 'complete' }, children: ['Step 1'] },
          { tag: 'p-stepper-horizontal-item', properties: { state: 'warning' }, children: ['Step 2'] },
          { tag: 'p-stepper-horizontal-item', properties: { state: 'current' }, children: ['Step 3'] },
          { tag: 'p-stepper-horizontal-item', children: ['Step 4'] },
        ],
      },
    ],
  },
  'p-switch': {
    generator: ({ properties }) => [
      {
        tag: 'p-switch',
        properties,
        children: ['Some label'],
      },
    ],
  },
  'p-table': {
    state: { properties: { caption: 'Some caption' } },
    generator: ({ properties }) => [
      {
        tag: 'p-table',
        properties,
        children: [
          {
            tag: 'p-table-head',
            children: [
              {
                tag: 'p-table-head-row',
                children: [
                  { tag: 'p-table-head-cell', children: ['Model'] },
                  { tag: 'p-table-head-cell', children: ['Date'] },
                  { tag: 'p-table-head-cell', children: ['Purchase Intention'] },
                  { tag: 'p-table-head-cell', children: ['Status'] },
                  { tag: 'p-table-head-cell', children: ['Lead ID'] },
                ],
              },
            ],
          },
          {
            tag: 'p-table-body',
            children: [
              {
                tag: 'p-table-row',
                children: [
                  { tag: 'p-table-cell', children: ['718 Cayman'] },
                  { tag: 'p-table-cell', children: ['23.06.2021'] },
                  { tag: 'p-table-cell', children: ['New Car'] },
                  { tag: 'p-table-cell', children: ['Won'] },
                  { tag: 'p-table-cell', children: ['0000824402'] },
                ],
              },
              {
                tag: 'p-table-row',
                children: [
                  { tag: 'p-table-cell', children: ['Panamera 4S'] },
                  { tag: 'p-table-cell', children: ['19.06.2021'] },
                  { tag: 'p-table-cell', children: ['New Car'] },
                  { tag: 'p-table-cell', children: ['Lost'] },
                  { tag: 'p-table-cell', children: ['0000824409'] },
                ],
              },
              {
                tag: 'p-table-row',
                children: [
                  { tag: 'p-table-cell', children: ['911 Carrera S'] },
                  { tag: 'p-table-cell', children: ['19.05.2021'] },
                  { tag: 'p-table-cell', children: ['Used Car'] },
                  { tag: 'p-table-cell', children: ['Won'] },
                  { tag: 'p-table-cell', children: ['0000824408'] },
                ],
              },
              {
                tag: 'p-table-row',
                children: [
                  { tag: 'p-table-cell', children: ['Macan Turbo'] },
                  { tag: 'p-table-cell', children: ['10.05.2021'] },
                  { tag: 'p-table-cell', children: ['Used Car'] },
                  { tag: 'p-table-cell', children: ['Lost'] },
                  { tag: 'p-table-cell', children: ['0000824407'] },
                ],
              },
              {
                tag: 'p-table-row',
                children: [
                  { tag: 'p-table-cell', children: ['Taycan'] },
                  { tag: 'p-table-cell', children: ['03.05.2021'] },
                  { tag: 'p-table-cell', children: ['New Car'] },
                  { tag: 'p-table-cell', children: ['Won'] },
                  { tag: 'p-table-cell', children: ['0000824406'] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  'p-tabs': {
    generator: ({ properties }) => [
      {
        tag: 'p-tabs',
        properties,
        children: [
          {
            tag: 'p-tabs-item',
            properties: { label: 'Tab One' },
            children: [{ tag: 'p-text', children: ['Tab Content One'] }],
          },
          {
            tag: 'p-tabs-item',
            properties: { label: 'Tab Two' },
            children: [{ tag: 'p-text', children: ['Tab Content Two'] }],
          },
          {
            tag: 'p-tabs-item',
            properties: { label: 'Tab Three' },
            children: [{ tag: 'p-text', children: ['Tab Content Three'] }],
          },
        ],
      },
    ],
  },
  // TODO: Add story
  'p-tabs-bar': {
    generator: ({ properties }) => [
      {
        tag: 'p-tabs-bar',
        properties,
      },
    ],
  },
  'p-tag': {
    generator: ({ properties }) => [
      {
        tag: 'p-tag',
        properties,
        children: ['Some label'],
      },
    ],
  },
  'p-tag-dismissible': {
    generator: ({ properties }) => [
      {
        tag: 'p-tag-dismissible',
        properties,
        children: ['Some label'],
      },
    ],
  },
  'p-text': {
    generator: ({ properties }) => [
      {
        tag: 'p-text',
        properties,
        children: ['The quick brown fox jumps over the lazy dog'],
      },
    ],
  },
  'p-text-field-wrapper': {
    state: { properties: { label: 'Some label' } },
    generator: ({ properties }) => [
      {
        tag: 'p-text-field-wrapper',
        properties,
        children: [{ tag: 'input', properties: { type: 'text', name: 'some-name' } }],
      },
    ],
  },
  'p-text-list': {
    generator: ({ properties }) => [
      {
        tag: 'p-text-list',
        properties,
        children: [
          { tag: 'p-text-list-item', children: ['The quick brown fox jumps over the lazy dog'] },
          {
            tag: 'p-text-list-item',
            children: [
              'The quick brown fox jumps over the lazy dog',
              {
                tag: 'p-text-list',
                children: [
                  { tag: 'p-text-list-item', children: ['The quick brown fox jumps over the lazy dog'] },
                  { tag: 'p-text-list-item', children: ['The quick brown fox jumps over the lazy dog'] },
                ],
              },
            ],
          },
          { tag: 'p-text-list-item', children: ['The quick brown fox jumps over the lazy dog'] },
        ],
      },
    ],
  },
  'p-textarea': {
    state: {
      properties: { name: 'some-name', label: 'Some label' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-textarea',
        properties,
      },
    ],
  },
  'p-textarea-wrapper': {
    state: {
      properties: { label: 'Some label' },
    },
    generator: ({ properties }) => [
      {
        tag: 'p-textarea-wrapper',
        properties,
        children: [{ tag: 'textarea', properties: { name: 'some-name' } }],
      },
    ],
  },
  // TODO: Add story
  'p-toast': {
    generator: ({ properties }) => [
      {
        tag: 'p-toast',
        properties,
      },
    ],
  },
  'p-wordmark': {
    generator: ({ properties }) => [
      {
        tag: 'p-wordmark',
        properties,
      },
    ],
  },
  // Unused only for typing purposes
  'p-flex-item': { generator: ({ properties }) => [] },
  'p-flyout-multilevel-item': { generator: ({ properties }) => [] },
  'p-grid-item': { generator: ({ properties }) => [] },
  'p-multi-select-option': { generator: ({ properties }) => [] },
  'p-segmented-control-item': { generator: ({ properties }) => [] },
  'p-select-option': { generator: ({ properties }) => [] },
  'p-stepper-horizontal-item': { generator: ({ properties }) => [] },
  'p-table-body': { generator: ({ properties }) => [] },
  'p-table-cell': { generator: ({ properties }) => [] },
  'p-table-head-cell': { generator: ({ properties }) => [] },
  'p-table-row': { generator: ({ properties }) => [] },
  'p-table-head-row': { generator: ({ properties }) => [] },
  'p-table-head': { generator: ({ properties }) => [] },
  'p-tabs-item': { generator: ({ properties }) => [] },
  'p-text-list-item': { generator: ({ properties }) => [] },
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
//           generator: ({ properties }) => [{ tag: 'span', children: ['Some label'] }],
//         },
//         'Slotted Anchor': {
//           generator: ({ properties }) => [
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
