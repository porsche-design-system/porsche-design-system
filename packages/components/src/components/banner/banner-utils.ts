import type { HeadingTag } from '../../utils';

export const BANNER_STATES = ['info', 'warning', 'error'] as const;
export type BannerState = (typeof BANNER_STATES)[number];

export type BannerHeadingTag = HeadingTag;
