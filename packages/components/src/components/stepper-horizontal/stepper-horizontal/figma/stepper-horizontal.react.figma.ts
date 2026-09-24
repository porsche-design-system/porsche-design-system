/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=32620-8703
// source=https://designsystem.porsche.com/v4/components/stepper-horizontal/api
// component=PStepperHorizontal
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  small: 'small',
  medium: 'medium',
});

export default {
  example: figma.code`<PStepperHorizontal size="${size}"></PStepperHorizontal>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/stepper-horizontal/api',
    "import { PStepperHorizontal } from '@porsche-design-system/components-react';",
  ],
  id: 'p-stepper-horizontal',
  metadata: { nestable: true },
};
