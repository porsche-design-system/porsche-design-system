import { FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { fontWeight } from '@porsche-design-system/utilities-v2';
import { CDN_BASE_PATH_FONTS, CDN_BASE_URL, CDN_BASE_URL_CN } from '../../../../../cdn.config';

import { getMinifiedCss } from '@porsche-design-system/shared';
import type { Styles } from 'jss';

export type GetMinifiedPorscheNextFontFaceCssOptions = {
  cdn: 'com' | 'cn' | 'localhost';
};

export const unicodeRangeMap = {
  cy: 'U+0400-04FF', // cyril
  gr: 'U+0370-03FF', // greek
  la: 'U+0020-007F, U+0080-00FF, U+0100-017F, U+0180-024F, U+0250-02AF, U+02B0-02FF, U+0300-036F, U+0E00-0E7F, U+1E00-1EFF, U+2000-206F, U+2070-209F, U+20A0-20CF, U+2100-214F, U+2150-218F, U+2190-21FF, U+2200-22FF, U+25A0-25FF, U+2600-26FF, U+FB00-FB4F, U+FE70-FEFF', // latin
};

export const cdnUrlMap: { [key in GetMinifiedPorscheNextFontFaceCssOptions['cdn']]: string } = {
  com: `${CDN_BASE_URL}/${CDN_BASE_PATH_FONTS}`,
  cn: `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_FONTS}`,
  localhost: 'http://localhost:3001/fonts',
};

export const getMinifiedPorscheNextFontFaceCss = (opts: GetMinifiedPorscheNextFontFaceCssOptions): string => {
  const { cdn } = opts;

  const style: Styles = {
    '@font-face': Object.entries(FONTS_MANIFEST).map(([name, resource]) => {
      const [, charset, weight] = /porscheNextW(La|Gr|Cy)(Thin|Regular|SemiBold|Bold)/.exec(name) || [];

      return {
        fontFamily: 'Porsche Next',
        fontStyle: 'normal',
        fontWeight: fontWeight[weight.toLowerCase() as keyof typeof fontWeight],
        src: `url('${cdnUrlMap[cdn]}/${resource.woff2}') format('woff2'), url('${cdnUrlMap[cdn]}/${resource.woff}') format('woff')`,
        unicodeRange: unicodeRangeMap[charset.toLowerCase() as keyof typeof unicodeRangeMap],
        fontDisplay: 'swap',
      };
    }),
  };
  return getMinifiedCss(style);
};
