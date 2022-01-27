import * as fs from 'fs';
import { minifyHTML } from './utils';
import { CDN_BASE_PATH_STYLES } from '../../../../../cdn.config';

export const generateFontFaceStylesheetPartial = (): string => {
  const generatedUtilitiesPackage = fs.readFileSync(require.resolve('@porsche-design-system/utilities'), 'utf8');
  const hashedFontFaceCssFiles = generatedUtilitiesPackage.match(/(font-face\.min[\w\d\.]*)/g);

  const types = `type FontFaceStylesheetOptions = {
  cdn?: Cdn;
  withoutTags?: boolean;
}`;

  const cssFileCn = hashedFontFaceCssFiles?.find((x) => x.includes('.cn.'));
  const cssFileCom = hashedFontFaceCssFiles?.find((x) => !x.includes('.cn.'));
  const links = minifyHTML(`<link rel="stylesheet" href="$URL" type="text/css" crossorigin>
<link rel="preconnect" href="$CDN_URL">
<link rel="dns-prefetch" href="$CDN_URL">`)
    .replace('$URL', '${url}')
    .replace(/\$CDN_URL/g, '${cdnBaseUrl}');

  const func = `export const getFontFaceStylesheet = (opts?: FontFaceStylesheetOptions): string => {
  const options: FontFaceStylesheetOptions = {
    cdn: 'auto',
    withoutTags: false,
    ...opts
  };
  const { cdn, withoutTags } = options;
  const cdnBaseUrl = getCdnBaseUrl(cdn)
  const url = \`\${cdnBaseUrl}/${CDN_BASE_PATH_STYLES}/\${cdn === 'cn'
    ? '${cssFileCn}'
    : '${cssFileCom}'
  }\`;

  return withoutTags
    ? url
    : \`${links}\`;
}`;

  return [types, func].join('\n\n');
};
