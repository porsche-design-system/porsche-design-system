import type { IconName } from '../../types';
import { BANNER_STATES } from '../banner/banner-utils';
import { AriaAttributes } from 'react';

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

export const getContentAriaAttributes = (
  state: InlineNotificationState,
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
