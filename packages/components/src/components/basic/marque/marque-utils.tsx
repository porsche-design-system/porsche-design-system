import { h } from '@stencil/core';
import { CDN_BASE_URL as MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/marque';
import type { GetStylesFunction, JssStyle } from '../../../utils';
import { attachCss, breakpoint, mediaQuery, getCss } from '../../../utils';

export type MarqueSize = 'responsive' | 'small' | 'medium';
type MarqueManifest = typeof MARQUES_MANIFEST;
type InnerManifest = MarqueManifest['porscheMarque'];

export const cdnBaseUrl =
  ROLLUP_REPLACE_IS_STAGING === 'production' ? MARQUES_CDN_BASE_URL : 'http://localhost:3001/marque';

export const getManifestPath = (trademark?: boolean): InnerManifest =>
  MARQUES_MANIFEST[`porscheMarque${trademark ? 'Trademark' : ''}`];

export const buildSrcSet = (manifestPath: InnerManifest, size: MarqueSize): string =>
  Object.entries(manifestPath[size])
    .map(([resolution, fileName]) => `${cdnBaseUrl}/${fileName} ${resolution}`)
    .join(',');

export const getResponsiveMarque = (trademark: boolean, size: MarqueSize): JSX.Element[] => {
  const manifestPath = getManifestPath(trademark);
  return [
    size === 'responsive' ? (
      [
        <source srcSet={buildSrcSet(manifestPath, 'medium')} media={`(min-width: ${breakpoint.l}px)`} />,
        <source srcSet={buildSrcSet(manifestPath, 'small')} />,
      ]
    ) : (
      <source srcSet={buildSrcSet(manifestPath, size)} />
    ),
    <img src={`${cdnBaseUrl}/${manifestPath.medium['2x']}`} alt="Porsche" />,
  ];
};

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

const getSizeStyles: GetStylesFunction = (size: MarqueSize): JssStyle =>
  ({
    ...baseSizes,
    responsive: {
      ...baseSizes.small,
      [mediaQuery('l')]: baseSizes.medium,
    },
  }[size]);

const baseCss: string = getCss({
  ':host': {
    display: 'inline-flex',
    verticalAlign: 'top',
  },
  '@global': {
    a: {
      display: 'block',
      textDecoration: 'none',
      outline: 'transparent solid 1px',
      outlineOffset: 0,
      '::-moz-focus-inner': { border: 0 },
      '&:focus': { outlineColor: '#000' },
      '&:focus:not(:focus-visible)': { outlineColor: 'transparent' },
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
      picture: {
        display: 'block',
        ...getSizeStyles(size),
      },
    },
  });
};

export const addCss = (host: HTMLElement, size: MarqueSize): void => {
  attachCss(host, baseCss + getDynamicCss(size));
};
