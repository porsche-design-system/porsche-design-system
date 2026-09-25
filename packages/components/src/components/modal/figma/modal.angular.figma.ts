/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=32235-4753
// source=https://designsystem.porsche.com/v4/components/modal/api
// component=p-modal
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const backdrop = instance.getEnum('backdrop', {
  blur: 'blur',
  shading: 'shading',
});

export default {
  example: figma.code`<p-modal [backdrop]="'${backdrop}'"></p-modal>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/modal/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-modal',
  metadata: { nestable: true },
};
