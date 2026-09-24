/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=1002-5592
// source=https://designsystem.porsche.com/v4/components/divider/api
// component=PDivider
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const color = instance.getEnum('color', {
  'contrast-lower': 'contrast-lower',
  'contrast-high': 'contrast-high',
  'contrast-low': 'contrast-low',
  'contrast-medium': 'contrast-medium',
});
const direction = instance.getEnum('direction', {
  horizontal: 'horizontal',
  vertical: 'vertical',
});

export default {
  example: figma.code`<PDivider color="${color}" direction="${direction}"></PDivider>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/divider/api',
    "import { PDivider } from '@porsche-design-system/components-react';",
  ],
  id: 'p-divider',
  metadata: { nestable: true },
};
