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
import { scssIdentifier } from '../deprecation';
import type { DeprecatedScssVariable, ScssMeta } from '../types';

/** Spacing theme variables (`fluid` / `static`). */
export const spacing = {
  fluid: {
    xs: {
      name: '$spacing-fluid-xs',
      value: spacingFluidXs,
      description: 'Holds the **x-small fluid** spacing.',
    },
    sm: {
      name: '$spacing-fluid-sm',
      value: spacingFluidSm,
      description: 'Holds the **small fluid** spacing.',
    },
    md: {
      name: '$spacing-fluid-md',
      value: spacingFluidMd,
      description: 'Holds the **medium fluid** spacing.',
    },
    lg: {
      name: '$spacing-fluid-lg',
      value: spacingFluidLg,
      description: 'Holds the **large fluid** spacing.',
    },
    xl: {
      name: '$spacing-fluid-xl',
      value: spacingFluidXl,
      description: 'Holds the **x-large fluid** spacing.',
    },
    '2xl': {
      name: '$spacing-fluid-2xl',
      value: spacingFluid2Xl,
      description: 'Holds the **2x-large fluid** spacing.',
    },
  },
  static: {
    '2xs': {
      name: '$spacing-static-2xs',
      value: spacingStatic2Xs,
      description: 'Holds the **2x-small static** spacing.',
    },
    xs: {
      name: '$spacing-static-xs',
      value: spacingStaticXs,
      description: 'Holds the **x-small static** spacing.',
    },
    sm: {
      name: '$spacing-static-sm',
      value: spacingStaticSm,
      description: 'Holds the **small static** spacing.',
    },
    md: {
      name: '$spacing-static-md',
      value: spacingStaticMd,
      description: 'Holds the **medium static** spacing.',
    },
    lg: {
      name: '$spacing-static-lg',
      value: spacingStaticLg,
      description: 'Holds the **large static** spacing.',
    },
    xl: {
      name: '$spacing-static-xl',
      value: spacingStaticXl,
      description: 'Holds the **x-large static** spacing.',
    },
    '2xl': {
      name: '$spacing-static-2xl',
      value: spacingStatic2Xl,
      description: 'Holds the **2x-large static** spacing.',
    },
  },
} satisfies ScssMeta['spacing'];

/** Deprecated `$pds-spacing-*` aliases of the documented static and fluid spacing scales. */
export const spacingDeprecations = {
  static: {
    xSmall: {
      name: '$pds-spacing-static-x-small',
      value: spacingStaticXs,
      deprecation: { replacement: scssIdentifier(spacing.static.xs) },
    },
    small: {
      name: '$pds-spacing-static-small',
      value: spacingStaticSm,
      deprecation: { replacement: scssIdentifier(spacing.static.sm) },
    },
    medium: {
      name: '$pds-spacing-static-medium',
      value: spacingStaticMd,
      deprecation: { replacement: scssIdentifier(spacing.static.md) },
    },
    large: {
      name: '$pds-spacing-static-large',
      value: spacingStaticLg,
      deprecation: { replacement: scssIdentifier(spacing.static.lg) },
    },
    xLarge: {
      name: '$pds-spacing-static-x-large',
      value: spacingStaticXl,
      deprecation: { replacement: scssIdentifier(spacing.static.xl) },
    },
    xxLarge: {
      name: '$pds-spacing-static-xx-large',
      value: spacingStatic2Xl,
      deprecation: { replacement: scssIdentifier(spacing.static['2xl']) },
    },
  },
  fluid: {
    xSmall: {
      name: '$pds-spacing-fluid-x-small',
      value: spacingFluidXs,
      deprecation: { replacement: scssIdentifier(spacing.fluid.xs) },
    },
    small: {
      name: '$pds-spacing-fluid-small',
      value: spacingFluidSm,
      deprecation: { replacement: scssIdentifier(spacing.fluid.sm) },
    },
    medium: {
      name: '$pds-spacing-fluid-medium',
      value: spacingFluidMd,
      deprecation: { replacement: scssIdentifier(spacing.fluid.md) },
    },
    large: {
      name: '$pds-spacing-fluid-large',
      value: spacingFluidLg,
      deprecation: { replacement: scssIdentifier(spacing.fluid.lg) },
    },
    xLarge: {
      name: '$pds-spacing-fluid-x-large',
      value: spacingFluidXl,
      deprecation: { replacement: scssIdentifier(spacing.fluid.xl) },
    },
    xxLarge: {
      name: '$pds-spacing-fluid-xx-large',
      value: spacingFluid2Xl,
      deprecation: { replacement: scssIdentifier(spacing.fluid['2xl']) },
    },
  },
} satisfies Record<string, Record<string, DeprecatedScssVariable>>;
