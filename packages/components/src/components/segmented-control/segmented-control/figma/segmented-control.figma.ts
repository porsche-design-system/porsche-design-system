/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=32069-55211
// source=https://designsystem.porsche.com/v4/components/segmented-control/api
// component=p-segmented-control
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const slotDefault = instance.getSlot('slot-default');
const label = instance.getString('label');
const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const required = instance.getBoolean('required');
const description = instance.getString('description');
const message = instance.getString('message');
const slotLabelAfter = instance.getSlot('slot-label-after');
const state = instance.getEnum('state', {
  none: 'none',
  error: 'error',
  success: 'success',
});
const noWrap = instance.getEnum('noWrap', { false: false, true: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<p-segmented-control${label ? ` label="${label}"` : ''}${hideLabel ? ' hide-label="true"' : ''}${required ? ' required="true"' : ''}${description ? ` description="${description}"` : ''}${message ? ` message="${message}"` : ''} state="${state}"${noWrap ? ' no-wrap="true"' : ''}${disabled ? ' disabled="true"' : ''}${compact ? ' compact="true"' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '<!-- slot="label-after" -->')}${slotted(slotDefault, 'slot-default')}</p-segmented-control>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/segmented-control/api -->'],
  id: 'p-segmented-control',
  metadata: { nestable: true },
};
