import { blurFrosted } from '@porsche-design-system/tokens';
import type { TailwindCatalog } from '../types';

// Blur.
export const blur = {
  frosted: {
    property: '--blur-frosted',
    value: blurFrosted.replace(/blur\((.*)\)/, '$1'),
    classes: ['.backdrop-blur-frosted', '.blur-frosted'],
    description:
      'Applies a **frosted** effect when used with `backdrop-filter` or `filter: blur()` when combined with a semi-transparent color.',
  },
} satisfies TailwindCatalog;
