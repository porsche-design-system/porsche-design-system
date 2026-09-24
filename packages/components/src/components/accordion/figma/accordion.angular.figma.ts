/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=53739-19418
// source=https://designsystem.porsche.com/v4/components/accordion/api
// component=p-accordion
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const slotDefault = instance.getSlot('slot-default');
const slotSummary = instance.getSlot('slot-summary');
const slotSummaryBefore = instance.getSlot('slot-summary-before');
const slotSummaryAfter = instance.getSlot('slot-summary-after');
const open = instance.getEnum('open', { false: false, true: true });
const alignMarker = instance.getEnum('alignMarker', {
  end: 'end',
  start: 'start',
});
const background = instance.getEnum('background', {
  none: 'none',
  canvas: 'canvas',
  frosted: 'frosted',
  surface: 'surface',
});
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<p-accordion${open ? ' [open]="true"' : ''} [alignMarker]="'${alignMarker}'" [background]="'${background}'"${compact ? ' [compact]="true"' : ''}>${slotted(slotSummary, 'slot-summary', '<!-- slot="summary" -->')}${slotted(slotSummaryBefore, 'slot-summary-before', '<!-- slot="summary-before" -->')}${slotted(slotSummaryAfter, 'slot-summary-after', '<!-- slot="summary-after" -->')}${slotted(slotDefault, 'slot-default')}</p-accordion>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/accordion/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-accordion',
  metadata: { nestable: true },
};
