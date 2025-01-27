import type { ElementConfig } from '@/components/playground/Configurator';
import type { TagName, TagNameWithChunk } from '@porsche-design-system/shared';

/**
 * Questions:
 * No Configurator for deprecated components? Add all components configurator
 * p-display should have h1 as defaultValue & p-heading should have h2 as default value set in componentMeta
 * Config in vanilla HTML Style or React? use React typing
 * How to deal with string values which have a default value? p-checkbox value default is "on". Leave empty string as soon as value changed form=""
 * How to deal with mix of options and string? p-crest "allowedValues": ["_self", "_blank", "_parent", "_top", "string"] - Remove "string" from options
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
 *
 * TODO:
 * - [ ] - Dynamic import of React Component in Configurator
 * - [x] - Render Example
 * - [x] - Render markup
 * - [ ] - Sync Playground Theme
 * - [ ] - Sync Playground Dir
 * - [x] - Show if prop is default in select & select default
 * - [x] - AllowedValue string[] - select
 * - [x] - AllowedValue string - text input
 * - [x] - Show string attribute if configured in example in text field
 * - [x] - AllowedValue boolean - select (true/false)
 * - [x] - string[] - Remove prop from markup if its default
 * - [x] - string - Remove prop from markup if its default or empty string
 * - [x] - boolean - Remove prop from markup if its default
 * - [ ] - type string[] - multi-select currently filtered in ComponentProps
 * - [x] - filter deprecated props
 * - [x] - filter deprecated prop values (deprecatedValues)
 * - [x] - split element config and only keep config which changes in state, render rest separately
 * - [x] - fix keys
 * - [x] - AllowedValue string with default value
 * - [ ] - AllowedValue number - text field
 * - [ ] - ComponentSlots checkboxes/switches
 * - [x] - syntax highlight broken for p-fieldset-wrapper, radio-button-wrapper
 * - [ ] - console error when initially loading image of p-link-tile (image is still shown)
 * - [ ] - Add breakpoint customizable icon to configurator props p-tag
 * - [ ] - Refactor value conversions (default value, selects...)
 * - [ ] - Weird error when changing form prop of p-select to empty string => form property gets set to null
 * - [ ] - Link social icon undefined error
 */

export type ComponentsStory = {
  [Tag in TagNameWithChunk]: ElementConfig[];
};

/**
 * Properties have to be written in jsx syntax. (class => className, style => object). Property values have to be the real value (boolean, object etc.).
 */
export const componentsStory: ComponentsStory = {
  'p-accordion': [
    {
      tag: 'p-accordion',
      // TODO: Add story
    },
  ],
  'p-banner': [
    {
      tag: 'p-banner',
      // TODO: Add story
    },
  ],
  'p-button': [
    {
      tag: 'p-button',
      attributes: { icon: 'arrow-right' },
      children: ['Some label'],
    },
  ],
  'p-button-group': [
    {
      tag: 'p-button-group',
      children: [
        { tag: 'p-button', attributes: { variant: 'primary' }, children: ['Some label'] },
        { tag: 'p-button', attributes: { variant: 'secondary' }, children: ['Some label'] },
      ],
    },
  ],
  'p-button-pure': [
    {
      tag: 'p-button-pure',
      children: ['Some label'],
    },
  ],
  'p-button-tile': [
    {
      tag: 'p-button-tile',
      attributes: { label: 'Some label', description: 'Some Description' },
      children: [
        {
          tag: 'p-tag',
          attributes: { slot: 'header', theme: 'dark', color: 'background-frosted', compact: 'true' },
          children: ['Some tag'],
        },
        { tag: 'img', attributes: { src: 'assets/lights.jpg', alt: 'Some image description' } },
      ],
    },
  ],
  'p-canvas': [
    {
      tag: 'p-canvas',
      // TODO: Add story
    },
  ],
  'p-carousel': [
    {
      tag: 'p-carousel',
      attributes: { heading: 'Some heading' },
      children: [
        { tag: 'div', attributes: { className: 'slide' }, children: ['Slide 1'] },
        { tag: 'div', attributes: { className: 'slide' }, children: ['Slide 2'] },
        { tag: 'div', attributes: { className: 'slide' }, children: ['Slide 3'] },
        { tag: 'div', attributes: { className: 'slide' }, children: ['Slide 4'] },
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
  'p-checkbox': [
    {
      tag: 'p-checkbox',
      attributes: { label: 'Some label', hideLabel: false, name: 'some-name' },
    },
  ],
  'p-checkbox-wrapper': [
    {
      tag: 'p-checkbox-wrapper',
      attributes: { label: 'Some label', hideLabel: false },
      children: [{ tag: 'input', attributes: { type: 'checkbox', name: 'some-name' } }],
    },
  ],
  'p-content-wrapper': [
    {
      tag: 'p-content-wrapper',
      attributes: { width: 'extended' },
      children: [{ tag: 'div', attributes: { className: 'example-content' }, children: ['Some content'] }],
    },
  ],
  'p-crest': [
    {
      tag: 'p-crest',
    },
  ],
  'p-display': [
    {
      tag: 'p-display',
      attributes: { tag: 'h3', size: 'large' },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
  'p-divider': [
    {
      tag: 'p-divider',
    },
  ],
  'p-fieldset': [
    {
      tag: 'p-fieldset',
      attributes: { label: 'Some legend label' },
      children: [
        {
          tag: 'p-text-field-wrapper',
          attributes: { label: 'Some label' },
          children: [{ tag: 'input', attributes: { type: 'text', name: 'some-name' } }],
        },
      ],
    },
  ],
  'p-fieldset-wrapper': [
    {
      tag: 'p-fieldset-wrapper',
      attributes: { label: 'Some legend label' },
      children: [
        {
          tag: 'p-text-field-wrapper',
          attributes: { label: 'Some label' },
          children: [{ tag: 'input', attributes: { type: 'text', name: 'some-name' } }],
        },
      ],
    },
  ],
  'p-flex': [
    {
      tag: 'p-flex',
      attributes: { className: 'example-flex' },
      children: [
        { tag: 'p-flex-item', children: ['1'] },
        { tag: 'p-flex-item', children: ['2'] },
      ],
    },
    {
      tag: 'p-flex',
      attributes: { className: 'example-flex' },
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
  'p-flyout': [
    {
      tag: 'p-flyout',
      attributes: { open: 'false', aria: '{ "aria-label": "Some Heading" }' },
      children: [
        {
          tag: 'p-heading',
          attributes: { slot: 'header', size: 'large', tag: 'h2' },
          children: ['Some Heading'],
        },
        { tag: 'p-text', attributes: { slot: '' }, children: ['Some Content'] },
        {
          tag: 'p-button-group',
          attributes: { slot: 'footer' },
          children: [
            { tag: 'p-button', attributes: { type: 'button' }, children: ['Proceed'] },
            { tag: 'p-button', attributes: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
          ],
        },
        { tag: 'p-text', attributes: { slot: 'sub-footer' }, children: ['Some additional Sub-Footer'] },
      ],
    },
  ],
  'p-flyout-multilevel': [
    {
      tag: 'p-flyout-multilevel',
      // TODO: Add story
    },
  ],
  'p-grid': [
    {
      tag: 'p-grid',
      children: [{ tag: 'p-grid-item', attributes: { size: '12' }, children: ['12'] }],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '1' }, children: ['1'] },
        { tag: 'p-grid-item', attributes: { size: '11' }, children: ['11'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '2' }, children: ['2'] },
        { tag: 'p-grid-item', attributes: { size: '10' }, children: ['10'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '3' }, children: ['3'] },
        { tag: 'p-grid-item', attributes: { size: '9' }, children: ['9'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '4' }, children: ['4'] },
        { tag: 'p-grid-item', attributes: { size: '8' }, children: ['8'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '5' }, children: ['5'] },
        { tag: 'p-grid-item', attributes: { size: '7' }, children: ['7'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '6' }, children: ['6'] },
        { tag: 'p-grid-item', attributes: { size: '6' }, children: ['6'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '7' }, children: ['7'] },
        { tag: 'p-grid-item', attributes: { size: '5' }, children: ['5'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '8' }, children: ['8'] },
        { tag: 'p-grid-item', attributes: { size: '4' }, children: ['4'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '9' }, children: ['9'] },
        { tag: 'p-grid-item', attributes: { size: '3' }, children: ['3'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '10' }, children: ['10'] },
        { tag: 'p-grid-item', attributes: { size: '2' }, children: ['2'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', attributes: { size: '11' }, children: ['11'] },
        { tag: 'p-grid-item', attributes: { size: '1' }, children: ['1'] },
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
  'p-heading': [
    {
      tag: 'p-heading',
      attributes: { tag: 'h3', size: 'large' },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
  'p-headline': [
    {
      tag: 'p-headline',
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
  'p-icon': [
    {
      tag: 'p-icon',
      attributes: { name: '360' },
    },
  ],
  'p-inline-notification': [
    {
      tag: 'p-inline-notification',
      attributes: { heading: 'Some heading', headingTag: 'h3', description: 'Some description.' },
    },
  ],
  'p-link': [
    {
      tag: 'p-link',
      attributes: { href: 'https://porsche.com' },
      children: ['Some label'],
    },
  ],
  'p-link-pure': [
    {
      tag: 'p-link-pure',
      attributes: { href: 'https://porsche.com' },
      children: ['Some label'],
    },
  ],
  'p-link-social': [
    {
      tag: 'p-link-social',
      attributes: { href: 'https://example.com', icon: 'logo-facebook', target: '_blank', rel: 'nofollow noopener' },
      children: ['Facebook'],
    },
  ],
  'p-link-tile': [
    {
      tag: 'p-link-tile',
      attributes: { href: 'https://porsche.com', label: 'Some label', description: 'Some Description' },
      children: [
        {
          tag: 'p-tag',
          attributes: { slot: 'header', color: 'background-frosted', compact: 'true' },
          children: ['Some tag'],
        },
        { tag: 'img', attributes: { src: 'assets/lights.jpg', alt: 'Some image description' } },
      ],
    },
  ],
  'p-link-tile-model-signature': [
    {
      tag: 'p-link-tile-model-signature',
      attributes: { heading: 'Some heading' },
      children: [
        {
          tag: 'p-tag',
          attributes: { slot: 'header', color: 'background-frosted', compact: 'true' },
          children: ['Some tag'],
        },
        { tag: 'img', attributes: { src: 'assets/lights.jpg', alt: 'Some image description' } },
        {
          tag: 'p-link',
          attributes: { slot: 'primary', href: 'https://porsche.com/#primary' },
          children: ['Primary label'],
        },
        {
          tag: 'p-link',
          attributes: { slot: 'secondary', href: 'https://porsche.com/#secondary' },
          children: ['Secondary label'],
        },
      ],
    },
  ],
  'p-link-tile-product': [
    {
      tag: 'p-link-tile-product',
      attributes: { heading: 'Some heading', price: '1.911,00 €', href: 'https://porsche.com' },
      children: [{ tag: 'img', attributes: { src: 'assets/weekender.webp', alt: 'Some alt text' } }],
    },
  ],
  'p-marque': [
    {
      tag: 'p-marque',
    },
  ],
  'p-modal': [
    {
      tag: 'p-modal',
      // TODO: Add story
    },
  ],
  'p-model-signature': [
    {
      tag: 'p-model-signature',
      attributes: { model: '911' },
    },
  ],
  'p-multi-select': [
    {
      tag: 'p-multi-select',
      attributes: { name: 'name', label: 'Some Label', description: 'Some description' },
      children: [
        { tag: 'p-multi-select-option', attributes: { value: 'a' }, children: ['Option A'] },
        { tag: 'p-multi-select-option', attributes: { value: 'b' }, children: ['Option B'] },
        { tag: 'p-multi-select-option', attributes: { value: 'c' }, children: ['Option C'] },
        { tag: 'p-multi-select-option', attributes: { value: 'd' }, children: ['Option D'] },
        { tag: 'p-multi-select-option', attributes: { value: 'e' }, children: ['Option E'] },
        { tag: 'p-multi-select-option', attributes: { value: 'f' }, children: ['Option F'] },
      ],
    },
  ],
  // 'p-multi-select': {
  //   propsStory: {
  //     name: { value: 'options' },
  //     label: { value: 'Some label' },
  //     description: { value: 'Some description' },
  //   },
  // }],
  'p-optgroup': [
    {
      tag: 'p-optgroup',
      // TODO: Add story
    },
  ],
  'p-pagination': [
    {
      tag: 'p-pagination',
      attributes: { totalItemsCount: '500', itemsPerPage: '25', activePage: '1' },
    },
  ],
  'p-pin-code': [
    {
      tag: 'p-pin-code',
      attributes: { label: 'Some label' },
    },
  ],
  'p-popover': [
    {
      tag: 'p-popover',
      children: ['Some additional content.'],
    },
  ],
  'p-radio-button-wrapper': [
    {
      tag: 'p-radio-button-wrapper',
      attributes: { label: 'Some label' },
      children: [{ tag: 'input', attributes: { type: 'radio', name: 'some-name' } }],
    },
    {
      tag: 'p-radio-button-wrapper',
      attributes: { label: 'Some label' },
      children: [{ tag: 'input', attributes: { type: 'radio', name: 'some-name' } }],
    },
  ],
  'p-scroller': [
    {
      tag: 'p-scroller',
      attributes: { className: 'scroller' },
      children: [
        {
          tag: 'p-tag',
          attributes: { color: 'primary' },
          children: [
            {
              tag: 'button',
              attributes: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          attributes: { color: 'notification-info-soft' },
          children: [
            {
              tag: 'button',
              attributes: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          attributes: { color: 'notification-warning-soft' },
          children: [
            {
              tag: 'button',
              attributes: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          attributes: { color: 'primary' },
          children: [
            {
              tag: 'button',
              attributes: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          attributes: { color: 'notification-info-soft' },
          children: [
            {
              tag: 'button',
              attributes: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          attributes: { color: 'notification-warning-soft' },
          children: [
            {
              tag: 'button',
              attributes: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          attributes: { color: 'primary' },
          children: [
            {
              tag: 'button',
              attributes: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          attributes: { color: 'notification-info-soft' },
          children: [
            {
              tag: 'button',
              attributes: { type: 'button' },
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
  'p-segmented-control': [
    {
      tag: 'p-segmented-control',
      attributes: { 'aria-label': 'Choose an Option' },
      children: [
        { tag: 'p-segmented-control-item', attributes: { value: '1' }, children: ['Option 1'] },
        { tag: 'p-segmented-control-item', attributes: { value: '2' }, children: ['Option 2'] },
        { tag: 'p-segmented-control-item', attributes: { value: '3' }, children: ['Option 3'] },
        { tag: 'p-segmented-control-item', attributes: { value: '4' }, children: ['Option 4'] },
        { tag: 'p-segmented-control-item', attributes: { value: '5' }, children: ['Option 5'] },
      ],
    },
  ],
  'p-select': [
    {
      tag: 'p-select',
      attributes: { name: 'options', label: 'Some Label', description: 'Some description', value: 'a', required: true },
      children: [
        { tag: 'p-select-option', attributes: { value: 'a' }, children: ['Option A'] },
        { tag: 'p-select-option', attributes: { value: 'b' }, children: ['Option B'] },
        { tag: 'p-select-option', attributes: { value: 'c' }, children: ['Option C'] },
        { tag: 'p-select-option', attributes: { value: 'd' }, children: ['Option D'] },
        { tag: 'p-select-option', attributes: { value: 'e' }, children: ['Option E'] },
        { tag: 'p-select-option', attributes: { value: 'f' }, children: ['Option F'] },
      ],
    },
  ],
  'p-select-wrapper': [
    {
      tag: 'p-select-wrapper',
      attributes: { label: 'Some label', hideLabel: false },
      children: [
        {
          tag: 'select',
          attributes: { name: 'some-name' },
          children: [
            { tag: 'option', attributes: { value: 'a' }, children: ['Option A'] },
            { tag: 'option', attributes: { value: 'b' }, children: ['Option B'] },
            { tag: 'option', attributes: { value: 'c' }, children: ['Option C'] },
            { tag: 'option', attributes: { value: 'd' }, children: ['Option D'] },
            { tag: 'option', attributes: { value: 'e' }, children: ['Option E'] },
            { tag: 'option', attributes: { value: 'f' }, children: ['Option F'] },
          ],
        },
      ],
    },
  ],
  'p-sheet': [
    {
      tag: 'p-sheet',
      // TODO: Add story
    },
  ],
  'p-spinner': [
    {
      tag: 'p-spinner',
      attributes: { aria: { 'aria-label': 'Loading page content' } },
    },
  ],
  'p-stepper-horizontal': [
    {
      tag: 'p-stepper-horizontal',
      children: [
        { tag: 'p-stepper-horizontal-item', attributes: { state: 'complete' }, children: ['Step 1'] },
        { tag: 'p-stepper-horizontal-item', attributes: { state: 'warning' }, children: ['Step 2'] },
        { tag: 'p-stepper-horizontal-item', attributes: { state: 'current' }, children: ['Step 3'] },
        { tag: 'p-stepper-horizontal-item', children: ['Step 4'] },
      ],
    },
  ],
  'p-switch': [
    {
      tag: 'p-switch',
      children: ['Some label'],
    },
  ],
  'p-table': [
    {
      tag: 'p-table',
      attributes: { caption: 'Some caption' },
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
  'p-tabs': [
    {
      tag: 'p-tabs',
      children: [
        {
          tag: 'p-tabs-item',
          attributes: { label: 'Tab One' },
          children: [{ tag: 'p-text', children: ['Tab Content One'] }],
        },
        {
          tag: 'p-tabs-item',
          attributes: { label: 'Tab Two' },
          children: [{ tag: 'p-text', children: ['Tab Content Two'] }],
        },
        {
          tag: 'p-tabs-item',
          attributes: { label: 'Tab Three' },
          children: [{ tag: 'p-text', children: ['Tab Content Three'] }],
        },
      ],
    },
  ],
  'p-tabs-bar': [
    {
      tag: 'p-tabs-bar',
      // TODO: Add story
    },
  ],
  'p-tag': [
    {
      tag: 'p-tag',
      children: ['Some label'],
    },
  ],
  'p-tag-dismissible': [
    {
      tag: 'p-tag-dismissible',
      children: ['Some label'],
    },
  ],
  'p-text': [
    {
      tag: 'p-text',
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
  'p-text-field-wrapper': [
    {
      tag: 'p-text-field-wrapper',
      attributes: { label: 'Some label' },
      children: [{ tag: 'input', attributes: { type: 'text', name: 'some-name' } }],
    },
  ],
  'p-text-list': [
    {
      tag: 'p-text-list',
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
  'p-textarea': [
    {
      tag: 'p-textarea',
      attributes: { name: 'some-name', label: 'Some label' },
    },
  ],
  'p-textarea-wrapper': [
    {
      tag: 'p-textarea-wrapper',
      attributes: { label: 'Some label' },
      children: [{ tag: 'textarea', attributes: { name: 'some-name' } }],
    },
  ],
  'p-toast': [
    {
      tag: 'p-toast',
      // TODO: Add story
    },
  ],
  'p-wordmark': [
    {
      tag: 'p-wordmark',
    },
  ],
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
// const test2 = {
//   'p-flyout': (config = { activeSlots: ['header'] }) => [
//     {
//       tag: 'p-flyout',
//       attributes: { open: 'false', aria: '{ "aria-label": "Some Heading" }' },
//       children: [
//         ...(config.activeSlots.includes('header') && {
//           tag: 'p-heading',
//           properties: { slot: 'header', size: 'large', tag: 'h2' },
//           children: ['Some Heading'],
//         }),
//       ],
//     },
//   ],
// };
