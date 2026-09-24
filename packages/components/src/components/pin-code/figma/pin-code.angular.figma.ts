/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=32801-24776
// source=https://designsystem.porsche.com/v4/components/pin-code/api
// component=p-pin-code
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const label = instance.getString('label');
const description = instance.getString('description');
const message = instance.getString('message');
const required = instance.getBoolean('required');
const slotLabelAfter = instance.getSlot('slot-label-after');
const type = instance.getEnum('type', {
  number: 'number',
  password: 'password',
});
const state = instance.getEnum('state', {
  error: 'error',
  success: 'success',
  none: 'none',
});
const disabled = instance.getEnum('disabled', { false: false, true: true });
const loading = instance.getEnum('loading', { false: false, true: true });
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<p-pin-code${hideLabel ? ' [hideLabel]="true"' : ''}${label ? ` [label]="'${label}'"` : ''}${description ? ` [description]="'${description}'"` : ''}${message ? ` [message]="'${message}'"` : ''}${required ? ' [required]="true"' : ''} [type]="'${type}'" [state]="'${state}'"${disabled ? ' [disabled]="true"' : ''}${loading ? ' [loading]="true"' : ''}${compact ? ' [compact]="true"' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '<!-- slot="label-after" -->')}</p-pin-code>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/pin-code/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-pin-code',
  metadata: { nestable: true },
};
