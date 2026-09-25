/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=34317-74666
// source=https://designsystem.porsche.com/v4/components/button-tile/api
// component=PButtonTile
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

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
const slotHeader = instance.getSlot('slot-header');

export default {
  example: figma.code`<PButtonTile :aspectRatio="'${aspectRatio}'" :align="'${align}'">${slotted(slotHeader, 'slot-header', '<!-- slot="header" -->')}</PButtonTile>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/button-tile/api',
    "import { PButtonTile } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-button-tile',
  metadata: { nestable: true },
};
