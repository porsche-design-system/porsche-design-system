/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=54-312
// source=https://designsystem.porsche.com/v4/components/tabs/api
// component=p-tabs-item
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const slotDefault = instance.getString('slot-default');

export default {
  example: figma.code`<p-tabs-item>${slotDefault}</p-tabs-item>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/tabs/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-tabs-item',
  metadata: { nestable: true },
};
