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
import type { CssVariableTokens } from '../types';

export const spacing = {
  fluid: {
    xs: {
      type: 'spacing',
      property: '--p-spacing-fluid-xs',
      description: 'Applies the **x-small** fluid spacing.',
      value: spacingFluidXs,
    },
    sm: {
      type: 'spacing',
      property: '--p-spacing-fluid-sm',
      description: 'Applies the **small** fluid spacing.',
      value: spacingFluidSm,
    },
    md: {
      type: 'spacing',
      property: '--p-spacing-fluid-md',
      description: 'Applies the **medium** fluid spacing.',
      value: spacingFluidMd,
    },
    lg: {
      type: 'spacing',
      property: '--p-spacing-fluid-lg',
      description: 'Applies the **large** fluid spacing.',
      value: spacingFluidLg,
    },
    xl: {
      type: 'spacing',
      property: '--p-spacing-fluid-xl',
      description: 'Applies the **x-large** fluid spacing.',
      value: spacingFluidXl,
    },
    '2xl': {
      type: 'spacing',
      property: '--p-spacing-fluid-2xl',
      description: 'Applies the **2x-large** fluid spacing.',
      value: spacingFluid2Xl,
    },
  },
  static: {
    '2xs': {
      type: 'spacing',
      property: '--p-spacing-static-2xs',
      description: 'Applies the **2x-small** static spacing.',
      value: spacingStatic2Xs,
    },
    xs: {
      type: 'spacing',
      property: '--p-spacing-static-xs',
      description: 'Applies the **x-small** static spacing.',
      value: spacingStaticXs,
    },
    sm: {
      type: 'spacing',
      property: '--p-spacing-static-sm',
      description: 'Applies the **small** static spacing.',
      value: spacingStaticSm,
    },
    md: {
      type: 'spacing',
      property: '--p-spacing-static-md',
      description: 'Applies the **medium** static spacing.',
      value: spacingStaticMd,
    },
    lg: {
      type: 'spacing',
      property: '--p-spacing-static-lg',
      description: 'Applies the **large** static spacing.',
      value: spacingStaticLg,
    },
    xl: {
      type: 'spacing',
      property: '--p-spacing-static-xl',
      description: 'Applies the **x-large** static spacing.',
      value: spacingStaticXl,
    },
    '2xl': {
      type: 'spacing',
      property: '--p-spacing-static-2xl',
      description: 'Applies the **2x-large** static spacing.',
      value: spacingStatic2Xl,
    },
  },
} satisfies CssVariableTokens['spacing'];
