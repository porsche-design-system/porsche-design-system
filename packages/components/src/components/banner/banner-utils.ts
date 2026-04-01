export const BANNER_STATES = ['info', 'success', 'warning', 'error'] as const;
export type BannerState = (typeof BANNER_STATES)[number];

export const BANNER_HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type BannerHeadingTag = (typeof BANNER_HEADING_TAGS)[number];
