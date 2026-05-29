import type { CssNode, CssVariableMeta } from './types';

// Private legacy radius variables emitted into `legacy-radius.css`. These are
// intentionally hardcoded (not token-derived) to preserve backwards-compatible
// radii for legacy consumers.
export const legacyRadiusMeta = [
  {
    name: 'small',
    type: 'radius',
    property: '--_p-legacy-radius-small',
    description: 'Private **small** legacy `border-radius` for backwards compatibility.',
    value: '4px',
  },
  {
    name: 'medium',
    type: 'radius',
    property: '--_p-legacy-radius-medium',
    description: 'Private **medium** legacy `border-radius` for backwards compatibility.',
    value: '8px',
  },
  {
    name: 'large',
    type: 'radius',
    property: '--_p-legacy-radius-large',
    description: 'Private **large** legacy `border-radius` for backwards compatibility.',
    value: '12px',
  },
] satisfies CssVariableMeta[];

// The fully resolved CSS for `legacy-radius.css`, expressed as `CssNode` trees.
// The build scripts only have to `renderCss()` these nodes and format the result.
export const legacyRadiusCss: CssNode[] = [
  {
    selector: ':root',
    declarations: [...legacyRadiusMeta],
  },
];

