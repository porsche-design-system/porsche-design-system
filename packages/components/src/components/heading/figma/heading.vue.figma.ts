/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=34134-7773
// source=https://designsystem.porsche.com/v4/components/heading/api
// component=PHeading
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const tag = instance.getString('tag');
const size = instance.getEnum('size', {
  '5xl': '5xl',
  '4xl': '4xl',
  '3xl': '3xl',
  '2xl': '2xl',
  xl: 'xl',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs',
  '2xs': '2xs',
});
const slotDefault = instance.getString('slot-default');

export default {
  example: figma.code`<PHeading${tag ? ` :tag="'${tag}'"` : ''} :size="'${size}'">${slotDefault}</PHeading>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/heading/api',
    "import { PHeading } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-heading',
  metadata: { nestable: true },
};
