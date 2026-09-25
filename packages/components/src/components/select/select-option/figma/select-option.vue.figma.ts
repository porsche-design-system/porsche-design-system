/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=59836-7910
// source=https://designsystem.porsche.com/v4/components/select/api
// component=PSelectOption
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const value = instance.getString('value');
const disabled = instance.getEnum('disabled', { false: false, true: true });

export default {
  example: figma.code`<PSelectOption${value ? ` :value="'${value}'"` : ''}${disabled ? ' :disabled="true"' : ''}></PSelectOption>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/select/api',
    "import { PSelectOption } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-select-option',
  metadata: { nestable: true },
};
