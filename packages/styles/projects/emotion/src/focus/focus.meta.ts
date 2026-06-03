import { getFocusStyle } from './getFocusStyle';
import { getFocusVisibleStyle } from './helpers';

type FocusVisibleStyleValue = (opts?: { offset?: string }) => {
  readonly '&:focus-visible': {
    readonly outline: string;
    readonly outlineOffset: string;
  };
};

type FocusStyleValue = (opts?: { offset?: 'small' | 'none' | string; borderRadius?: 'small' | 'medium' | string }) => {
  readonly '&:focus': {
    readonly outline: string;
    readonly outlineOffset: string | 0;
  };
  readonly '&:focus:not(:focus-visible)': {
    readonly outlineColor: 'transparent';
  };
  readonly borderRadius: string;
};

export const focusMeta = {
  getFocusVisibleStyle: {
    name: 'getFocusVisibleStyle',
    description: 'Applies a focus ring to the element for `:focus-visible` states.',
    value: getFocusVisibleStyle as FocusVisibleStyleValue,
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead. */
export const deprecatedGetFocusStyleMeta = {
  name: 'getFocusStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead.',
  value: getFocusStyle as FocusStyleValue,
} as const;

export const deprecatedFocusMeta = {
  getFocusStyle: deprecatedGetFocusStyleMeta,
} as const;
