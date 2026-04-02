import type { AriaAttributes } from 'react';

export const BANNER_POSITIONS = ['top', 'bottom'] as const;
export type BannerPosition = (typeof BANNER_POSITIONS)[number];

export const BANNER_STATES = ['info', 'success', 'warning', 'error'] as const;
export type BannerState = (typeof BANNER_STATES)[number];

export const BANNER_HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type BannerHeadingTag = (typeof BANNER_HEADING_TAGS)[number];

export const getBannerAriaAttributes = (state: BannerState, heading: string): AriaAttributes & { role: string } => {
  const isAlert = state === 'warning' || state === 'error';
  return {
    role: isAlert ? 'alert' : 'status',
    'aria-live': isAlert ? 'assertive' : 'polite',
    'aria-label': heading,
  };
};
