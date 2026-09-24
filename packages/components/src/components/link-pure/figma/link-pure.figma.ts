/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=90-48
// source=https://designsystem.porsche.com/v4/components/link-pure/api
// component=p-link-pure
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const figIcon = instance.getBoolean('figIcon');
const icon = figIcon ? iconOf(instance.getInstanceSwap('icon'), 'arrow-right') : undefined;
const alignLabel = instance.getEnum('alignLabel', {
  end: 'end',
  start: 'start',
});
const active = instance.getEnum('active', { false: false, true: true });
const stretch = instance.getEnum('stretch', { false: false, true: true });
const hideLabel = instance.getEnum('hideLabel', { false: false, true: true });
const color = instance.getEnum('color', {
  primary: 'primary',
  'contrast-high': 'contrast-high',
  'contrast-higher': 'contrast-higher',
  'contrast-medium': 'contrast-medium',
});

export default {
  example: figma.code`<p-link-pure${icon ? ` icon="${icon}"` : ''} align-label="${alignLabel}"${active ? ' active="true"' : ''}${stretch ? ' stretch="true"' : ''}${hideLabel ? ' hide-label="true"' : ''} color="${color}"></p-link-pure>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/link-pure/api -->'],
  id: 'p-link-pure',
  metadata: { nestable: true },
};
