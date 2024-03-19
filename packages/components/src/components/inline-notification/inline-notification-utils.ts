import type { AriaAttributes } from 'react';
import type { IconName } from '../../types';
import { BANNER_STATES } from '../banner/banner-utils';
import type { BannerStateDeprecated } from '../banner/banner-utils';

/** @deprecated */
export type InlineNotificationStateDeprecated = BannerStateDeprecated;

export const INLINE_NOTIFICATION_STATES = ['success', ...BANNER_STATES] as const;
export type InlineNotificationState = (typeof INLINE_NOTIFICATION_STATES)[number];

export type InlineNotificationActionIcon = IconName;

export const fallbackWordings = {
  dismiss: 'Close notification',
};
export type InlineNotificationWordings = typeof fallbackWordings | string;

export const getInlineNotificationIconName = (state: InlineNotificationState): IconName => {
  const stateToIconMap: Record<InlineNotificationState, IconName> = {
    neutral: 'information-filled', // deprecated
    info: 'information-filled',
    warning: 'warning-filled',
    success: 'success-filled',
    error: 'error-filled',
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
