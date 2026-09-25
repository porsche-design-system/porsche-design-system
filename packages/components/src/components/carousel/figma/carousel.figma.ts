/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=35039-9223
// source=https://designsystem.porsche.com/v4/components/carousel/api
// component=p-carousel
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const width = instance.getEnum('width', {
  basic: 'basic',
  extended: 'extended',
  wide: 'wide',
  full: 'full',
});
const pagination = instance.getBoolean('pagination');

export default {
  example: figma.code`<p-carousel width="${width}"${pagination ? ' pagination="true"' : ''}></p-carousel>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/carousel/api -->'],
  id: 'p-carousel',
  metadata: { nestable: true },
};
