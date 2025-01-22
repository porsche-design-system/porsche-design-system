import type { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';

/**
 * Questions:
 * Add story information to componentMeta directly?
 */

export type PropStory = {
  value: string;
};

export type SlotStory = {
  markup: string;
  description: string;
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
        markup: '<p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>',
        description: 'Renders a sticky header section above the content area.',
        isShown: false,
      },
      '': {
        markup: '<p-text>Some Content</p-text>',
        description: '',
        isShown: true,
      },
      footer: {
        markup: `<p-button-group slot="footer">
    <p-button type="button">Proceed</p-button>
    <p-button type="button" variant="secondary">Cancel</p-button>
  </p-button-group>`,
        description: 'Shows a sticky footer section, flowing under the content area when scrollable.',
        isShown: false,
      },
      'sub-footer': {
        name: 'sub-footer',
        markup: '<p-text slot="sub-footer">Some additional Sub-Footer</p-text>',
        description:
          'Shows a sub-footer section to display additional information below the footer. This slot is ideal for less critical content, such as legal information or FAQs, which provides further details to the user. It appears when scrolling to the end of the flyout or when there is available space to accommodate the content.',
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
