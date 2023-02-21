export const BANNER_STATES_DEPRECATED = ['neutral'] as const;
export const BANNER_STATES = ['info', 'warning', 'error', ...BANNER_STATES_DEPRECATED] as const;
export type BannerState = typeof BANNER_STATES[number];

export const BANNER_WIDTHS_DEPRECATED = ['fluid'] as const;
export const BANNER_WIDTHS = ['extended', 'basic', ...BANNER_WIDTHS_DEPRECATED] as const;
export type BannerWidth = typeof BANNER_WIDTHS[number];
