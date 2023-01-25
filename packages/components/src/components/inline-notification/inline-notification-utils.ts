import type { IconName } from '../../types';
import { BANNER_STATES } from '../banner/banner-utils';
import { AriaAttributes } from 'react';

export const INLINE_NOTIFICATION_STATES = [...BANNER_STATES, 'success'] as const;
export type InlineNotificationState = typeof INLINE_NOTIFICATION_STATES[number];

export const getInlineNotificationIconName = (state: InlineNotificationState): IconName => {
  const stateToIconMap: { [key in InlineNotificationState]: IconName } = {
    neutral: 'information-filled',
    info: 'information-filled',
    warning: 'warning-filled',
    success: 'success-filled',
    error: 'error-filled',
  };
  return stateToIconMap[state];
};

// state 'neutral' is deprecated and needs to be mapped to 'info' should be removed in v4
export const inlineNotificationStateMap = (state: InlineNotificationState): InlineNotificationState => {
  const stateMap: { [key in InlineNotificationState]: InlineNotificationState } = {
    neutral: 'info',
    info: 'info',
    warning: 'warning',
    success: 'success',
    error: 'error',
  };
  return stateMap[state];
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
