import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import type { CssVariableTokens } from '../types';

export const shadow = {
  sm: {
    type: 'shadow',
    property: '--p-shadow-sm',
    description: 'Applies a **small** `box-shadow`.',
    value: shadowSm,
  },
  md: {
    type: 'shadow',
    property: '--p-shadow-md',
    description: 'Applies a **medium** `box-shadow`.',
    value: shadowMd,
  },
  lg: {
    type: 'shadow',
    property: '--p-shadow-lg',
    description: 'Applies a **large** `box-shadow`.',
    value: shadowLg,
  },
} satisfies CssVariableTokens['shadow'];
