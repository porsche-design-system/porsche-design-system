/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=819-3146
// source=https://designsystem.porsche.com/v4/components/popover/api
// component=PPopover
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const direction = instance.getEnum('direction', {
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  top: 'top',
});
const slotDefault = instance.getSlot('slot-default');
const slotButton = instance.getSlot('slot-button');

export default {
  example: figma.code`<PPopover direction="${direction}">${slotted(slotButton, 'slot-button', '{/* slot="button" */}')}${slotted(slotDefault, 'slot-default')}</PPopover>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/popover/api',
    "import { PPopover } from '@porsche-design-system/components-react';",
  ],
  id: 'p-popover',
  metadata: { nestable: true },
};
