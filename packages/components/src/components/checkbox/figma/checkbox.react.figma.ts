/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=50-651
// source=https://designsystem.porsche.com/v4/components/checkbox/api
// component=PCheckbox
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const required = instance.getBoolean('required');
const disabled = instance.getEnum('disabled', { false: false, true: true });
const indeterminate = instance.getEnum('indeterminate', { false: false, true: true });
const checked = instance.getEnum('checked', { false: false, true: true });
const label = instance.getString('label');
const state = instance.getEnum('state', {
  error: 'error',
  none: 'none',
  success: 'success',
});
const message = instance.getString('message');
const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const loading = instance.getEnum('loading', { false: false, true: true });
const compact = instance.getEnum('compact', { false: false, true: true });
const slotLabelAfter = instance.getSlot('slot-label-after');

export default {
  example: figma.code`<PCheckbox${required ? ' required={true}' : ''}${disabled ? ' disabled={true}' : ''}${indeterminate ? ' indeterminate={true}' : ''}${checked ? ' checked={true}' : ''}${label ? ` label="${label}"` : ''} state="${state}"${message ? ` message="${message}"` : ''}${hideLabel ? ' hideLabel={true}' : ''}${loading ? ' loading={true}' : ''}${compact ? ' compact={true}' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '{/* slot="label-after" */}')}</PCheckbox>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/checkbox/api',
    "import { PCheckbox } from '@porsche-design-system/components-react';",
  ],
  id: 'p-checkbox',
  metadata: { nestable: true },
};
