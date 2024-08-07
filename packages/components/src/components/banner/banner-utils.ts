import type { InlineNotificationHeadingTag } from '../inline-notification/inline-notification-utils';

/** @deprecated */
export const BANNER_STATES_DEPRECATED = ['neutral'] as const;
/** @deprecated */
export type BannerStateDeprecated = (typeof BANNER_STATES_DEPRECATED)[number];
export const BANNER_STATES = ['info', 'warning', 'error', ...BANNER_STATES_DEPRECATED] as const;
export type BannerState = (typeof BANNER_STATES)[number];

/** @deprecated */
export const BANNER_WIDTHS = ['extended', 'basic', 'fluid'] as const;
/** @deprecated */
export type BannerWidth = (typeof BANNER_WIDTHS)[number];

export type BannerHeadingTag = InlineNotificationHeadingTag;
