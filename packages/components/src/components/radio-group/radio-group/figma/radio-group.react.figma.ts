/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=51950-6333
// source=https://designsystem.porsche.com/v4/components/radio-group/api
// component=PRadioGroup
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const label = instance.getString('label');
const description = instance.getString('description');
const compact = instance.getEnum('compact', { false: false, true: true });
const direction = instance.getEnum('direction', {
  column: 'column',
  row: 'row',
});
const disabled = instance.getEnum('disabled', { false: false, true: true });
const required = instance.getBoolean('required');
const loading = instance.getEnum('loading', { false: false, true: true });
const state = instance.getEnum('state', {
  none: 'none',
  error: 'error',
  success: 'success',
});
const message = instance.getString('message');
const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const slotLabelAfter = instance.getSlot('slot-label-after');
const slotDefault = instance.getSlot('slot-default');

export default {
  example: figma.code`<PRadioGroup${label ? ` label="${label}"` : ''}${description ? ` description="${description}"` : ''}${compact ? ' compact={true}' : ''} direction="${direction}"${disabled ? ' disabled={true}' : ''}${required ? ' required={true}' : ''}${loading ? ' loading={true}' : ''} state="${state}"${message ? ` message="${message}"` : ''}${hideLabel ? ' hideLabel={true}' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '{/* slot="label-after" */}')}${slotted(slotDefault, 'slot-default')}</PRadioGroup>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/radio-group/api',
    "import { PRadioGroup } from '@porsche-design-system/components-react';",
  ],
  id: 'p-radio-group',
  metadata: { nestable: true },
};
