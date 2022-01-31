import * as fs from 'fs';
import { minifyHTML } from './utils';
import { CDN_BASE_PATH_STYLES } from '../../../../../cdn.config';

export const generateFontFaceStylesheetPartial = (): string => {
  const generatedUtilitiesPackage = fs.readFileSync(require.resolve('@porsche-design-system/styles'), 'utf8');
  const hashedFontFaceCssFiles = generatedUtilitiesPackage.match(/(font-face\.min[\w\d\.]*)/g);

  const types = `type FontFaceStylesheetOptions = {
  cdn?: Cdn;
  withoutTags?: boolean;
  format?: PartialFormat;
}
type FontFaceStylesheetOptionsHtml = FontFaceStylesheetOptions & {
  format?: 'html';
}
type FontFaceStylesheetOptionsJsx = FontFaceStylesheetOptions & {
  withoutTags?: false;
  format?: 'jsx';
}`;

  const cssFileCn = hashedFontFaceCssFiles?.find((x) => x.includes('.cn.'));
  const cssFileCom = hashedFontFaceCssFiles?.find((x) => !x.includes('.cn.'));
  const linksHtml = minifyHTML(
    `<link rel="stylesheet" href="$URL" type="text/css" crossorigin><link rel="preconnect" href="$CDN_URL"><link rel="dns-prefetch" href="$CDN_URL">`
  )
    .replace('$URL', '${url}')
    .replace(/\$CDN_URL/g, '${cdnBaseUrl}');
  const linksJsx =
    `<><link rel="stylesheet" href="$URL" type="text/css" crossOrigin="true" /><link rel="preconnect" href="$CDN_URL" crossOrigin="true" /><link rel="dns-prefetch" href="$CDN_URL" crossOrigin="true" /></>`
      .replace('"$URL"', '{url}')
      .replace(/"\$CDN_URL"/g, '{cdnBaseUrl}');

  const func = `export function getFontFaceStylesheet(opts?: FontFaceStylesheetOptionsHtml): string
export function getFontFaceStylesheet(opts?: FontFaceStylesheetOptionsJsx): JSX.Element
export function getFontFaceStylesheet(opts?: FontFaceStylesheetOptions): string | JSX.Element {
  const { cdn, withoutTags, format }: FontFaceStylesheetOptions = {
    cdn: 'auto',
    withoutTags: false,
    format: 'html',
    ...opts
  };

  deprecationWarningWithoutTags('getFontFaceStylesheet', withoutTags);

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const url = \`\${cdnBaseUrl}/${CDN_BASE_PATH_STYLES}/\${cdn === 'cn'
    ? '${cssFileCn}'
    : '${cssFileCom}'
  }\`;

  const markup = format === 'html' ? \`${linksHtml}\` : ${linksJsx};

  return withoutTags
    ? url
    : markup;
}`;

  return [types, func].join('\n\n');
};
