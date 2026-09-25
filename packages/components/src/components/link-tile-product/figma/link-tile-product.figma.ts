/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=26842-12552
// source=https://designsystem.porsche.com/v4/components/link-tile-product/api
// component=p-link-tile-product
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const heading = instance.getString('heading');
const price = instance.getString('price');
const description = instance.getString('description');
const aspectRatio = instance.getEnum('aspectRatio', {
  '3/4': '3/4',
  '9/16': '9/16',
});

export default {
  example: figma.code`<p-link-tile-product${heading ? ` heading="${heading}"` : ''}${price ? ` price="${price}"` : ''}${description ? ` description="${description}"` : ''} aspect-ratio="${aspectRatio}"></p-link-tile-product>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/link-tile-product/api -->'],
  id: 'p-link-tile-product',
  metadata: { nestable: true },
};
