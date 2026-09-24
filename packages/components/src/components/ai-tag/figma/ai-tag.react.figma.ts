/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=52702-279
// source=https://designsystem.porsche.com/v4/components/ai-tag/api
// component=PAiTag
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('variant', {
  abbreviation: 'abbreviation',
  generated: 'generated',
  modified: 'modified',
});

export default {
  example: figma.code`<PAiTag variant="${variant}"></PAiTag>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/ai-tag/api',
    "import { PAiTag } from '@porsche-design-system/components-react';",
  ],
  id: 'p-ai-tag',
  metadata: { nestable: true },
};
