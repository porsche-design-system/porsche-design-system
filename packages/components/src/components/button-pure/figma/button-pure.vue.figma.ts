/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=33041-10759
// source=https://designsystem.porsche.com/v4/components/button-pure/api
// component=PButtonPure
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
const disabled = instance.getEnum('disabled', { false: false, true: true });
const loading = instance.getEnum('loading', { false: false, true: true });
const active = instance.getEnum('active', { false: false, true: true });
const stretch = instance.getEnum('stretch', { false: false, true: true });
const hideLabel = instance.getEnum('hideLabel', { false: false, true: true });
const color = instance.getEnum('color', {
  'contrast-high': 'contrast-high',
  'contrast-higher': 'contrast-higher',
  'contrast-medium': 'contrast-medium',
  primary: 'primary',
});

export default {
  example: figma.code`<PButtonPure${icon ? ` :icon="'${icon}'"` : ''} :alignLabel="'${alignLabel}'"${disabled ? ' :disabled="true"' : ''}${loading ? ' :loading="true"' : ''}${active ? ' :active="true"' : ''}${stretch ? ' :stretch="true"' : ''}${hideLabel ? ' :hideLabel="true"' : ''} :color="'${color}'"></PButtonPure>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/button-pure/api',
    "import { PButtonPure } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-button-pure',
  metadata: { nestable: true },
};
