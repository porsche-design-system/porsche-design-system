/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=45843-5743
// source=https://designsystem.porsche.com/v4/components/input-password/api
// component=PInputPassword
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const loading = instance.getBoolean('loading');
const placeholder = instance.getString('placeholder');
const toggle = instance.getBoolean('toggle');
const label = instance.getString('label');
const description = instance.getString('description');
const message = instance.getString('message');
const required = instance.getBoolean('required');
const slotStart = instance.getSlot('slot-start');
const slotEnd = instance.getSlot('slot-end');
const value = instance.getString('value');
const slotLabelAfter = instance.getSlot('slot-label-after');
const state = instance.getEnum('state', {
  none: 'none',
  error: 'error',
  success: 'success',
});
const compact = instance.getEnum('compact', { false: false, true: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });
const readOnly = instance.getEnum('readOnly', { false: false, true: true });
const hideLabel = instance.getEnum('hideLabel', { false: false, true: true });

export default {
  example: figma.code`<PInputPassword${loading ? ' :loading="true"' : ''}${placeholder ? ` :placeholder="'${placeholder}'"` : ''}${toggle ? ' :toggle="true"' : ''}${label ? ` :label="'${label}'"` : ''}${description ? ` :description="'${description}'"` : ''}${message ? ` :message="'${message}'"` : ''}${required ? ' :required="true"' : ''}${value ? ` :value="'${value}'"` : ''} :state="'${state}'"${compact ? ' :compact="true"' : ''}${disabled ? ' :disabled="true"' : ''}${readOnly ? ' :readOnly="true"' : ''}${hideLabel ? ' :hideLabel="true"' : ''}>${slotted(slotStart, 'slot-start', '<!-- slot="start" -->')}${slotted(slotEnd, 'slot-end', '<!-- slot="end" -->')}${slotted(slotLabelAfter, 'slot-label-after', '<!-- slot="label-after" -->')}</PInputPassword>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/input-password/api',
    "import { PInputPassword } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-input-password',
  metadata: { nestable: true },
};
