import { MARQUES_MANIFEST } from '@porsche-design-system/assets';
import type { LinkTarget } from '../../utils/link-button/link-target';
import { getCDNBaseURL } from '../../utils';

export const MARQUE_VARIANTS = ['75-years', 'default'] as const;
export type MarqueVariant = (typeof MARQUE_VARIANTS)[number];

export const MARQUE_SIZES = ['responsive', 'small', 'medium'] as const;
export type MarqueSize = (typeof MARQUE_SIZES)[number];
type MarqueManifest = typeof MARQUES_MANIFEST;
export type InnerManifest = MarqueManifest['porscheMarque'];
export type MarqueFormat = 'png' | 'webp';

export type MarqueTarget = LinkTarget;

export const getInnerManifest = (variant?: MarqueVariant, trademark?: boolean): InnerManifest =>
  MARQUES_MANIFEST[variant === '75-years' ? 'porscheMarque75' : `porscheMarque${trademark ? 'Trademark' : ''}`];

export const buildSrcSet = (innerManifest: InnerManifest, size: MarqueSize, format: MarqueFormat): string =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.entries(innerManifest[size])
    .map(([resolution, fileName]) => `${getCDNBaseURL()}/marque/${fileName[format]} ${resolution}`)
    .join();

export const buildImgSrc = (innerManifest: InnerManifest): string =>
  `${getCDNBaseURL()}/marque/${innerManifest.medium['2x'].png}`;

export const MARQUE_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type MarqueAriaAttribute = (typeof MARQUE_ARIA_ATTRIBUTES)[number];
