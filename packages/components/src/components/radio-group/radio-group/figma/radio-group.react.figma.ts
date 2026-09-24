/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=51950-6333
// source=https://designsystem.porsche.com/v4/components/radio-group/api
// component=PRadioGroup
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const label = instance.getString('label');
const description = instance.getString('description');
const message = instance.getString('message');
const required = instance.getBoolean('required');
const slotDefault = instance.getSlot('slot-default');
const slotLabelAfter = instance.getSlot('slot-label-after');
const state = instance.getEnum('state', {
  none: 'none',
  error: 'error',
  success: 'success',
});
const direction = instance.getEnum('direction', {
  column: 'column',
  row: 'row',
});
const loading = instance.getEnum('loading', { false: false, true: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<PRadioGroup${hideLabel ? ' hideLabel={true}' : ''}${label ? ` label="${label}"` : ''}${description ? ` description="${description}"` : ''}${message ? ` message="${message}"` : ''}${required ? ' required={true}' : ''} state="${state}" direction="${direction}"${loading ? ' loading={true}' : ''}${disabled ? ' disabled={true}' : ''}${compact ? ' compact={true}' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '{/* slot="label-after" */}')}${slotted(slotDefault, 'slot-default')}</PRadioGroup>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/radio-group/api',
    "import { PRadioGroup } from '@porsche-design-system/components-react';",
  ],
  id: 'p-radio-group',
  metadata: { nestable: true },
};
