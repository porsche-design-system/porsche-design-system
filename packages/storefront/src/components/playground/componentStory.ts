import type { ElementConfig } from '@/components/playground/Configurator';
import type { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';

/**
 * Questions:
 * Add story information to componentMeta directly?
 * How to deal with href vs slotted anchor (slotsMeta already has hasAltProp but only for named slots )?
 */

export type PropStory = {
  value: string;
};

export type SlotStory = {
  markup: ElementConfig;
  isShown: boolean;
};

// TODO: Fix typing, should not allow props/slots which are not defined in componentMeta
export type ComponentStory<Tag extends TagName> = {
  propsStory?: {
    [Prop in keyof (typeof componentMeta)[Tag]['propsMeta']]: PropStory; // Keys restricted to propsMeta of the given TagName
  };
  slotsStory?: {
    [Slot in keyof (typeof componentMeta)[Tag]['slotsMeta']]: SlotStory; // Keys restricted to slotsMeta of the given TagName
  };
};

export type ComponentsStory = {
  [Tag in TagName]: ComponentStory<Tag>;
};

export const componentsStory: ComponentsStory = {
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
    slotsStory: {
      header: {
        markup: {
          tag: 'p-heading',
          attributes: { slot: 'header', size: 'large', tag: 'h2' },
          children: ['Some Heading'],
        },
        isShown: false,
      },
      '': {
        markup: { tag: 'p-text', attributes: { slot: '' }, children: ['Some Content'] },
        description: '',
        isShown: true,
      },
      footer: {
        markup: {
          tag: 'p-button-group',
          attributes: { slot: 'footer' },
          children: [
            { tag: 'p-button', attributes: { type: 'button' }, children: ['Proceed'] },
            { tag: 'p-button', attributes: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
          ],
        },
        isShown: false,
      },
      'sub-footer': {
        name: 'sub-footer',
        markup: { tag: 'p-text', attributes: { slot: 'sub-footer' }, children: ['Some additional Sub-Footer'] },
        isShown: false,
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
  'p-link-tile': {
    propsStory: {
      href: { value: 'https://porsche.com' },
      label: { value: 'Some label' },
      description: { value: 'Some Description' },
    },
  },
  'p-link-tile-model-signature': {
    propsStory: {
      heading: { value: 'Some heading' },
      description: { value: 'Some description' },
    },
  },
  'p-link-tile-product': {},
  'p-marque': {},
  'p-modal': {},
  'p-model-signature': {},
  'p-multi-select': {
    propsStory: {
      name: { value: 'options' },
      label: { value: 'Some label' },
      description: { value: 'Some description' },
    },
  },
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
  'p-select-wrapper-dropdown': {},
  'p-sheet': {},
  'p-spinner': {},
  'p-stepper-horizontal': {},
  'p-stepper-horizontal-item': {},
  'p-switch': {},
  'p-table': {},
  'p-table-body': {},
  'p-table-cell': {},
  'p-table-head': {},
  'p-table-head-cell': {},
  'p-table-head-row': {},
  'p-table-row': {},
  'p-tabs': {},
  'p-tabs-bar': {},
  'p-tabs-item': {},
  'p-tag': {},
  'p-tag-dismissible': {},
  'p-text': {},
  'p-text-field-wrapper': {},
  'p-text-list': {},
  'p-text-list-item': {},
  'p-textarea': {},
  'p-textarea-wrapper': {},
  'p-toast': {},
  'p-toast-item': {},
  'p-wordmark': {},
};
