import {
  radius2Xl,
  radius3Xl,
  radius4Xl,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  radiusXs,
} from '@porsche-design-system/tokens';
import { sizeLabel } from './shared';
import type { TailwindThemeVariable } from './types';

/** A single radius entry without its `group` (always `border`). */
type RadiusConfig = Omit<TailwindThemeVariable, 'group'>;

const makeRadius = (size: string, value: string | number): RadiusConfig => ({
  property: `--radius-${size}`,
  value,
  classes: [`.rounded-${size}`],
  description:
    size === 'full'
      ? 'Applies a **fully** rounded `border-radius`.'
      : `Applies a **${sizeLabel[size]}** \`border-radius\`.`,
});

/**
 * Nested single source of truth for border radii, grouped like `cssVariablesMeta`
 * (`radius`). Access a single radius via its path, e.g. `radius.sm`, to read e.g.
 * `radius.sm.property`. The `@theme` variables are produced by mapping the entries.
 */
export const radius = {
  xs: makeRadius('xs', radiusXs),
  sm: makeRadius('sm', radiusSm),
  md: makeRadius('md', radiusMd),
  lg: makeRadius('lg', radiusLg),
  xl: makeRadius('xl', radiusXl),
  '2xl': makeRadius('2xl', radius2Xl),
  '3xl': makeRadius('3xl', radius3Xl),
  '4xl': makeRadius('4xl', radius4Xl),
  full: makeRadius('full', radiusFull),
};

// Border — width.
export const borderWidthThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--default-border-width',
    value: '1px',
    description: 'Default border width applied globally via the Tailwind `@theme` block.',
    group: 'border',
  },
  {
    property: '--border-width-regular',
    value: '2px',
    comment: 'alias (deprecated)',
    description: 'Alias for the regular (2 px) border width. **Deprecated** — prefer `--default-border-width`.',
    group: 'border',
  },
  {
    property: '--border-width-thin',
    value: '1px',
    comment: 'alias (deprecated)',
    description: 'Alias for the thin (1 px) border width. **Deprecated** — prefer `--default-border-width`.',
    group: 'border',
  },
];

// All border theme variables consumed by the `@theme` block: the radii (mapped
// from the nested `radius` object) followed by the border widths.
export const borderThemeVariables: TailwindThemeVariable[] = [
  ...Object.values(radius).map((config) => ({ ...config, group: 'border' as const })),
  ...borderWidthThemeVariables,
];
