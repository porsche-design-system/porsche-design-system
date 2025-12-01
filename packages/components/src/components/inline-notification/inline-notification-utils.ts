import type { AriaAttributes } from 'react';
import type { HeadingTag, IconName } from '../../types';

export const INLINE_NOTIFICATION_STATES = ['info', 'success', 'warning', 'error'] as const;
export type InlineNotificationState = (typeof INLINE_NOTIFICATION_STATES)[number];

export type InlineNotificationActionIcon = IconName;
export type InlineNotificationHeadingTag = HeadingTag;

export const getInlineNotificationIconName = (state: InlineNotificationState): IconName => {
  const iconMap: Record<InlineNotificationState, IconName> = {
    info: 'information-filled',
    warning: 'warning-filled',
    success: 'success-filled',
    error: 'error-filled',
  };

  return iconMap[state];
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
