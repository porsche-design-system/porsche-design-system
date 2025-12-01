import { FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { CDN_BASE_PATH_FONTS } from '../../../../../cdn.config';
import { type Cdn, getCdnBaseUrl, type PartialLink } from './shared';

type FontSubset = 'latin' | 'greek' | 'cyril' | 'thai' | 'arabic' | 'pashto' | 'urdu';
type FontWeight = 'regular' | 'semi-bold' | 'bold';
type GetFontLinksOptions = {
  /** Font subset to preload (default: 'latin') */
  subset?: FontSubset;
  /** Font weights to preload (default: ['regular', 'semi-bold']) */
  weights?: FontWeight[];
  /** CDN to use for loading fonts (default: 'auto') */
  cdn?: Cdn;
};

/**
 * Generates font preload links for the specified subsets and weights.
 *
 * @param opts - Options to control which font subset, weights, and CDN to use
 * @param opts.subset - Font subset to preload (default: 'latin')
 * @param opts.weights - Font weights to preload (default: ['regular', 'semi-bold'])
 * @param opts.cdn - CDN to load fonts from (default: 'auto')
 * @returns {PartialLink[]} Array of font link objects suitable for creating `<link rel="preload">`
 *
 * @example
 * ```html
 * <!-- Intended usage: -->
 * <link rel="<font.options.preload>" href="<font.href>" as="<font.options.as>" type="<font.options.type>" <font.options.crossorigin> />
 * ```
 */
export const getFontLinks = ({
  subset = 'latin',
  weights = ['regular', 'semi-bold'],
  cdn = 'auto',
}: GetFontLinksOptions): PartialLink[] => {
  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const fonts: Record<FontSubset, Partial<Record<FontWeight, string>>> = {
    latin: {
      regular: FONTS_MANIFEST.porscheNextLatinRegular,
      'semi-bold': FONTS_MANIFEST.porscheNextLatinSemiBold,
      bold: FONTS_MANIFEST.porscheNextLatinBold,
    },
    greek: {
      regular: FONTS_MANIFEST.porscheNextGreekRegular,
      'semi-bold': FONTS_MANIFEST.porscheNextGreekSemiBold,
      bold: FONTS_MANIFEST.porscheNextGreekBold,
    },
    cyril: {
      regular: FONTS_MANIFEST.porscheNextCyrilRegular,
      'semi-bold': FONTS_MANIFEST.porscheNextCyrilSemiBold,
      bold: FONTS_MANIFEST.porscheNextCyrilBold,
    },
    thai: {
      regular: FONTS_MANIFEST.porscheNextThaiRegular,
      'semi-bold': FONTS_MANIFEST.porscheNextThaiSemiBold,
      bold: FONTS_MANIFEST.porscheNextThaiBold,
    },
    arabic: {
      regular: FONTS_MANIFEST.porscheNextArabicRegular,
      bold: FONTS_MANIFEST.porscheNextArabicBold,
    },
    pashto: {
      regular: FONTS_MANIFEST.porscheNextPashtoRegular,
      bold: FONTS_MANIFEST.porscheNextPashtoBold,
    },
    urdu: {
      regular: FONTS_MANIFEST.porscheNextUrduRegular,
      bold: FONTS_MANIFEST.porscheNextUrduBold,
    },
  };

  const urls = weights
    .map((weight) => fonts[subset][weight] && `${cdnBaseUrl}/${CDN_BASE_PATH_FONTS}/${fonts[subset][weight]}`)
    .filter(Boolean);

  return urls.map(
    (url) =>
      ({ href: url, options: { rel: 'preload', as: 'font', type: 'font/woff2', crossOrigin: '' } }) as PartialLink
  );
};
