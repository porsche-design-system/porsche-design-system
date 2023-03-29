import type { LinkTarget } from '../../utils/link-button/link-target';
import { CDN_BASE_URL as CRESTS_CDN_BASE_URL, CRESTS_MANIFEST } from '@porsche-design-system/crest';

export type CrestTarget = LinkTarget;

export const CREST_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type CrestAriaAttribute = (typeof CREST_ARIA_ATTRIBUTES)[number];

export const crestCdnBaseUrl =
  ROLLUP_REPLACE_IS_STAGING === 'production' ? CRESTS_CDN_BASE_URL : 'http://localhost:3001/crest';

export const buildCrestSrcSet = (format: 'png' | 'webp'): string => {
  return Object.entries(CRESTS_MANIFEST.porscheCrest)
    .map(([resolution, fileName]) => `${crestCdnBaseUrl}/${fileName[format]} ${resolution}`)
    .join();
};
