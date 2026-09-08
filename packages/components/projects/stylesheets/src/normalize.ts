import { cssVariableTokens } from './theme';
import type { CssNode } from './types';

// The fully resolved CSS for `normalize.css`, expressed as `CssNode` trees. The
// build scripts only have to `renderCss()` these nodes and format the result.
// This reset is a raw block: it has no documented `name`/`description` leaves, so it
// lives outside the `stylesheetsMeta` catalog and is only consumed by the composition layer.
export const normalizeCss: CssNode[] = [
  {
    // -webkit-text-size-adjust stops iOS Safari from adjusting font size on screen rotation.
    selector: 'html, body',
    declarations: [
      { property: 'margin', value: 0 },
      { property: 'padding', value: 0 },
      {
        property: 'font-family',
        value: `var(${cssVariableTokens.font.family.porscheNext.property}, ${cssVariableTokens.font.family.porscheNext.value})`,
      },
      {
        property: 'line-height',
        value: `var(${cssVariableTokens.font.lineHeight.normal.property}, ${cssVariableTokens.font.lineHeight.normal.value})`,
      },
      { property: 'letter-spacing', value: 'normal' },
      { property: 'text-size-adjust', value: 'none' },
      { property: '-webkit-text-size-adjust', value: 'none' },
    ],
  },
];
