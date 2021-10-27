import type { IconName } from '../../../types';
import { BANNER_STATES } from '../banner/banner-utils';
import { AriaAttributes } from 'react';

export const BANNER_INLINE_STATES = [...BANNER_STATES, 'success'] as const;
export type BannerInlineState = typeof BANNER_INLINE_STATES[number];

export const getIconName = (state: BannerInlineState): IconName => {
  const stateToIconMap: { [key in BannerInlineState]: IconName } = {
    neutral: 'information',
    warning: 'warning',
    success: 'success',
    error: 'exclamation',
  };
  return stateToIconMap[state];
};

export const getContentAriaAttributes = (
  state: BannerInlineState,
  labelId: string,
  descriptionId: string
): AriaAttributes & { role: string } => {
  const isAlert = state === 'warning' || state === 'error';
  return {
    role: isAlert ? 'alert' : 'status',
    'aria-live': isAlert ? 'assertive' : 'polite',
    'aria-labelledby': labelId,
    'aria-describedby': descriptionId,
  };
};
