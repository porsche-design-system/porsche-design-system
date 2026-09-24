/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=106-261
// source=https://designsystem.porsche.com/v4/components/tag/api
// component=PTag
// Auto generated - do not edit by hand.
import figma from 'figma';
import { iconOf } from '../../../../figma/helpers/iconOf';

const instance = figma.selectedInstance;

const slotDefault = instance.getString('slot-default');
const figIcon = instance.getBoolean('figIcon');
const icon = figIcon ? iconOf(instance.getInstanceSwap('icon'), 'globe') : undefined;
const variant = instance.getEnum('variant', {
  'info-frosted': 'info-frosted',
  'warning-frosted': 'warning-frosted',
  'success-frosted': 'success-frosted',
  'error-frosted': 'error-frosted',
  secondary: 'secondary',
  primary: 'primary',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
});
const compact = instance.getEnum('compact', { false: false, true: true });

export default {
  example: figma.code`<PTag${icon ? ` icon="${icon}"` : ''} variant="${variant}"${compact ? ' compact={true}' : ''}>${slotDefault}</PTag>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/tag/api',
    "import { PTag } from '@porsche-design-system/components-react';",
  ],
  id: 'p-tag',
  metadata: { nestable: true },
};
