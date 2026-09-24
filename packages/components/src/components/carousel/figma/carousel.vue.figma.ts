/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=35039-9223
// source=https://designsystem.porsche.com/v4/components/carousel/api
// component=PCarousel
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const pagination = instance.getBoolean('pagination');
const width = instance.getEnum('width', {
  basic: 'basic',
  extended: 'extended',
  wide: 'wide',
  full: 'full',
});

export default {
  example: figma.code`<PCarousel${pagination ? ' :pagination="true"' : ''} :width="'${width}'"></PCarousel>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/carousel/api',
    "import { PCarousel } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-carousel',
  metadata: { nestable: true },
};
