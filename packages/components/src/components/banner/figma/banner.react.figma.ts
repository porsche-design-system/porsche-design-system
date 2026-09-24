/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=7670-54339
// source=https://designsystem.porsche.com/v4/components/banner/api
// component=PBanner
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const dismissButton = instance.getBoolean('dismissButton');
const heading = instance.getString('heading');
const slotDefault = instance.getString('slot-default');
const headingTag = instance.getString('headingTag');
const state = instance.getEnum('state', {
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success',
});

export default {
  example: figma.code`<PBanner${dismissButton ? ' dismissButton={true}' : ''}${heading ? ` heading="${heading}"` : ''}${headingTag ? ` headingTag="${headingTag}"` : ''} state="${state}">${slotDefault}</PBanner>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/banner/api',
    "import { PBanner } from '@porsche-design-system/components-react';",
  ],
  id: 'p-banner',
  metadata: { nestable: true },
};
