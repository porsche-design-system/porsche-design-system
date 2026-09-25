/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=3465-24056
// source=https://designsystem.porsche.com/v4/components/scroller/api
// component=PScroller
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const compact = instance.getEnum('compact', { false: false, true: true });
const slotDefault = instance.getSlot('slot-default');

export default {
  example: figma.code`<PScroller${compact ? ' :compact="true"' : ''}>${slotted(slotDefault, 'slot-default')}</PScroller>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/scroller/api',
    "import { PScroller } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-scroller',
  metadata: { nestable: true },
};
