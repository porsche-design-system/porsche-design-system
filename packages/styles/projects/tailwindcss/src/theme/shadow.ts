import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import { tailwindIdentifier } from '../deprecation';
import { prefix } from '../prefix';
import type { TailwindCatalog } from '../types';

// The documented shadow scale.
const shadows = {
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
};

// Shadow declarations. Each deprecated alias points at the corresponding canonical `shadow` variable
// via the prefix helper so the values stay in sync, and records it as the structured replacement.
export const shadow = {
  ...shadows,
  low: {
    property: '--shadow-low',
    value: prefix(shadows.sm.property),
    description: 'Applies a **small** `box-shadow`.',
    deprecation: { replacement: tailwindIdentifier(shadows.sm) },
  },
  medium: {
    property: '--shadow-medium',
    value: prefix(shadows.md.property),
    description: 'Applies a **medium** `box-shadow`.',
    deprecation: { replacement: tailwindIdentifier(shadows.md) },
  },
  high: {
    property: '--shadow-high',
    value: prefix(shadows.lg.property),
    description: 'Applies a **large** `box-shadow`.',
    deprecation: { replacement: tailwindIdentifier(shadows.lg) },
  },
} satisfies TailwindCatalog;
