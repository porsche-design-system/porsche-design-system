import type { Styles } from 'jss';
import { FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { fontWeight } from '@porsche-design-system/utilities-v2';

type Options = {
  baseUrl: string;
};

const unicodeRangeMap = {
  cy: 'U+0400-04FF',
  gr: 'U+0370-03FF',
  la: 'U+0020-007F, U+0080-00FF, U+0100-017F, U+0180-024F, U+0250-02AF, U+02B0-02FF, U+0300-036F, U+0E00-0E7F, U+1E00-1EFF, U+2000-206F, U+2070-209F, U+20A0-20CF, U+2100-214F, U+2150-218F, U+2190-21FF, U+2200-22FF, U+25A0-25FF, U+2600-26FF, U+FB00-FB4F, U+FE70-FEFF',
};

export const getPorscheNextFontFaceStyles = (opts: Options): Styles => {
  const { baseUrl } = opts;

  return {
    '@font-face': Object.entries(FONTS_MANIFEST).map(([name, resource]) => {
      // @ts-ignore
      const [, charset, weight] = /porscheNextW(La|Gr|Cy)(Thin|Regular|SemiBold|Bold)/.exec(name);

      return {
        fontFamily: 'Porsche Next',
        fontStyle: 'normal',
        // @ts-ignore
        fontWeight: fontWeight[weight.toLowerCase()],
        src: `url('${baseUrl}/${resource.woff2}') format('woff2'), url('${baseUrl}/${resource.woff}') format('woff')`,
        // @ts-ignore
        unicodeRange: unicodeRangeMap[charset.toLowerCase()],
        fontDisplay: 'swap',
      };
    }),
  };
};
