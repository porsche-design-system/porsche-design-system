/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=54-312
// source=https://designsystem.porsche.com/v4/components/tabs/api
// component=PTabsItem
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const slotDefault = instance.getString('slot-default');

export default {
  example: figma.code`<PTabsItem>${slotDefault}</PTabsItem>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/tabs/api',
    "import { PTabsItem } from '@porsche-design-system/components-react';",
  ],
  id: 'p-tabs-item',
  metadata: { nestable: true },
};
