/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=225-216
// source=https://designsystem.porsche.com/v4/components/button/api
// component=p-button
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const slotDefault = instance.getString('slot-default');
const figIcon = instance.getEnum('figIcon', { false: false, true: true });
const icon = figIcon ? iconOf(instance.getInstanceSwap('icon'), 'close') : undefined;
const variant = instance.getEnum('variant', {
  primary: 'primary',
  secondary: 'secondary',
});
const loading = instance.getEnum('loading', { false: false, true: true });
const disabled = instance.getEnum('disabled', { false: false, true: true });
const hideLabel = instance.getEnum('hideLabel', { false: false, true: true });
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<p-button${icon ? ` icon="${icon}"` : ''} variant="${variant}"${loading ? ' loading="true"' : ''}${disabled ? ' disabled="true"' : ''}${hideLabel ? ' hide-label="true"' : ''}${compact ? ' compact="true"' : ''}>${slotDefault}</p-button>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/button/api -->'],
  id: 'p-button',
  metadata: { nestable: true },
};
