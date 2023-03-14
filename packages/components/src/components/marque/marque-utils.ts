import { CDN_BASE_URL as MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/marque';
import type { MarqueSize } from './marque-size';
import type { LinkTarget } from '../../utils/link-button/link-target';

type MarqueManifest = typeof MARQUES_MANIFEST;
export type InnerManifest = MarqueManifest['porscheMarque'];
export type MarqueFormat = 'png' | 'webp';

export type MarqueTarget = LinkTarget;

export const cdnBaseUrl =
  ROLLUP_REPLACE_IS_STAGING === 'production' ? MARQUES_CDN_BASE_URL : 'http://localhost:3001/marque';

export const getInnerManifest = (trademark?: boolean): InnerManifest =>
  MARQUES_MANIFEST[`porscheMarque${trademark ? 'Trademark' : ''}`];

export const buildSrcSet = (innerManifest: InnerManifest, size: MarqueSize, format: MarqueFormat): string =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.entries(innerManifest[size])
    .map(([resolution, fileName]) => `${cdnBaseUrl}/${fileName[format]} ${resolution}`)
    .join();

export const MARQUE_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type MarqueAriaAttribute = typeof MARQUE_ARIA_ATTRIBUTES[number];
