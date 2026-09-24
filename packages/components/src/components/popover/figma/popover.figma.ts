/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=819-3146
// source=https://designsystem.porsche.com/v4/components/popover/api
// component=p-popover
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const slotButton = instance.getSlot('slot-button');
const slotDefault = instance.getSlot('slot-default');
const direction = instance.getEnum('direction', {
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  top: 'top',
});

export default {
  example: figma.code`<p-popover direction="${direction}">${slotted(slotButton, 'slot-button', '<!-- slot="button" -->')}${slotted(slotDefault, 'slot-default')}</p-popover>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/popover/api -->'],
  id: 'p-popover',
  metadata: { nestable: true },
};
