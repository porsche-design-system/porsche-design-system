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
import { tailwindIdentifier } from '../deprecation';
import type { TailwindCatalog, TailwindThemeVariable } from '../types';

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
  },
  sm: {
    property: '--radius-sm',
    value: radiusSm,
    classes: ['.rounded-sm'],
    description: 'Applies a **small** `border-radius`.',
  },
  md: {
    property: '--radius-md',
    value: radiusMd,
    classes: ['.rounded-md'],
    description: 'Applies a **medium** `border-radius`.',
  },
  lg: {
    property: '--radius-lg',
    value: radiusLg,
    classes: ['.rounded-lg'],
    description: 'Applies a **large** `border-radius`.',
  },
  xl: {
    property: '--radius-xl',
    value: radiusXl,
    classes: ['.rounded-xl'],
    description: 'Applies a **x-large** `border-radius`.',
  },
  '2xl': {
    property: '--radius-2xl',
    value: radius2Xl,
    classes: ['.rounded-2xl'],
    description: 'Applies a **2x-large** `border-radius`.',
  },
  '3xl': {
    property: '--radius-3xl',
    value: radius3Xl,
    classes: ['.rounded-3xl'],
    description: 'Applies a **3x-large** `border-radius`.',
  },
  '4xl': {
    property: '--radius-4xl',
    value: radius4Xl,
    classes: ['.rounded-4xl'],
    description: 'Applies a **4x-large** `border-radius`.',
  },
  full: {
    property: '--radius-full',
    value: radiusFull,
    classes: ['.rounded-full'],
    description: 'Applies a **fully** rounded `border-radius`.',
  },
} satisfies TailwindCatalog;

// Border — width.
const defaultBorderWidth = {
  property: '--default-border-width',
  value: '1px',
  description: 'Default border width applied globally via the Tailwind `@theme` block.',
} satisfies TailwindThemeVariable;

/**
 * Border declarations grouped exactly like the storefront API tables: the `radius` scale and the
 * border `width`s, each followed by the deprecated aliases it replaces. Both width aliases point at
 * the default border width; the regular one also says the value changed, since the default is 1px
 * and the alias is 2px.
 */
export const border = {
  radius,
  width: [
    defaultBorderWidth,
    {
      property: '--border-width-regular',
      value: '2px',
      description: 'Applies a **regular** `border-width`.',
      deprecation: {
        replacement: tailwindIdentifier(defaultBorderWidth),
        note: 'The default border width is now 1px.',
      },
    },
    {
      property: '--border-width-thin',
      value: '1px',
      description: 'Applies a **thin** `border-width`.',
      deprecation: { replacement: tailwindIdentifier(defaultBorderWidth) },
    },
  ],
} satisfies TailwindCatalog;
