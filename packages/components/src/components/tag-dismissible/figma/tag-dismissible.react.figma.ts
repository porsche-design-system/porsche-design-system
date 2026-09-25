/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=998-5725
// source=https://designsystem.porsche.com/v4/components/tag-dismissible/api
// component=PTagDismissible
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('label');
const compact = instance.getEnum('compact', { false: false, true: true });
const slotDefault = instance.getString('slot-default');

export default {
  example: figma.code`<PTagDismissible${label ? ` label="${label}"` : ''}${compact ? ' compact={true}' : ''}>${slotDefault}</PTagDismissible>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/tag-dismissible/api',
    "import { PTagDismissible } from '@porsche-design-system/components-react';",
  ],
  id: 'p-tag-dismissible',
  metadata: { nestable: true },
};
