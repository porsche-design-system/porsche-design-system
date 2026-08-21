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
import type { ScssCatalog } from '../types';

/** The documented fluid and static spacing scales. */
const spacings = {
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
};

/** Spacing declarations (`fluid` / `static`), each scale followed by its deprecated `$pds-spacing-*` aliases. */
export const spacing = {
  fluid: {
    ...spacings.fluid,
    xSmall: {
      name: '$pds-spacing-fluid-x-small',
      value: spacingFluidXs,
      description: 'Holds the **x-small fluid** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.fluid.xs) },
    },
    small: {
      name: '$pds-spacing-fluid-small',
      value: spacingFluidSm,
      description: 'Holds the **small fluid** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.fluid.sm) },
    },
    medium: {
      name: '$pds-spacing-fluid-medium',
      value: spacingFluidMd,
      description: 'Holds the **medium fluid** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.fluid.md) },
    },
    large: {
      name: '$pds-spacing-fluid-large',
      value: spacingFluidLg,
      description: 'Holds the **large fluid** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.fluid.lg) },
    },
    xLarge: {
      name: '$pds-spacing-fluid-x-large',
      value: spacingFluidXl,
      description: 'Holds the **x-large fluid** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.fluid.xl) },
    },
    xxLarge: {
      name: '$pds-spacing-fluid-xx-large',
      value: spacingFluid2Xl,
      description: 'Holds the **2x-large fluid** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.fluid['2xl']) },
    },
  },
  static: {
    ...spacings.static,
    xSmall: {
      name: '$pds-spacing-static-x-small',
      value: spacingStaticXs,
      description: 'Holds the **x-small static** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.static.xs) },
    },
    small: {
      name: '$pds-spacing-static-small',
      value: spacingStaticSm,
      description: 'Holds the **small static** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.static.sm) },
    },
    medium: {
      name: '$pds-spacing-static-medium',
      value: spacingStaticMd,
      description: 'Holds the **medium static** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.static.md) },
    },
    large: {
      name: '$pds-spacing-static-large',
      value: spacingStaticLg,
      description: 'Holds the **large static** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.static.lg) },
    },
    xLarge: {
      name: '$pds-spacing-static-x-large',
      value: spacingStaticXl,
      description: 'Holds the **x-large static** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.static.xl) },
    },
    xxLarge: {
      name: '$pds-spacing-static-xx-large',
      value: spacingStatic2Xl,
      description: 'Holds the **2x-large static** spacing.',
      deprecation: { replacement: scssIdentifier(spacings.static['2xl']) },
    },
  },
} satisfies ScssCatalog;
