import { blurFrosted } from '@porsche-design-system/tokens';
import type { CssVariableTokens } from '../types';

export const blur = {
  frosted: {
    type: 'blur',
    property: '--p-blur-frosted',
    description:
      'Applies a **frosted** effect when used with `backdrop-filter` or `filter: blur()` when combined with a semi-transparent color.',
    value: blurFrosted,
  },
} satisfies CssVariableTokens['blur'];
