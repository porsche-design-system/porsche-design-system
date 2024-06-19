import { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

export type ComponentSlots = ComponentSlot[];

// TODO: Is it possible to narrow down slot names typing from componentMeta?
type ComponentSlot = {
  name: string;
  markup: string;
  description: string;
  isShown: boolean;
};

// TODO: Extract this from code example?
export const componentSlots: { [T in TagName]: ComponentSlots } = {
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
  'p-link-tile-model-signature': [
    {
      name: '',
      markup:
        '<img src="https://porsche-design-system.github.io/porsche-design-system/dessert.jpg" width="3000" height="2000" alt="Some alt text" />',
      description: '',
      isShown: true,
    },
    {
      name: 'primary',
      markup: '<p-link slot="primary" href="https://porsche.com/#primary">Primary label</p-link>',
      description: '',
      isShown: true,
    },
    {
      name: 'secondary',
      markup: '<p-link slot="secondary" href="https://porsche.com/#secondary">Secondary label</p-link>',
      description: '',
      isShown: true,
    },
  ],
  'p-multi-select': [
    {
      name: '',
      markup: `<p-multi-select-option value="a">Option A</p-multi-select-option>
  <p-multi-select-option value="b">Option B</p-multi-select-option>
  <p-multi-select-option value="c">Option C</p-multi-select-option>
  <p-multi-select-option value="d">Option D</p-multi-select-option>
  <p-multi-select-option value="e">Option E</p-multi-select-option>
  <p-multi-select-option value="f">Option F</p-multi-select-option>`,
      description: '',
      isShown: true,
    },
  ],
};

// Extracts slot markup from sample code
function extractSlots(markup: string, component: TagName): ComponentSlots {
  const meta = getComponentMeta(component);
  const regex = /<([a-zA-Z-]+)[^>]*?\sslot="([a-zA-Z-]+)"[^>]*?>[\s\S]*?<\/\1>/g;
  const slots: ComponentSlots = [];
  let match;

  while ((match = regex.exec(markup)) !== null) {
    console.log(match);
    const [fullMatch, , slotName] = match;
    slots.push({ name: slotName, markup: fullMatch, description: '', isShown: true });
  }

  meta.namedSlots?.forEach((slot) => {
    if (!slots.find((s) => s.name === slot)) {
      throw new Error(`Slot "${slot}" is missing in example code of ${component}`);
    }
  });

  return slots;
}
