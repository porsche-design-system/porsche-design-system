import type { IconName } from '../../../types';

export type BannerInlineState = 'success' | 'error' | 'warning' | 'neutral';

export const getIconName = (state: BannerInlineState): IconName => {
  const stateToIconMap: { [key in BannerInlineState]: IconName } = {
    neutral: 'information',
    warning: 'warning',
    success: 'check',
    error: 'exclamation',
  };
  return stateToIconMap[state];
};
