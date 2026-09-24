/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=3466-25517
// source=https://designsystem.porsche.com/v4/components/link-tile/api
// component=PLinkTile
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const slotHeader = instance.getSlot('slot-header');
const href = instance.getString('href');
const aspectRatio = instance.getEnum('aspectRatio', {
  '1/1': '1/1',
  '16/9': '16/9',
  '3/4': '3/4',
  '4/3': '4/3',
  '9/16': '9/16',
  auto: 'auto',
});
const align = instance.getEnum('align', {
  bottom: 'bottom',
  top: 'top',
});

export default {
  example: figma.code`<PLinkTile${href ? ` :href="'${href}'"` : ''} :aspectRatio="'${aspectRatio}'" :align="'${align}'">${slotted(slotHeader, 'slot-header', '<!-- slot="header" -->')}</PLinkTile>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/link-tile/api',
    "import { PLinkTile } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-link-tile',
  metadata: { nestable: true },
};
