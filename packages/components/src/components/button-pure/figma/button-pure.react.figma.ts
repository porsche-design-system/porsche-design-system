/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=33041-10759
// source=https://designsystem.porsche.com/v4/components/button-pure/api
// component=PButtonPure
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const disabled = instance.getEnum('disabled', { false: false, true: true });
const loading = instance.getEnum('loading', { false: false, true: true });
const color = instance.getEnum('color', {
  'contrast-high': 'contrast-high',
  'contrast-higher': 'contrast-higher',
  'contrast-medium': 'contrast-medium',
  primary: 'primary',
});
const figIcon = instance.getBoolean('figIcon');
const icon = figIcon ? iconOf(instance.getInstanceSwap('icon'), 'arrow-right') : undefined;
const active = instance.getEnum('active', { false: false, true: true });
const hideLabel = instance.getEnum('hideLabel', { false: false, true: true });
const alignLabel = instance.getEnum('alignLabel', {
  end: 'end',
  start: 'start',
});
const stretch = instance.getEnum('stretch', { false: false, true: true });

export default {
  example: figma.code`<PButtonPure${disabled ? ' disabled={true}' : ''}${loading ? ' loading={true}' : ''} color="${color}"${icon ? ` icon="${icon}"` : ''}${active ? ' active={true}' : ''}${hideLabel ? ' hideLabel={true}' : ''} alignLabel="${alignLabel}"${stretch ? ' stretch={true}' : ''}></PButtonPure>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/button-pure/api',
    "import { PButtonPure } from '@porsche-design-system/components-react';",
  ],
  id: 'p-button-pure',
  metadata: { nestable: true },
};
