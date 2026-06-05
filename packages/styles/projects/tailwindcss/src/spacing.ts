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
import type { TailwindThemeVariable, TailwindThemeVariableGroup } from './types';

/** A single spacing entry without its `group` (the group is encoded by the nesting key). */
type SpacingConfig = Omit<TailwindThemeVariable, 'group'>;

const makeFluid = (size: string, value: string | number): SpacingConfig => ({
  property: `--spacing-fluid-${size}`,
  value,
  classes: [`.p-fluid-${size}`, `.m-fluid-${size}`],
  description: `Applies the **${sizeLabel[size]} fluid** spacing.`,
});

const makeStatic = (size: string, value: string | number): SpacingConfig => ({
  property: `--spacing-static-${size}`,
  value,
  classes: [`.p-static-${size}`, `.m-static-${size}`],
  description: `Applies the **${sizeLabel[size]} static** spacing.`,
});

/**
 * Nested single source of truth for spacing, grouped like `cssVariablesMeta`
 * (fluid / static). Access a single spacing via its path, e.g. `spacing.fluid.md`,
 * to read e.g. `spacing.fluid.md.property`. The `@theme` variables
 * ({@link spacingThemeVariables}) are produced by flat-mapping the groups.
 */
export const spacing = {
  fluid: {
    xs: makeFluid('xs', spacingFluidXs),
    sm: makeFluid('sm', spacingFluidSm),
    md: makeFluid('md', spacingFluidMd),
    lg: makeFluid('lg', spacingFluidLg),
    xl: makeFluid('xl', spacingFluidXl),
    '2xl': makeFluid('2xl', spacingFluid2Xl),
  },
  static: {
    '2xs': makeStatic('2xs', spacingStatic2Xs),
    xs: makeStatic('xs', spacingStaticXs),
    sm: makeStatic('sm', spacingStaticSm),
    md: makeStatic('md', spacingStaticMd),
    lg: makeStatic('lg', spacingStaticLg),
    xl: makeStatic('xl', spacingStaticXl),
    '2xl': makeStatic('2xl', spacingStatic2Xl),
  },
};

// Spacing theme variables — flat-mapped from the nested groups, tagging each
// entry with its group. Order matches the generated `@theme` block.
export const spacingThemeVariables: TailwindThemeVariable[] = Object.entries(spacing).flatMap(([group, sizes]) =>
  Object.values(sizes).map((config) => ({ ...config, group: group as TailwindThemeVariableGroup }))
);
