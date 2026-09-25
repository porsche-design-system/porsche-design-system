/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=31888-50809
// source=https://designsystem.porsche.com/v4/components/spinner/api
// component=p-spinner
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  lg: 'lg',
  md: 'md',
  '2xs': '2xs',
  xs: 'xs',
  xl: 'xl',
  '2xl': '2xl',
  '3xl': '3xl',
  '4xl': '4xl',
  '5xl': '5xl',
  inherit: 'inherit',
  sm: 'sm',
});

export default {
  example: figma.code`<p-spinner [size]="'${size}'"></p-spinner>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/spinner/api',
    "import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';",
  ],
  id: 'p-spinner',
  metadata: { nestable: true },
};
