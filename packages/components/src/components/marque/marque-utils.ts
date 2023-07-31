import { CDN_BASE_URL as MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/marque';
import type { LinkTarget } from '../../utils/link-button/link-target';
import type { LinkAriaAttribute } from '../../utils';

export const MARQUE_VARIANTS = ['75-years', 'default'] as const;
export type MarqueVariant = (typeof MARQUE_VARIANTS)[number];

export const MARQUE_SIZES = ['responsive', 'small', 'medium'] as const;
export type MarqueSize = (typeof MARQUE_SIZES)[number];
type MarqueManifest = typeof MARQUES_MANIFEST;
export type InnerManifest = MarqueManifest['porscheMarque'];
export type MarqueFormat = 'png' | 'webp';

export type MarqueTarget = LinkTarget;

export const cdnBaseUrl =
  ROLLUP_REPLACE_IS_STAGING === 'production' ? MARQUES_CDN_BASE_URL : 'http://localhost:3001/marque';

export const getInnerManifest = (variant?: MarqueVariant, trademark?: boolean): InnerManifest =>
  MARQUES_MANIFEST[variant === '75-years' ? 'porscheMarque75' : `porscheMarque${trademark ? 'Trademark' : ''}`];

export const buildSrcSet = (innerManifest: InnerManifest, size: MarqueSize, format: MarqueFormat): string =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.entries(innerManifest[size])
    .map(([resolution, fileName]) => `${cdnBaseUrl}/${fileName[format]} ${resolution}`)
    .join();

export type MarqueAriaAttribute = LinkAriaAttribute;
