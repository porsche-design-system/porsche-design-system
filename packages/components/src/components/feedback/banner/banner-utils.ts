export const BANNER_STATES = ['error', 'warning', 'neutral'] as const;
export type BannerState = typeof BANNER_STATES[number];
