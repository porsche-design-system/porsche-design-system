/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=3465-24056
// source=https://designsystem.porsche.com/v4/components/scroller/api
// component=p-scroller
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const slotDefault = instance.getSlot('slot-default');
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<p-scroller${compact ? ' compact="true"' : ''}>${slotted(slotDefault, 'slot-default')}</p-scroller>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/scroller/api -->'],
  id: 'p-scroller',
  metadata: { nestable: true },
};
