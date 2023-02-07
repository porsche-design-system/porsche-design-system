export const BANNER_STATES = ['error', 'warning', 'info', 'neutral'] as const; // state neutral as default state is deprecated in v3 (new state: 'info')
export type BannerState = typeof BANNER_STATES[number];

export const BANNER_WIDTHS = ['basic', 'extended', 'fluid', 'full', 'narrow'] as const;
export type BannerWidth = typeof BANNER_WIDTHS[number];
