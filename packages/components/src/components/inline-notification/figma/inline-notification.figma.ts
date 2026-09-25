/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=934-5761
// source=https://designsystem.porsche.com/v4/components/inline-notification/api
// component=p-inline-notification
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const heading = instance.getString('heading');
const headingTag = instance.getString('headingTag');
const state = instance.getEnum('state', {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
});
const dismissButton = instance.getBoolean('dismissButton');
const actionLabel = instance.getString('actionLabel');
const actionIcon = iconOf(instance.getInstanceSwap('actionIcon'), 'arrow-right');
const slotDefault = instance.getString('slot-default');

export default {
  example: figma.code`<p-inline-notification${heading ? ` heading="${heading}"` : ''}${headingTag ? ` heading-tag="${headingTag}"` : ''} state="${state}"${dismissButton ? ' dismiss-button="true"' : ''}${actionLabel ? ` action-label="${actionLabel}"` : ''}${actionIcon ? ` action-icon="${actionIcon}"` : ''}>${slotDefault}</p-inline-notification>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/inline-notification/api -->'],
  id: 'p-inline-notification',
  metadata: { nestable: true },
};
