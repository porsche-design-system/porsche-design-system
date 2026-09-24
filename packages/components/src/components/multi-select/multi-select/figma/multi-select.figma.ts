/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=22698-3276
// source=https://designsystem.porsche.com/v4/components/multi-select/api
// component=p-multi-select
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
const slotFilter = instance.getSlot('slot-filter');
const value = instance.getString('value');
const slotLabelAfter = instance.getSlot('slot-label-after');
const state = instance.getEnum('state', {
  error: 'error',
  success: 'success',
  none: 'none',
});
const dropdownDirection = instance.getEnum('dropdownDirection', {
  auto: 'auto',
  down: 'down',
  up: 'up',
});
const compact = instance.getEnum('compact', { false: false, true: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });

export default {
  example: figma.code`<p-multi-select${hideLabel ? ' hide-label="true"' : ''}${label ? ` label="${label}"` : ''}${description ? ` description="${description}"` : ''}${message ? ` message="${message}"` : ''}${required ? ' required="true"' : ''}${value ? ` value="${value}"` : ''} state="${state}" dropdown-direction="${dropdownDirection}"${compact ? ' compact="true"' : ''}${disabled ? ' disabled="true"' : ''}>${slotted(slotFilter, 'slot-filter', '<!-- slot="filter" -->')}${slotted(slotLabelAfter, 'slot-label-after', '<!-- slot="label-after" -->')}${slotted(slotDefault, 'slot-default')}</p-multi-select>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/multi-select/api -->'],
  id: 'p-multi-select',
  metadata: { nestable: true },
};
