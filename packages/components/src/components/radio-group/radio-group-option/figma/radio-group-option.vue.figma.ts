/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=50-738
// source=https://designsystem.porsche.com/v4/components/radio-group/api
// component=PRadioGroupOption
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('label');

export default {
  example: figma.code`<PRadioGroupOption${label ? ` :label="'${label}'"` : ''}></PRadioGroupOption>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/radio-group/api',
    "import { PRadioGroupOption } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-radio-group-option',
  metadata: { nestable: true },
};
