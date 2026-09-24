/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=1029-5922
// source=https://designsystem.porsche.com/v4/components/segmented-control/api
// component=PSegmentedControlItem
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const figIcon = instance.getBoolean('figIcon');
const icon = figIcon ? iconOf(instance.getInstanceSwap('icon'), 'globe') : undefined;
const slotDefault = instance.getString('slot-default');
const label = instance.getString('label');

export default {
  example: figma.code`<PSegmentedControlItem${icon ? ` icon="${icon}"` : ''}${label ? ` label="${label}"` : ''}>${slotDefault}</PSegmentedControlItem>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/segmented-control/api',
    "import { PSegmentedControlItem } from '@porsche-design-system/components-react';",
  ],
  id: 'p-segmented-control-item',
  metadata: { nestable: true },
};
