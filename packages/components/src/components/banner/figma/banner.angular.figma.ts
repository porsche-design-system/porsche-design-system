/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=7670-54339
// source=https://designsystem.porsche.com/v4/components/banner/api
// component=p-banner
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const heading = instance.getString('heading');
const headingTag = instance.getString('headingTag');
const state = instance.getEnum('state', {
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success',
});
const dismissButton = instance.getBoolean('dismissButton');
const slotDefault = instance.getString('slot-default');

export default {
  example: figma.code`<p-banner${heading ? ` [heading]="'${heading}'"` : ''}${headingTag ? ` [headingTag]="'${headingTag}'"` : ''} [state]="'${state}'"${dismissButton ? ' [dismissButton]="true"' : ''}>${slotDefault}</p-banner>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/banner/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-banner',
  metadata: { nestable: true },
};
