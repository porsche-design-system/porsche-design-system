/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=33582-44325
// source=https://designsystem.porsche.com/v4/components/text/api
// component=PText
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  '2xs': '2xs',
  xl: 'xl',
  xs: 'xs',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  '2xl': '2xl',
  '3xl': '3xl',
  '4xl': '4xl',
  '5xl': '5xl',
});
const slotDefault = instance.getString('slot-default');

export default {
  example: figma.code`<PText :size="'${size}'">${slotDefault}</PText>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/text/api',
    "import { PText } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-text',
  metadata: { nestable: true },
};
