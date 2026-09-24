/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=934-5761
// source=https://designsystem.porsche.com/v4/components/inline-notification/api
// component=p-inline-notification
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const dismissButton = instance.getBoolean('dismissButton');
const heading = instance.getString('heading');
const slotDefault = instance.getString('slot-default');
const headingTag = instance.getString('headingTag');
const actionLabel = instance.getString('actionLabel');
const actionIcon = iconOf(instance.getInstanceSwap('actionIcon'), 'arrow-right');
const state = instance.getEnum('state', {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
});

export default {
  example: figma.code`<p-inline-notification${dismissButton ? ' [dismissButton]="true"' : ''}${heading ? ` [heading]="'${heading}'"` : ''}${headingTag ? ` [headingTag]="'${headingTag}'"` : ''}${actionLabel ? ` [actionLabel]="'${actionLabel}'"` : ''}${actionIcon ? ` [actionIcon]="'${actionIcon}'"` : ''} [state]="'${state}'">${slotDefault}</p-inline-notification>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/inline-notification/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-inline-notification',
  metadata: { nestable: true },
};
