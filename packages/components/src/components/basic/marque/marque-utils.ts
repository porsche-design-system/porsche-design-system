import { CDN_BASE_URL as MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/marque';

export type MarqueSize = 'responsive' | 'small' | 'medium';
type MarqueManifest = typeof MARQUES_MANIFEST;
export type InnerManifest = MarqueManifest['porscheMarque'];

export const cdnBaseUrl =
  ROLLUP_REPLACE_IS_STAGING === 'production' ? MARQUES_CDN_BASE_URL : 'http://localhost:3001/marque';

export const getManifestPath = (trademark?: boolean): InnerManifest =>
  MARQUES_MANIFEST[`porscheMarque${trademark ? 'Trademark' : ''}`];

export const buildSrcSet = (manifestPath: InnerManifest, size: MarqueSize): string =>
  Object.entries(manifestPath[size])
    .map(([resolution, fileName]) => `${cdnBaseUrl}/${fileName} ${resolution}`)
    .join(',');
