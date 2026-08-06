import {
  spacingFluid2Xl,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXl,
  spacingFluidXs,
  spacingStatic2Xl,
  spacingStatic2Xs,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
} from '@porsche-design-system/tokens';
import type { TailwindThemeVariable } from '../types';

/**
 * Nested single source of truth for spacing, grouped like `cssVariablesMeta`
 * (fluid / static). Access a single spacing via its path, e.g. `spacing.fluid.md`,
 * to read e.g. `spacing.fluid.md.property`. The generated `@theme` block flattens
 * these groups.
 */
export const spacing = {
  fluid: {
    xs: {
      property: '--spacing-fluid-xs',
      value: spacingFluidXs,
      classes: ['.p-fluid-xs', '.m-fluid-xs'],
      description: 'Applies the **x-small fluid** spacing.',
    },
    sm: {
      property: '--spacing-fluid-sm',
      value: spacingFluidSm,
      classes: ['.p-fluid-sm', '.m-fluid-sm'],
      description: 'Applies the **small fluid** spacing.',
    },
    md: {
      property: '--spacing-fluid-md',
      value: spacingFluidMd,
      classes: ['.p-fluid-md', '.m-fluid-md'],
      description: 'Applies the **medium fluid** spacing.',
    },
    lg: {
      property: '--spacing-fluid-lg',
      value: spacingFluidLg,
      classes: ['.p-fluid-lg', '.m-fluid-lg'],
      description: 'Applies the **large fluid** spacing.',
    },
    xl: {
      property: '--spacing-fluid-xl',
      value: spacingFluidXl,
      classes: ['.p-fluid-xl', '.m-fluid-xl'],
      description: 'Applies the **x-large fluid** spacing.',
    },
    '2xl': {
      property: '--spacing-fluid-2xl',
      value: spacingFluid2Xl,
      classes: ['.p-fluid-2xl', '.m-fluid-2xl'],
      description: 'Applies the **2x-large fluid** spacing.',
    },
  },
  static: {
    '2xs': {
      property: '--spacing-static-2xs',
      value: spacingStatic2Xs,
      classes: ['.p-static-2xs', '.m-static-2xs'],
      description: 'Applies the **2x-small static** spacing.',
    },
    xs: {
      property: '--spacing-static-xs',
      value: spacingStaticXs,
      classes: ['.p-static-xs', '.m-static-xs'],
      description: 'Applies the **x-small static** spacing.',
    },
    sm: {
      property: '--spacing-static-sm',
      value: spacingStaticSm,
      classes: ['.p-static-sm', '.m-static-sm'],
      description: 'Applies the **small static** spacing.',
    },
    md: {
      property: '--spacing-static-md',
      value: spacingStaticMd,
      classes: ['.p-static-md', '.m-static-md'],
      description: 'Applies the **medium static** spacing.',
    },
    lg: {
      property: '--spacing-static-lg',
      value: spacingStaticLg,
      classes: ['.p-static-lg', '.m-static-lg'],
      description: 'Applies the **large static** spacing.',
    },
    xl: {
      property: '--spacing-static-xl',
      value: spacingStaticXl,
      classes: ['.p-static-xl', '.m-static-xl'],
      description: 'Applies the **x-large static** spacing.',
    },
    '2xl': {
      property: '--spacing-static-2xl',
      value: spacingStatic2Xl,
      classes: ['.p-static-2xl', '.m-static-2xl'],
      description: 'Applies the **2x-large static** spacing.',
    },
  },
} satisfies Record<string, Record<string, TailwindThemeVariable>>;
