/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=22698-3276
// source=https://designsystem.porsche.com/v4/components/multi-select/api
// component=PMultiSelect
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const label = instance.getString('label');
const description = instance.getString('description');
const value = instance.getString('value');
const state = instance.getEnum('state', {
  error: 'error',
  success: 'success',
  none: 'none',
});
const message = instance.getString('message');
const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });
const required = instance.getBoolean('required');
const dropdownDirection = instance.getEnum('dropdownDirection', {
  auto: 'auto',
  down: 'down',
  up: 'up',
});
const compact = instance.getEnum('compact', { false: false, true: true });
const slotLabelAfter = instance.getSlot('slot-label-after');
const slotDefault = instance.getSlot('slot-default');
const slotFilter = instance.getSlot('slot-filter');

export default {
  example: figma.code`<PMultiSelect${label ? ` label="${label}"` : ''}${description ? ` description="${description}"` : ''}${value ? ` value="${value}"` : ''} state="${state}"${message ? ` message="${message}"` : ''}${hideLabel ? ' hideLabel={true}' : ''}${disabled ? ' disabled={true}' : ''}${required ? ' required={true}' : ''} dropdownDirection="${dropdownDirection}"${compact ? ' compact={true}' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '{/* slot="label-after" */}')}${slotted(slotFilter, 'slot-filter', '{/* slot="filter" */}')}${slotted(slotDefault, 'slot-default')}</PMultiSelect>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/multi-select/api',
    "import { PMultiSelect } from '@porsche-design-system/components-react';",
  ],
  id: 'p-multi-select',
  metadata: { nestable: true },
};
