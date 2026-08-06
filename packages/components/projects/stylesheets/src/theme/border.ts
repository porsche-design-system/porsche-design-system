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
import type { CssVariableTokens } from '../types';

export const border = {
  radius: {
    xs: {
      type: 'border',
      property: '--p-radius-xs',
      description: 'Applies a **x-small** `border-radius`.',
      value: radiusXs,
    },
    sm: {
      type: 'border',
      property: '--p-radius-sm',
      description: 'Applies a **small** `border-radius`.',
      value: radiusSm,
    },
    md: {
      type: 'border',
      property: '--p-radius-md',
      description: 'Applies a **medium** `border-radius`.',
      value: radiusMd,
    },
    lg: {
      type: 'border',
      property: '--p-radius-lg',
      description: 'Applies a **large** `border-radius`.',
      value: radiusLg,
    },
    xl: {
      type: 'border',
      property: '--p-radius-xl',
      description: 'Applies a **x-large** `border-radius`.',
      value: radiusXl,
    },
    '2xl': {
      type: 'border',
      property: '--p-radius-2xl',
      description: 'Applies a **2x-large** `border-radius`.',
      value: radius2Xl,
    },
    '3xl': {
      type: 'border',
      property: '--p-radius-3xl',
      description: 'Applies a **3x-large** `border-radius`.',
      value: radius3Xl,
    },
    '4xl': {
      type: 'border',
      property: '--p-radius-4xl',
      description: 'Applies a **4x-large** `border-radius`.',
      value: radius4Xl,
    },
    full: {
      type: 'border',
      property: '--p-radius-full',
      description: 'Applies a **fully** rounded `border-radius`.',
      value: radiusFull,
    },
  },
} satisfies CssVariableTokens['border'];
