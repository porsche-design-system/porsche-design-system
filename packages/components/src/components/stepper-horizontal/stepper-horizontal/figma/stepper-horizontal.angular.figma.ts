/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=32620-8703
// source=https://designsystem.porsche.com/v4/components/stepper-horizontal/api
// component=p-stepper-horizontal
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  small: 'small',
  medium: 'medium',
});

export default {
  example: figma.code`<p-stepper-horizontal [size]="'${size}'"></p-stepper-horizontal>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/stepper-horizontal/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-stepper-horizontal',
  metadata: { nestable: true },
};
