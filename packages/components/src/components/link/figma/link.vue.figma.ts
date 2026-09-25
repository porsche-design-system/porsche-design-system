/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=34628-29775
// source=https://designsystem.porsche.com/v4/components/link/api
// component=PLink
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const variant = instance.getEnum('variant', {
  primary: 'primary',
  secondary: 'secondary',
});
const figIcon = instance.getEnum('figIcon', { false: false, true: true });
const icon = figIcon ? iconOf(instance.getInstanceSwap('icon'), 'arrow-right') : undefined;
const hideLabel = instance.getEnum('hideLabel', { false: false, true: true });
const compact = instance.getEnum('compact', { false: false, true: true });
const slotDefault = instance.getString('slot-default');

export default {
  example: figma.code`<PLink :variant="'${variant}'"${icon ? ` :icon="'${icon}'"` : ''}${hideLabel ? ' :hideLabel="true"' : ''}${compact ? ' :compact="true"' : ''}>${slotDefault}</PLink>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/link/api',
    "import { PLink } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-link',
  metadata: { nestable: true },
};
