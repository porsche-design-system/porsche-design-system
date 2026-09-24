/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=59836-7480
// source=https://designsystem.porsche.com/v4/components/multi-select/api
// component=PMultiSelectOption
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const disabled = instance.getEnum('disabled', { false: false, true: true });

export default {
  example: figma.code`<PMultiSelectOption${disabled ? ' disabled={true}' : ''}></PMultiSelectOption>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/multi-select/api',
    "import { PMultiSelectOption } from '@porsche-design-system/components-react';",
  ],
  id: 'p-multi-select-option',
  metadata: { nestable: true },
};
