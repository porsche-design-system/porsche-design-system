/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=32069-55211
// source=https://designsystem.porsche.com/v4/components/segmented-control/api
// component=p-segmented-control
// Auto generated - do not edit by hand.
import figma from 'figma';
import { slotted } from '../../../../../figma/helpers/slotted';

const instance = figma.selectedInstance;

const label = instance.getString('label');
const description = instance.getString('description');
const compact = instance.getEnum('compact', { false: false, true: true });
const state = instance.getEnum('state', {
  none: 'none',
  error: 'error',
  success: 'success',
});
const required = instance.getBoolean('required');
const message = instance.getString('message');
const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });
const noWrap = instance.getEnum('noWrap', { false: false, true: true });
const slotLabelAfter = instance.getSlot('slot-label-after');
const slotDefault = instance.getSlot('slot-default');

export default {
  example: figma.code`<p-segmented-control${label ? ` [label]="'${label}'"` : ''}${description ? ` [description]="'${description}'"` : ''}${compact ? ' [compact]="true"' : ''} [state]="'${state}'"${required ? ' [required]="true"' : ''}${message ? ` [message]="'${message}'"` : ''}${hideLabel ? ' [hideLabel]="true"' : ''}${disabled ? ' [disabled]="true"' : ''}${noWrap ? ' [noWrap]="true"' : ''}>${slotted(slotLabelAfter, 'slot-label-after', '<!-- slot="label-after" -->')}${slotted(slotDefault, 'slot-default')}</p-segmented-control>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/segmented-control/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-segmented-control',
  metadata: { nestable: true },
};
