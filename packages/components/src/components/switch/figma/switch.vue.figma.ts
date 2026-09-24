/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=50-552
// source=https://designsystem.porsche.com/v4/components/switch/api
// component=PSwitch
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const slotDefault = instance.getString('slot-default');
const hideLabel = instance.getBoolean('showLabel', { true: false, false: true });
const checked = instance.getEnum('checked', { false: false, true: true });
const alignLabel = instance.getEnum('alignLabel', {
  end: 'end',
  start: 'start',
});
const disabled = instance.getEnum('disabled', { false: false, true: true });
const loading = instance.getEnum('loading', { false: false, true: true });
const stretch = instance.getEnum('stretch', { false: false, true: true });
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<PSwitch${hideLabel ? ' :hideLabel="true"' : ''}${checked ? ' :checked="true"' : ''} :alignLabel="'${alignLabel}'"${disabled ? ' :disabled="true"' : ''}${loading ? ' :loading="true"' : ''}${stretch ? ' :stretch="true"' : ''}${compact ? ' :compact="true"' : ''}>${slotDefault}</PSwitch>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/switch/api',
    "import { PSwitch } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-switch',
  metadata: { nestable: true },
};
