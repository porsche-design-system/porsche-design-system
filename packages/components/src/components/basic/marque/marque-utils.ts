import { CDN_BASE_URL as MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/marque';
import { attachCss, getCss, mediaQuery } from '../../../utils';

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

const baseSizes = {
  small: {
    width: 100,
    height: 60,
  },
  medium: {
    width: 120,
    height: 72,
  },
};

const baseCss: string = getCss({
  ':host': {
    display: 'inline-flex',
    verticalAlign: 'top',
  },
  '@global': {
    a: {
      display: 'block',
      textDecoration: 'none',
     // TODO: Utilities package with string focus styles was not useful, implement new focus helper in utils that returns style object
      outline: 'transparent solid 1px',
      outlineOffset: 0,
      '::-moz-focus-inner': { border: 0 },
      '&:focus': { outlineColor: '#000' },
      '&:focus:not(:focus-visible)': { outlineColor: 'transparent' },
    },
    picture: {
      display: 'block',
      ...baseSizes.small,
      [mediaQuery('l')]: baseSizes.medium,
    },
    img: {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
  },
});

export const getDynamicCss = (size: MarqueSize): string => {
  return getCss({
    '@global': {
      picture: baseSizes[size],
    },
  });
};

export const addCss = (host: HTMLElement, size: MarqueSize): void => {
  attachCss(host, baseCss + getDynamicCss(size));
};
