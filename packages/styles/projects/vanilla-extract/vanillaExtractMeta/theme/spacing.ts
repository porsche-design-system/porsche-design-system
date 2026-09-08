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
} from '../../src/spacing/';
import type { VanillaExtractMeta, VanillaExtractToken } from '../types';

const fluid = {
  xs: { name: 'spacingFluidXs', description: 'Holds the **x-small fluid** spacing.', value: spacingFluidXs },
  sm: { name: 'spacingFluidSm', description: 'Holds the **small fluid** spacing.', value: spacingFluidSm },
  md: { name: 'spacingFluidMd', description: 'Holds the **medium fluid** spacing.', value: spacingFluidMd },
  lg: { name: 'spacingFluidLg', description: 'Holds the **large fluid** spacing.', value: spacingFluidLg },
  xl: { name: 'spacingFluidXl', description: 'Holds the **x-large fluid** spacing.', value: spacingFluidXl },
  '2xl': { name: 'spacingFluid2Xl', description: 'Holds the **2x-large fluid** spacing.', value: spacingFluid2Xl },
} satisfies Record<string, VanillaExtractToken>;

const staticSpacing = {
  '2xs': { name: 'spacingStatic2Xs', description: 'Holds the **2x-small static** spacing.', value: spacingStatic2Xs },
  xs: { name: 'spacingStaticXs', description: 'Holds the **x-small static** spacing.', value: spacingStaticXs },
  sm: { name: 'spacingStaticSm', description: 'Holds the **small static** spacing.', value: spacingStaticSm },
  md: { name: 'spacingStaticMd', description: 'Holds the **medium static** spacing.', value: spacingStaticMd },
  lg: { name: 'spacingStaticLg', description: 'Holds the **large static** spacing.', value: spacingStaticLg },
  xl: { name: 'spacingStaticXl', description: 'Holds the **x-large static** spacing.', value: spacingStaticXl },
  '2xl': { name: 'spacingStatic2Xl', description: 'Holds the **2x-large static** spacing.', value: spacingStatic2Xl },
} satisfies Record<string, VanillaExtractToken>;

export const spacing = {
  fluid,
  static: staticSpacing,
} satisfies VanillaExtractMeta['spacing'];
