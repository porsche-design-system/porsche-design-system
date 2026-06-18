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
import type { ScssVariable } from '../types';

/**
 * Spacing theme variables grouped like the storefront API tables (`fluid` / `static`). The
 * deprecated `$pds-spacing-*` aliases are plumbing — they live in the composition layer, not here.
 */
export const spacing = {
  fluid: {
    xs: { name: '$spacing-fluid-xs', value: spacingFluidXs, description: 'Holds the **x-small fluid** spacing.', group: 'fluid' },
    sm: { name: '$spacing-fluid-sm', value: spacingFluidSm, description: 'Holds the **small fluid** spacing.', group: 'fluid' },
    md: { name: '$spacing-fluid-md', value: spacingFluidMd, description: 'Holds the **medium fluid** spacing.', group: 'fluid' },
    lg: { name: '$spacing-fluid-lg', value: spacingFluidLg, description: 'Holds the **large fluid** spacing.', group: 'fluid' },
    xl: { name: '$spacing-fluid-xl', value: spacingFluidXl, description: 'Holds the **x-large fluid** spacing.', group: 'fluid' },
    '2xl': { name: '$spacing-fluid-2xl', value: spacingFluid2Xl, description: 'Holds the **2x-large fluid** spacing.', group: 'fluid' },
  },
  static: {
    '2xs': { name: '$spacing-static-2xs', value: spacingStatic2Xs, description: 'Holds the **2x-small static** spacing.', group: 'static' },
    xs: { name: '$spacing-static-xs', value: spacingStaticXs, description: 'Holds the **x-small static** spacing.', group: 'static' },
    sm: { name: '$spacing-static-sm', value: spacingStaticSm, description: 'Holds the **small static** spacing.', group: 'static' },
    md: { name: '$spacing-static-md', value: spacingStaticMd, description: 'Holds the **medium static** spacing.', group: 'static' },
    lg: { name: '$spacing-static-lg', value: spacingStaticLg, description: 'Holds the **large static** spacing.', group: 'static' },
    xl: { name: '$spacing-static-xl', value: spacingStaticXl, description: 'Holds the **x-large static** spacing.', group: 'static' },
    '2xl': { name: '$spacing-static-2xl', value: spacingStatic2Xl, description: 'Holds the **2x-large static** spacing.', group: 'static' },
  },
} satisfies { fluid: Record<string, ScssVariable>; static: Record<string, ScssVariable> };
