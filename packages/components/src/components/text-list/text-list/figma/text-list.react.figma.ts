/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=33058-30896
// source=https://designsystem.porsche.com/v4/components/text-list/api
// component=PTextList
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('type', {
  unordered: 'unordered',
  numbered: 'numbered',
  alphabetically: 'alphabetically',
  mixed: 'unordered',
});

export default {
  example: figma.code`<PTextList type="${type}"></PTextList>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/text-list/api',
    "import { PTextList } from '@porsche-design-system/components-react';",
  ],
  id: 'p-text-list',
  metadata: { nestable: true },
};
