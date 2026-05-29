import type { StylesheetMeta } from './types';

// Raw global stylesheets shipped alongside the generated variable/scheme styles.
// These are displayed verbatim in the documentation and provide additional LLM
// context about what the global styles include.
export const stylesheetsMeta = [
  {
    name: 'normalize',
    file: 'normalize.css',
    description:
      'Recommended **normalize** styles including CSS reset rules and base typography (font family and line height) for `html` and `body`.',
  },
  {
    name: 'fontFace',
    file: 'font-face.css',
    description:
      'The `@font-face` definitions for the **Porsche Next** font family, loaded from the Porsche Design System CDN (with a dedicated China CDN variant).',
  },
] satisfies StylesheetMeta[];
