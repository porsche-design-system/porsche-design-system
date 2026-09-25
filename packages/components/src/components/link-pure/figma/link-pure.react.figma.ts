/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=90-48
// source=https://designsystem.porsche.com/v4/components/link-pure/api
// component=PLinkPure
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const alignLabel = instance.getEnum('alignLabel', {
  end: 'end',
  start: 'start',
});
const stretch = instance.getEnum('stretch', { false: false, true: true });
const color = instance.getEnum('color', {
  primary: 'primary',
  'contrast-high': 'contrast-high',
  'contrast-higher': 'contrast-higher',
  'contrast-medium': 'contrast-medium',
});
const figIcon = instance.getBoolean('figIcon');
const icon = figIcon ? iconOf(instance.getInstanceSwap('icon'), 'arrow-right') : undefined;
const active = instance.getEnum('active', { false: false, true: true });
const hideLabel = instance.getEnum('hideLabel', { false: false, true: true });

export default {
  example: figma.code`<PLinkPure alignLabel="${alignLabel}"${stretch ? ' stretch={true}' : ''} color="${color}"${icon ? ` icon="${icon}"` : ''}${active ? ' active={true}' : ''}${hideLabel ? ' hideLabel={true}' : ''}></PLinkPure>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/link-pure/api',
    "import { PLinkPure } from '@porsche-design-system/components-react';",
  ],
  id: 'p-link-pure',
  metadata: { nestable: true },
};
