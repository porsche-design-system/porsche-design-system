import type { BannerState, IconName } from '../../../types';

export const getIconName = (state: BannerState): IconName => {
  const stateToIconMap: { [key in BannerState]: IconName } = {
    neutral: 'information',
    warning: 'warning',
    success: 'check',
    error: 'exclamation',
  };
  return stateToIconMap[state];
};
