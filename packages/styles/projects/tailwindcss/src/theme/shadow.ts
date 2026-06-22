import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import { prefix } from '../prefix';
import type { CssNode, TailwindMeta } from '../types';

// Shadow.
export const shadow = {
  sm: {
    property: '--shadow-sm',
    value: shadowSm,
    classes: ['.shadow-sm'],
    description: 'Applies a **small** `box-shadow`.',
    group: 'shadow',
  },
  md: {
    property: '--shadow-md',
    value: shadowMd,
    classes: ['.shadow-md'],
    description: 'Applies a **medium** `box-shadow`.',
    group: 'shadow',
  },
  lg: {
    property: '--shadow-lg',
    value: shadowLg,
    classes: ['.shadow-lg'],
    description: 'Applies a **large** `box-shadow`.',
    group: 'shadow',
  },
} satisfies TailwindMeta['shadow'];

// Shadow — deprecated aliases. Non-documented CSS-only plumbing (not part of `tailwindMeta`). Each
// points at the corresponding canonical `shadow` variable via the prefix helper so they stay in
// sync; the deprecation note lives in the rendered CSS `comment`.
/** @deprecated Use `shadow` (`--shadow-sm/md/lg`) instead. */
export const shadowDeprecatedThemeVariables: CssNode[] = [
  { property: '--shadow-low', value: prefix(shadow.sm.property), comment: 'alias (deprecated)' },
  { property: '--shadow-medium', value: prefix(shadow.md.property), comment: 'alias (deprecated)' },
  { property: '--shadow-high', value: prefix(shadow.lg.property), comment: 'alias (deprecated)' },
];
