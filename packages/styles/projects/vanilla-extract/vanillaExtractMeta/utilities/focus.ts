import { getFocusVisibleStyle } from '../../src/focus/';
import type { VanillaExtractMeta } from '../types';

export const focus = {
  getFocusVisibleStyle: {
    name: 'getFocusVisibleStyle',
    description: 'Applies a **focus-visible** style.',
    styles: getFocusVisibleStyle,
  },
} satisfies VanillaExtractMeta['focus'];
