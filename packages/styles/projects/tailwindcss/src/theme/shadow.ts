import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import { tailwindIdentifier } from '../deprecation';
import { prefix } from '../prefix';
import type { DeprecatedTailwindThemeVariable, TailwindMeta } from '../types';

// Shadow.
export const shadow = {
  sm: {
    property: '--shadow-sm',
    value: shadowSm,
    classes: ['.shadow-sm'],
    description: 'Applies a **small** `box-shadow`.',
  },
  md: {
    property: '--shadow-md',
    value: shadowMd,
    classes: ['.shadow-md'],
    description: 'Applies a **medium** `box-shadow`.',
  },
  lg: {
    property: '--shadow-lg',
    value: shadowLg,
    classes: ['.shadow-lg'],
    description: 'Applies a **large** `box-shadow`.',
  },
} satisfies TailwindMeta['shadow'];

// Shadow — deprecated aliases. Each points at the corresponding canonical `shadow` variable via the
// prefix helper so the values stay in sync, and records it as the structured replacement.
export const shadowDeprecations: DeprecatedTailwindThemeVariable[] = [
  {
    property: '--shadow-low',
    value: prefix(shadow.sm.property),
    deprecation: { replacement: tailwindIdentifier(shadow.sm) },
  },
  {
    property: '--shadow-medium',
    value: prefix(shadow.md.property),
    deprecation: { replacement: tailwindIdentifier(shadow.md) },
  },
  {
    property: '--shadow-high',
    value: prefix(shadow.lg.property),
    deprecation: { replacement: tailwindIdentifier(shadow.lg) },
  },
];
