import type { IconName } from '../../../types';
import { BANNER_STATES } from '../banner/banner-utils';

export const BANNER_INLINE_STATES = [...BANNER_STATES, 'success'] as const;
export type InlineNotificationState = typeof BANNER_INLINE_STATES[number];

export const getIconName = (state: InlineNotificationState): IconName => {
  const stateToIconMap: { [key in InlineNotificationState]: IconName } = {
    neutral: 'information',
    warning: 'warning',
    success: 'success',
    error: 'exclamation',
  };
  return stateToIconMap[state];
};
