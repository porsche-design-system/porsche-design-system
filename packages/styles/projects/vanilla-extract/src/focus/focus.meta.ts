import type { Meta } from '..';
import { getFocusStyle, getFocusVisibleStyle } from '.';

export const focusMeta: Meta = {
  getFocusVisibleStyle: {
    name: 'getFocusVisibleStyle',
    description: 'Applies a **focus-visible** style.',
    value: getFocusVisibleStyle,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead. */
  getFocusStyle: {
    name: 'getFocusStyle',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead.',
    value: getFocusStyle,
    deprecated: true,
  },
} as const;
