import { getFocusStyle } from './deprecated';
import { getFocusVisibleStyle } from './helpers';

export const focusMeta = {
  getFocusVisibleStyle: {
    name: 'getFocusVisibleStyle',
    description: 'Applies a focus ring to the element for `:focus-visible` states.',
    value: getFocusVisibleStyle,
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead. */
export const deprecatedGetFocusStyleMeta = {
  name: 'getFocusStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead.',
  value: getFocusStyle,
} as const;

export const deprecatedFocusMeta = {
  getFocusStyle: deprecatedGetFocusStyleMeta,
} as const;
