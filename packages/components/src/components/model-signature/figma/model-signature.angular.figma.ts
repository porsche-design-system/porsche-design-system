/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=7855-53842
// source=https://designsystem.porsche.com/v4/components/model-signature/api
// component=p-model-signature
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const model = instance.getEnum('model', {
  '718': '718',
  '911': '911',
  boxster: 'boxster',
  cayenne: 'cayenne',
  cayman: 'cayman',
  gt3: 'gt3',
  gts: 'gts',
  macan: 'macan',
  panamera: 'panamera',
  taycan: 'taycan',
  turbo: 'turbo',
  'gt3-rs': 'gt3-rs',
  'turbo-s': 'turbo-s',
});
const color = instance.getEnum('color', {
  primary: 'primary',
  'contrast-medium': 'contrast-medium',
  'contrast-high': 'contrast-high',
  'contrast-higher': 'contrast-high',
});

export default {
  example: figma.code`<p-model-signature [model]="'${model}'" [color]="'${color}'"></p-model-signature>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/model-signature/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-model-signature',
  metadata: { nestable: true },
};
