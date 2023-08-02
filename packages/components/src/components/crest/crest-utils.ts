import type { LinkTarget } from '../../utils/link-button/link-target';
import type { LinkAriaAttribute } from '../../utils';
import { CDN_BASE_URL as CRESTS_CDN_BASE_URL, CRESTS_MANIFEST } from '@porsche-design-system/crest';

export type CrestTarget = LinkTarget;

export type CrestAriaAttribute = LinkAriaAttribute;

type CrestManifest = typeof CRESTS_MANIFEST;
type CrestInnerManifest = CrestManifest['porscheCrest'];

export const crestCdnBaseUrl =
  ROLLUP_REPLACE_IS_STAGING === 'production' ? CRESTS_CDN_BASE_URL : 'http://localhost:3001/crest';
export const crestInnerManifest: CrestInnerManifest = CRESTS_MANIFEST.porscheCrest;

export const buildCrestSrcSet = (format: 'png' | 'webp'): string => {
  return Object.entries(crestInnerManifest)
    .map(([resolution, fileName]) => `${crestCdnBaseUrl}/${fileName[format]} ${resolution}`)
    .join();
};

export const crestSize: { width: number; height: number } = {
  width: 30,
  height: 40,
};
