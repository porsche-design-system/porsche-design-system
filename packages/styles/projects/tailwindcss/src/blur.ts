import { blurFrosted } from '@porsche-design-system/tokens';
import type { TailwindThemeVariable } from './types';

// Blur.
export const blur: TailwindThemeVariable[] = [
  {
    property: '--blur-frosted',
    value: blurFrosted.replace(/blur\((.*)\)/, '$1'),
    classes: ['.backdrop-blur-frosted', '.blur-frosted'],
    description:
      'Applies a **frosted** effect when used with `backdrop-filter` or `filter: blur()` when combined with a semi-transparent color.',
    group: 'blur',
  },
];
