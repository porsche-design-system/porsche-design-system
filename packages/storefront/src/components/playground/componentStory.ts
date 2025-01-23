import type { ElementConfig } from '@/components/playground/Configurator';
import type { TagNameWithChunk } from 'shared/src';

/**
 * Questions:
 * How to specify which slot/prop is shown/rendered in the markup? Currently all slots have to be specified in the story.
 * Add story information to componentMeta directly?
 * How to deal with href vs slotted anchor (slotsMeta already has hasAltProp but only for named slots )?
 * ButtonGroup has breakpoint customizable as default value. Currently not shown in the select of direction.
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
 */

export type ComponentsStory = {
  [Tag in TagNameWithChunk]: ElementConfig;
};

export const componentsStory: ComponentsStory = {
  'p-accordion': {
    tag: 'p-accordion',
    // TODO: Add story
  },
  'p-banner': {
    tag: 'p-banner',
    // TODO: Add story
  },
  'p-button': {
    tag: 'p-button',
    attributes: { hideLabel: true, icon: 'arrow-right' },
    children: ['Some label'],
  },
  'p-button-group': {
    tag: 'p-button-group',
    children: [
      { tag: 'p-button', attributes: { variant: 'primary' }, children: ['Some label'] },
      { tag: 'p-button', attributes: { variant: 'secondary' }, children: ['Some label'] },
    ],
  },
  'p-button-pure': {
    tag: 'p-button-pure',
    children: ['Some label'],
  },
  'p-button-tile': {
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
  'p-canvas': {
    tag: 'p-canvas',
    // TODO: Add story
  },
  'p-carousel': {
    tag: 'p-carousel',
    // TODO: Add story
  },
  'p-checkbox': {
    tag: 'p-checkbox',
    // TODO: Add story
  },
  'p-checkbox-wrapper': {
    tag: 'p-checkbox-wrapper',
    // TODO: Add story
  },
  'p-content-wrapper': {
    tag: 'p-content-wrapper',
    // TODO: Add story
  },
  'p-crest': {
    tag: 'p-crest',
    // TODO: Add story
  },
  'p-display': {
    tag: 'p-display',
    // TODO: Add story
  },
  'p-divider': {
    tag: 'p-divider',
    // TODO: Add story
  },
  'p-fieldset': {
    tag: 'p-fieldset',
    // TODO: Add story
  },
  'p-fieldset-wrapper': {
    tag: 'p-fieldset-wrapper',
    // TODO: Add story
  },
  'p-flex': {
    tag: 'p-flex',
    // TODO: Add story
  },
  'p-flyout': {
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
  'p-flyout-multilevel': {
    tag: 'p-flyout-multilevel',
    // TODO: Add story
  },
  'p-grid': {
    tag: 'p-grid',
    // TODO: Add story
  },
  'p-heading': {
    tag: 'p-heading',
    // TODO: Add story
  },
  'p-headline': {
    tag: 'p-headline',
    // TODO: Add story
  },
  'p-icon': {
    tag: 'p-icon',
    // TODO: Add story
  },
  'p-inline-notification': {
    tag: 'p-inline-notification',
    // TODO: Add story
  },
  'p-link': {
    tag: 'p-link',
    // TODO: Add story
  },
  'p-link-pure': {
    tag: 'p-link-pure',
    // TODO: Add story
  },
  'p-link-social': {
    tag: 'p-link-social',
    // TODO: Add story
  },
  'p-link-tile': {
    tag: 'p-link-tile',
  },
  // 'p-link-tile': {
  //   propsStory: {
  //     href: { value: 'https://porsche.com' },
  //     label: { value: 'Some label' },
  //     description: { value: 'Some Description' },
  //   },
  // },
  'p-link-tile-model-signature': {
    tag: 'p-link-tile-model-signature',
  },
  // 'p-link-tile-model-signature': {
  //   propsStory: {
  //     heading: { value: 'Some heading' },
  //     description: { value: 'Some description' },
  //   },
  // },
  'p-link-tile-product': {
    tag: 'p-link-tile-product',
    // TODO: Add story
  },
  'p-marque': {
    tag: 'p-marque',
    // TODO: Add story
  },
  'p-modal': {
    tag: 'p-modal',
    // TODO: Add story
  },
  'p-model-signature': {
    tag: 'p-model-signature',
    // TODO: Add story
  },
  'p-multi-select': {
    tag: 'p-multi-select',
  },
  // 'p-multi-select': {
  //   propsStory: {
  //     name: { value: 'options' },
  //     label: { value: 'Some label' },
  //     description: { value: 'Some description' },
  //   },
  // },
  'p-optgroup': {
    tag: 'p-optgroup',
    // TODO: Add story
  },
  'p-pagination': {
    tag: 'p-pagination',
    // TODO: Add story
  },
  'p-pin-code': {
    tag: 'p-pin-code',
    // TODO: Add story
  },
  'p-popover': {
    tag: 'p-popover',
    // TODO: Add story
  },
  'p-radio-button-wrapper': {
    tag: 'p-radio-button-wrapper',
    // TODO: Add story
  },
  'p-scroller': {
    tag: 'p-scroller',
    // TODO: Add story
  },
  'p-segmented-control': {
    tag: 'p-segmented-control',
    // TODO: Add story
  },
  'p-select': {
    tag: 'p-select',
    // TODO: Add story
  },
  'p-select-wrapper': {
    tag: 'p-select-wrapper',
    // TODO: Add story
  },
  'p-sheet': {
    tag: 'p-sheet',
    // TODO: Add story
  },
  'p-spinner': {
    tag: 'p-spinner',
    // TODO: Add story
  },
  'p-stepper-horizontal': {
    tag: 'p-stepper-horizontal',
    // TODO: Add story
  },
  'p-switch': {
    tag: 'p-switch',
    // TODO: Add story
  },
  'p-table': {
    tag: 'p-table',
    // TODO: Add story
  },
  'p-tabs': {
    tag: 'p-tabs',
    // TODO: Add story
  },
  'p-tabs-bar': {
    tag: 'p-tabs-bar',
    // TODO: Add story
  },
  'p-tag': {
    tag: 'p-tag',
    // TODO: Add story
  },
  'p-tag-dismissible': {
    tag: 'p-tag-dismissible',
    // TODO: Add story
  },
  'p-text': {
    tag: 'p-text',
    // TODO: Add story
  },
  'p-text-field-wrapper': {
    tag: 'p-text-field-wrapper',
    // TODO: Add story
  },
  'p-text-list': {
    tag: 'p-text-list',
    // TODO: Add story
  },
  'p-textarea': {
    tag: 'p-textarea',
    // TODO: Add story
  },
  'p-textarea-wrapper': {
    tag: 'p-textarea-wrapper',
    // TODO: Add story
  },
  'p-toast': {
    tag: 'p-toast',
    // TODO: Add story
  },
  'p-wordmark': {
    tag: 'p-wordmark',
    // TODO: Add story
  },
};
