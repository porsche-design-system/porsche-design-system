import { getFocusVisibleStyle } from '../../src/focus/';
import type { EmotionMeta } from '../types';

export const focus = {
  getFocusVisibleStyle: {
    name: 'getFocusVisibleStyle',
    description: 'Applies a **focus-visible** style.',
    styles: getFocusVisibleStyle,
  },
} satisfies EmotionMeta['focus'];
