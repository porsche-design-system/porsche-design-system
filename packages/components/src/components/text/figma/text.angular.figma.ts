/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=33582-44325
// source=https://designsystem.porsche.com/v4/components/text/api
// component=p-text
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const slotDefault = instance.getString('slot-default');
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

export default {
  example: figma.code`<p-text [size]="'${size}'">${slotDefault}</p-text>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/text/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-text',
  metadata: { nestable: true },
};
