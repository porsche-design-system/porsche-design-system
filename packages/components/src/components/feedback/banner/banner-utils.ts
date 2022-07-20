export const BANNER_STATES = ['error', 'warning', 'neutral'] as const;
export type BannerState = typeof BANNER_STATES[number];

export const BANNER_WIDTHS = ['basic', 'extended', 'fluid'] as const;
export type BannerWidth = typeof BANNER_WIDTHS[number];
