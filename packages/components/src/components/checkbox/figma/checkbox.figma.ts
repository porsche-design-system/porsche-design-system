/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=50-651
// source=https://designsystem.porsche.com/v4/components/checkbox/api
// component=p-checkbox
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const label = instance.getString('label');
const message = instance.getString('message');
const required = instance.getBoolean('required');
const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const slotLabelAfter = instance.getSlot('slot-label-after');
const compact = instance.getEnum('compact', { false: false, true: true });
const state = instance.getEnum('state', {
  error: 'error',
  none: 'none',
  success: 'success',
});
const disabled = instance.getEnum('disabled', { false: false, true: true });
const loading = instance.getEnum('loading', { false: false, true: true });
const indeterminate = instance.getEnum('indeterminate', { false: false, true: true });
const checked = instance.getEnum('checked', { false: false, true: true });

export default {
  example: figma.code`<p-checkbox${label ? ` label="${label}"` : ''}${message ? ` message="${message}"` : ''}${required ? ' required="true"' : ''}${hideLabel ? ' hide-label="true"' : ''}${compact ? ' compact="true"' : ''} state="${state}"${disabled ? ' disabled="true"' : ''}${loading ? ' loading="true"' : ''}${indeterminate ? ' indeterminate="true"' : ''}${checked ? ' checked="true"' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '<!-- slot="label-after" -->')}</p-checkbox>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/checkbox/api -->'],
  id: 'p-checkbox',
  metadata: { nestable: true },
};
