import { buildSlottedStyles, getBaseSlottedStyles, getCss } from '../../../utils';

export const BANNER_STATES = ['error', 'warning', 'neutral'] as const;
export type BannerState = typeof BANNER_STATES[number];

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
