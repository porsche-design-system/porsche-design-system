import { cssVariablesMeta } from './cssVariablesMeta';
import type { CssNode } from './types';

// The fully resolved CSS for `normalize.css`, expressed as `CssNode` trees. The
// build scripts only have to `renderCss()` these nodes and format the result.
export const normalizeCss: CssNode[] = [
  {
    // -webkit-text-size-adjust stops iOS Safari from adjusting font size on screen rotation.
    selector: 'html, body',
    declarations: [
      { property: 'margin', value: 0 },
      { property: 'padding', value: 0 },
      {
        property: 'font-family',
        value: `var(${cssVariablesMeta.typography.family.porscheNext.property}, ${cssVariablesMeta.typography.family.porscheNext.value})`,
      },
      {
        property: 'line-height',
        value: `var(${cssVariablesMeta.typography.lineHeight.normal.property}, ${cssVariablesMeta.typography.lineHeight.normal.value})`,
      },
      { property: 'letter-spacing', value: 'normal' },
      { property: 'text-size-adjust', value: 'none' },
      { property: '-webkit-text-size-adjust', value: 'none' },
    ],
  },
];
