import type { ElementConfig } from '@/components/playground/Configurator';
import type { TagNameWithChunk } from '@porsche-design-system/shared';

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
 * How to deal with aria attributes? Currently not shown in the configurator. 'p-icon'
 *
 * Model Signature size inherit?
 * How to handle styles in examples? style tag currently works. Inline style is missing conversion react/vanilla.js. Tailwind would be also an option. Currently affecting p-carousel, p-radio-button-wrapper (Missing spacing)
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
 * - [ ] - syntax highlight broken for p-fieldset-wrapper, radio-button-wrapper
 * - [ ] - console error when initially loading image of p-link-tile (image is still shown)
 * - [ ] - Add breakpoint customizable icon to configurator props p-tag
 * - [ ] - Error when filling in form prop and deleting again
 * - [ ] - Refactor value conversions (default value, selects...)
 */

export type ComponentsStoryTagNames = Exclude<
  TagNameWithChunk,
  'p-flex' | 'p-grid' | 'p-headline' | 'p-link-social' | 'p-marque'
>;

export type ComponentsStory = {
  [Tag in ComponentsStoryTagNames]: ElementConfig[];
};

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
  'p-heading': [
    {
      tag: 'p-heading',
      attributes: { tag: 'h3', size: 'large' },
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
      // TODO: Add story
    },
  ],
  'p-segmented-control': [
    {
      tag: 'p-segmented-control',
      // TODO: Add story
    },
  ],
  'p-select': [
    {
      tag: 'p-select',
      // TODO: Add story
    },
  ],
  'p-select-wrapper': [
    {
      tag: 'p-select-wrapper',
      // TODO: Add story
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
      // TODO: Add story
    },
  ],
  'p-stepper-horizontal': [
    {
      tag: 'p-stepper-horizontal',
      // TODO: Add story
    },
  ],
  'p-switch': [
    {
      tag: 'p-switch',
      // TODO: Add story
    },
  ],
  'p-table': [
    {
      tag: 'p-table',
      // TODO: Add story
    },
  ],
  'p-tabs': [
    {
      tag: 'p-tabs',
      // TODO: Add story
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
      // TODO: Add story
    },
  ],
  'p-tag-dismissible': [
    {
      tag: 'p-tag-dismissible',
      // TODO: Add story
    },
  ],
  'p-text': [
    {
      tag: 'p-text',
      // TODO: Add story
    },
  ],
  'p-text-field-wrapper': [
    {
      tag: 'p-text-field-wrapper',
      // TODO: Add story
    },
  ],
  'p-text-list': [
    {
      tag: 'p-text-list',
      // TODO: Add story
    },
  ],
  'p-textarea': [
    {
      tag: 'p-textarea',
      // TODO: Add story
    },
  ],
  'p-textarea-wrapper': [
    {
      tag: 'p-textarea-wrapper',
      // TODO: Add story
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
      // TODO: Add story
    },
  ],
};
