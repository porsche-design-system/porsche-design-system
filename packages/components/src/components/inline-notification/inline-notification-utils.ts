import type { AriaAttributes } from 'react';
import type { IconName } from '../../types';

export const INLINE_NOTIFICATION_STATES = ['info', 'success', 'warning', 'error'] as const;
export type InlineNotificationState = (typeof INLINE_NOTIFICATION_STATES)[number];

export type InlineNotificationActionIcon = IconName;

export const INLINE_NOTIFICATION_HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type InlineNotificationHeadingTag = (typeof INLINE_NOTIFICATION_HEADING_TAGS)[number];

export const getInlineNotificationAriaAttributes = (
  state: InlineNotificationState,
  heading: string
): AriaAttributes & { role: string } => {
  const isAlert = state === 'warning' || state === 'error';
  return {
    role: isAlert ? 'alert' : 'status',
    'aria-live': isAlert ? 'assertive' : 'polite',
    'aria-label': heading,
  };
};
