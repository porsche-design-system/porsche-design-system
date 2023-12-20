import { FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { fontWeight } from '@porsche-design-system/utilities-v2';
import { CDN_BASE_PATH_FONTS, CDN_BASE_URL_COM, CDN_BASE_URL_CN } from '../../../../../cdn.config';
import { camelCase } from 'change-case';

import { getMinifiedCss } from '@porsche-design-system/shared';
import type { Styles } from 'jss';

type Cdn = 'com' | 'cn' | 'localhost';
export type GetMinifiedPorscheNextFontFaceCssOptions = {
  cdn: Cdn;
};

// The Vietnamese glyphs are spread across several disparate unicode ranges:
// - Basic Latin {U+0000..U+007F}
// - Latin-1 Supplement {U+0080..U+00FF}
// - Latin Extended-A, -B {U+0100..U+024F}
// - Latin Extended Additional {U+1E00..U+1EFF}
// - Combining Diacritical Marks {U+0300.. U+036F}
// The following letters are specific to Vietnamese:
// - U+01A0, U+01A1, U+01AF, U+01B0 (part of U+0180-024F "Latin Extended-B")
// - U+1EA0-1EF1 (part of U+1E00-1EFF "Latin Extended Additional")

// while persian "pe" font files exist, they are identical to pashto "pa"
type LanguageCode = 'cy' | 'gr' | 'la' | 'ar' | 'pa' | 'ur';
export const unicodeRangeMap: Record<LanguageCode, string> = {
  la: 'U+0020-007F, U+0080-00FF, U+0100-017F, U+0180-024F, U+0250-02AF, U+02B0-02FF, U+0300-036F, U+0E00-0E7F, U+1E00-1EFF, U+2000-206F, U+2070-209F, U+20A0-20CF, U+2100-214F, U+2150-218F, U+2190-21FF, U+2200-22FF, U+25A0-25FF, U+2600-26FF, U+FB00-FB4F, U+FE70-FEFF', // latin (includes vietnamese)
  gr: 'U+0370-03FF', // greek
  cy: 'U+0400-04FF', // cyril
  ar: 'U+0600-0671, U+06A1, U+06A4, U+06BA, U+06CC, U+06D5, U+06F8, U+06F9', // arabic
  pa: 'U+067C, U+067E, U+0681, U+0682, U+0685, U+0686, U+0689, U+067C, U+0693, U+0696, U+0698, U+069A, U+06A9, U+06AB, U+06AF, U+06BC, U+06CD, U+06D0', // pashto
  ur: 'U+0679, U+0688, U+0691, U+06BE, U+06C0-06C3, U+06D2-06D5, U+06F0-06F9', // urdu
};

export const cdnUrlMap: Record<Cdn, string> = {
  com: `${CDN_BASE_URL_COM}/${CDN_BASE_PATH_FONTS}`,
  cn: `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_FONTS}`,
  localhost: 'http://localhost:3001/fonts',
};

export const getMinifiedPorscheNextFontFaceCss = (opts: GetMinifiedPorscheNextFontFaceCssOptions): string => {
  const { cdn } = opts;

  const style: Styles = {
    '@font-face': Object.entries(FONTS_MANIFEST).map(([name, resource]) => {
      const [, charset, weight] = /porscheNextW(La|Gr|Cy|Ar|Pa|Ur)(Regular|SemiBold|Bold)/.exec(name) || [];
      return {
        fontFamily: 'Porsche Next',
        fontStyle: 'normal',
        fontWeight: fontWeight[camelCase(weight) as keyof typeof fontWeight],
        src: `url('${cdnUrlMap[cdn]}/${resource}') format('woff2')`,
        unicodeRange: unicodeRangeMap[charset.toLowerCase() as LanguageCode],
        fontDisplay: 'swap',
      };
    }),
  };
  return getMinifiedCss(style);
};
