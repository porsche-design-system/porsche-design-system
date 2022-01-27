import * as fs from 'fs';
import { minifyHTML } from './utils';
import { CDN_BASE_PATH_STYLES } from '../../../../../cdn.config';

export const generateFontFaceStylesheetPartial = (): string => {
  const generatedUtilitiesPackage = fs.readFileSync(require.resolve('@porsche-design-system/styles'), 'utf8');
  const hashedFontFaceCssFiles = generatedUtilitiesPackage.match(/(font-face\.min[\w\d\.]*)/g);

  const types = `type FontFaceStylesheetOptions = {
  cdn?: Cdn;
  withoutTags?: boolean;
}`;

  const cssFileCn = hashedFontFaceCssFiles?.find((x) => x.includes('.cn.'));
  const cssFileCom = hashedFontFaceCssFiles?.find((x) => !x.includes('.cn.'));
  const link = minifyHTML('<link rel="stylesheet" href="$URL" type="text/css" crossorigin>').replace('$URL', '${url}');

  const func = `export const getFontFaceStylesheet = (opts?: FontFaceStylesheetOptions): string => {
  const options: FontFaceStylesheetOptions = {
    cdn: 'auto',
    withoutTags: false,
    ...opts
  };
  const { cdn, withoutTags } = options;
  const url = \`\${getCdnBaseUrl(cdn)}/${CDN_BASE_PATH_STYLES}/\${cdn === 'cn'
    ? '${cssFileCn}'
    : '${cssFileCom}'
  }\`;

  return withoutTags
    ? url
    : \`${link}\`;
}`;

  return [types, func].join('\n\n');
};
