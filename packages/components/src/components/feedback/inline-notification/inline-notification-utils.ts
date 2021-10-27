import type { IconName } from '../../../types';
import { BANNER_STATES } from '../banner/banner-utils';

export const INLINE_NOTIFICATION_STATES = [...BANNER_STATES, 'success'] as const;
export type InlineNotificationState = typeof INLINE_NOTIFICATION_STATES[number];

export const getIconName = (state: InlineNotificationState): IconName => {
  const stateToIconMap: { [key in InlineNotificationState]: IconName } = {
    neutral: 'information',
    warning: 'warning',
    success: 'success',
    error: 'exclamation',
  };
  return stateToIconMap[state];
};
