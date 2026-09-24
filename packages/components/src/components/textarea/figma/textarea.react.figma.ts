/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=817-3006
// source=https://designsystem.porsche.com/v4/components/textarea/api
// component=PTextarea
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const value = instance.getString('value');
const label = instance.getString('label');
const description = instance.getString('description');
const message = instance.getString('message');
const required = instance.getBoolean('required');
const slotLabelAfter = instance.getSlot('slot-label-after');
const state = instance.getEnum('state', {
  success: 'success',
  error: 'error',
  none: 'none',
});
const compact = instance.getEnum('compact', { false: false, true: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });
const readOnly = instance.getEnum('readOnly', { false: false, true: true });

export default {
  example: figma.code`<PTextarea${hideLabel ? ' hideLabel={true}' : ''}${value ? ` value="${value}"` : ''}${label ? ` label="${label}"` : ''}${description ? ` description="${description}"` : ''}${message ? ` message="${message}"` : ''}${required ? ' required={true}' : ''} state="${state}"${compact ? ' compact={true}' : ''}${disabled ? ' disabled={true}' : ''}${readOnly ? ' readOnly={true}' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '{/* slot="label-after" */}')}</PTextarea>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/textarea/api',
    "import { PTextarea } from '@porsche-design-system/components-react';",
  ],
  id: 'p-textarea',
  metadata: { nestable: true },
};
