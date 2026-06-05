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
import { sizeLabel } from './shared';
import type { TailwindThemeVariable } from './types';

// Spacing — fluid.
const spacingFluidValues: Record<string, string | number> = {
  xs: spacingFluidXs,
  sm: spacingFluidSm,
  md: spacingFluidMd,
  lg: spacingFluidLg,
  xl: spacingFluidXl,
  '2xl': spacingFluid2Xl,
};
export const spacingFluidThemeVariables: TailwindThemeVariable[] = (['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(
  (size) => ({
    property: `--spacing-fluid-${size}`,
    value: spacingFluidValues[size],
    classes: [`.p-fluid-${size}`, `.m-fluid-${size}`],
    description: `Applies the **${sizeLabel[size]} fluid** spacing.`,
    group: 'fluid',
  })
);

// Spacing — static.
const spacingStaticValues: Record<string, string | number> = {
  '2xs': spacingStatic2Xs,
  xs: spacingStaticXs,
  sm: spacingStaticSm,
  md: spacingStaticMd,
  lg: spacingStaticLg,
  xl: spacingStaticXl,
  '2xl': spacingStatic2Xl,
};
export const spacingStaticThemeVariables: TailwindThemeVariable[] = (
  ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
).map((size) => ({
  property: `--spacing-static-${size}`,
  value: spacingStaticValues[size],
  classes: [`.p-static-${size}`, `.m-static-${size}`],
  description: `Applies the **${sizeLabel[size]} static** spacing.`,
  group: 'static',
}));
