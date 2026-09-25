/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=48551-6605
// source=https://designsystem.porsche.com/v4/components/input-time/api
// component=PInputTime
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const label = instance.getString('label');
const description = instance.getString('description');
const compact = instance.getEnum('compact', { false: false, true: true });
const value = instance.getString('value');
const readOnly = instance.getEnum('readOnly', { false: false, true: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });
const required = instance.getBoolean('required');
const loading = instance.getBoolean('loading');
const state = instance.getEnum('state', {
  none: 'none',
  error: 'error',
  success: 'success',
});
const message = instance.getString('message');
const hideLabel = instance.getEnum('hideLabel', { false: false, true: true });
const slotLabelAfter = instance.getSlot('slot-label-after');
const slotStart = instance.getSlot('slot-start');
const slotEnd = instance.getSlot('slot-end');

export default {
  example: figma.code`<PInputTime${label ? ` label="${label}"` : ''}${description ? ` description="${description}"` : ''}${compact ? ' compact={true}' : ''}${value ? ` value="${value}"` : ''}${readOnly ? ' readOnly={true}' : ''}${disabled ? ' disabled={true}' : ''}${required ? ' required={true}' : ''}${loading ? ' loading={true}' : ''} state="${state}"${message ? ` message="${message}"` : ''}${hideLabel ? ' hideLabel={true}' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '{/* slot="label-after" */}')}${slotted(slotStart, 'slot-start', '{/* slot="start" */}')}${slotted(slotEnd, 'slot-end', '{/* slot="end" */}')}</PInputTime>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/input-time/api',
    "import { PInputTime } from '@porsche-design-system/components-react';",
  ],
  id: 'p-input-time',
  metadata: { nestable: true },
};
