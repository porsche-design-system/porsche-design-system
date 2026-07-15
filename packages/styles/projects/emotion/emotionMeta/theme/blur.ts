import { blurFrosted } from '../../src/blur/';
import type { EmotionMeta } from '../types';

export const blur = {
  frosted: {
    name: 'blurFrosted',
    description: 'Holds a blur value for a **frosted** effect when combined with a semi-transparent color.',
    value: blurFrosted,
  },
} satisfies EmotionMeta['blur'];
