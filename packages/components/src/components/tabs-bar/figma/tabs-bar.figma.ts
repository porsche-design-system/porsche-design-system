/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=32735-8125
// source=https://designsystem.porsche.com/v4/components/tabs-bar/api
// component=p-tabs-bar
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  small: 'small',
  medium: 'medium',
});
const background = instance.getEnum('background', {
  canvas: 'canvas',
  frosted: 'frosted',
  none: 'none',
  surface: 'surface',
});
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<p-tabs-bar size="${size}" background="${background}"${compact ? ' compact="true"' : ''}></p-tabs-bar>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/tabs-bar/api -->'],
  id: 'p-tabs-bar',
  metadata: { nestable: true },
};
