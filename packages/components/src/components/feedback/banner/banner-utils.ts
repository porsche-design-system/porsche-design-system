import type { BannerInlineState } from '../banner-inline/banner-inline-utils';

export type BannerState = Exclude<BannerInlineState, 'success'>;
