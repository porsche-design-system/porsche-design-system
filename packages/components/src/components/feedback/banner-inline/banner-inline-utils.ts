import type { IconName } from '../../../types';
import { BANNER_STATES } from '../banner/banner-utils';

export const BANNER_INLINE_STATES = [...BANNER_STATES, 'success'] as const;
export type BannerInlineState = typeof BANNER_INLINE_STATES[number];

export const getIconName = (state: BannerInlineState): IconName => {
  const stateToIconMap: { [key in BannerInlineState]: IconName } = {
    neutral: 'information',
    warning: 'warning',
    success: 'check',
    error: 'exclamation',
  };
  return stateToIconMap[state];
};
