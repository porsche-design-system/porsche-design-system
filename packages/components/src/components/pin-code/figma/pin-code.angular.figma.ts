/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=32801-24776
// source=https://designsystem.porsche.com/v4/components/pin-code/api
// component=p-pin-code
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const label = instance.getString('label');
const description = instance.getString('description');
const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const state = instance.getEnum('state', {
  error: 'error',
  success: 'success',
  none: 'none',
});
const disabled = instance.getEnum('disabled', { false: false, true: true });
const loading = instance.getEnum('loading', { false: false, true: true });
const required = instance.getBoolean('required');
const message = instance.getString('message');
const type = instance.getEnum('type', {
  number: 'number',
  password: 'password',
});
const compact = instance.getEnum('compact', { false: false, true: true });
const slotLabelAfter = instance.getSlot('slot-label-after');

export default {
  example: figma.code`<p-pin-code${label ? ` [label]="'${label}'"` : ''}${description ? ` [description]="'${description}'"` : ''}${hideLabel ? ' [hideLabel]="true"' : ''} [state]="'${state}'"${disabled ? ' [disabled]="true"' : ''}${loading ? ' [loading]="true"' : ''}${required ? ' [required]="true"' : ''}${message ? ` [message]="'${message}'"` : ''} [type]="'${type}'"${compact ? ' [compact]="true"' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '<!-- slot="label-after" -->')}</p-pin-code>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/pin-code/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-pin-code',
  metadata: { nestable: true },
};
