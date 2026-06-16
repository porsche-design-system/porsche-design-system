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
import type { TailwindThemeVariable } from './types';

/**
 * Nested single source of truth for border radii, grouped like `cssVariablesMeta`
 * (`radius`). Access a single radius via its path, e.g. `radius.sm`, to read e.g.
 * `radius.sm.property`. The `@theme` variables are produced by mapping the entries.
 */
export const radius = {
  xs: {
    property: '--radius-xs',
    value: radiusXs,
    classes: ['.rounded-xs'],
    description: 'Applies a **x-small** `border-radius`.',
    group: 'border',
  },
  sm: {
    property: '--radius-sm',
    value: radiusSm,
    classes: ['.rounded-sm'],
    description: 'Applies a **small** `border-radius`.',
    group: 'border',
  },
  md: {
    property: '--radius-md',
    value: radiusMd,
    classes: ['.rounded-md'],
    description: 'Applies a **medium** `border-radius`.',
    group: 'border',
  },
  lg: {
    property: '--radius-lg',
    value: radiusLg,
    classes: ['.rounded-lg'],
    description: 'Applies a **large** `border-radius`.',
    group: 'border',
  },
  xl: {
    property: '--radius-xl',
    value: radiusXl,
    classes: ['.rounded-xl'],
    description: 'Applies a **x-large** `border-radius`.',
    group: 'border',
  },
  '2xl': {
    property: '--radius-2xl',
    value: radius2Xl,
    classes: ['.rounded-2xl'],
    description: 'Applies a **2x-large** `border-radius`.',
    group: 'border',
  },
  '3xl': {
    property: '--radius-3xl',
    value: radius3Xl,
    classes: ['.rounded-3xl'],
    description: 'Applies a **3x-large** `border-radius`.',
    group: 'border',
  },
  '4xl': {
    property: '--radius-4xl',
    value: radius4Xl,
    classes: ['.rounded-4xl'],
    description: 'Applies a **4x-large** `border-radius`.',
    group: 'border',
  },
  full: {
    property: '--radius-full',
    value: radiusFull,
    classes: ['.rounded-full'],
    description: 'Applies a **fully** rounded `border-radius`.',
    group: 'border',
  },
} satisfies Record<string, TailwindThemeVariable>;

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

/**
 * Border theme variables grouped exactly like the storefront API tables /
 * `tailwindMeta.border`: the `radius` scale and the border `width`s. The single
 * source for both the docs and the flat `@theme` list ({@link borderThemeVariables}).
 */
export const border = {
  radius,
  width: borderWidthThemeVariables,
};

// All border theme variables consumed by the `@theme` block: the radii (mapped
// from the nested `radius` object) followed by the border widths.
export const borderThemeVariables: TailwindThemeVariable[] = [
  ...Object.values(border.radius),
  ...border.width,
];
