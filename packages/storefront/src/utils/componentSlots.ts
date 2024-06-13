import { TagName } from '@porsche-design-system/shared';

// TODO: Is it possible to narrow down slot names typing from componentMeta?
export type Slot = {
  name: string;
  markup: string;
  description: string;
  isShown: boolean;
};

export const componentSlots: { [T in TagName]: Slot[] } = {
  'p-flyout': [
    {
      name: 'header',
      markup: '<p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>',
      description: 'Renders a sticky header section above the content area.',
      isShown: false,
    },
    {
      name: '',
      markup: '<p-text>Some Content</p-text>',
      description: '',
      isShown: true,
    },
    {
      name: 'footer',
      markup: `<p-button-group slot="footer">
    <p-button type="button">Proceed</p-button>
    <p-button type="button" variant="secondary">Cancel</p-button>
  </p-button-group>`,
      description: 'Shows a sticky footer section, flowing under the content area when scrollable.',
      isShown: false,
    },
    {
      name: 'sub-footer',
      markup: '<p-text slot="sub-footer">Some additional Sub-Footer</p-text>',
      description:
        'Shows a sub-footer section to display additional information below the footer. This slot is ideal for less critical content, such as legal information or FAQs, which provides further details to the user. It appears when scrolling to the end of the flyout or when there is available space to accommodate the content.',
      isShown: false,
    },
  ],
};
