import { getFocusStyle } from './deprecated';
import { getFocusVisibleStyle } from './getFocusVisibleStyle';
import type { Meta, MetaEntry } from '../meta.types';

export const focusMeta: Meta = {
  getFocusVisibleStyle: {
    name: 'getFocusVisibleStyle',
    description: 'Applies a focus ring to the element for `:focus-visible` states.',
    value: getFocusVisibleStyle,
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead. */
export const deprecatedGetFocusStyleMeta: MetaEntry = {
  name: 'getFocusStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead.',
  value: getFocusStyle,
} as const;

export const deprecatedFocusMeta: Meta = {
  getFocusStyle: deprecatedGetFocusStyleMeta,
} as const;
