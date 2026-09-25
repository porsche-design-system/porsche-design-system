/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=25272-1118
// source=https://designsystem.porsche.com/v4/components/flyout/api
// component=PFlyout
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const position = instance.getEnum('position', {
  start: 'start',
  end: 'end',
});
const backdrop = instance.getEnum('backdrop', {
  blur: 'blur',
  shading: 'shading',
});

export default {
  example: figma.code`<PFlyout position="${position}" backdrop="${backdrop}"></PFlyout>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/flyout/api',
    "import { PFlyout } from '@porsche-design-system/components-react';",
  ],
  id: 'p-flyout',
  metadata: { nestable: true },
};
