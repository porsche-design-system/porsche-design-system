import * as fs from 'fs';
import { minifyHTML } from './utils';
import { CDN_BASE_PATH_STYLES } from '../../../../../cdn.config';

export const generateFontFaceStylesheetPartial = (): string => {
  const generatedUtilitiesPackage = fs.readFileSync(require.resolve('@porsche-design-system/styles'), 'utf8');
  const hashedFontFaceCssFiles = generatedUtilitiesPackage.match(/(font-face\.min[\w\d\.]*)/g);

  const types = `type GetFontFaceStylesheetOptions = {
  cdn?: Cdn;
  format?: Format;
};`;

  const cssFileCn = hashedFontFaceCssFiles?.find((x) => x.includes('.cn.'));
  const cssFileCom = hashedFontFaceCssFiles?.find((x) => !x.includes('.cn.'));
  const linksHtml = minifyHTML(
    `<link rel="preconnect" href="$CDN_URL" crossorigin><link rel="dns-prefetch" href="$CDN_URL" crossorigin><link rel="stylesheet" href="$URL" type="text/css" crossorigin>`
  )
    .replace('$URL', '${url}')
    .replace(/\$CDN_URL/g, '${cdnBaseUrl}');
  const linksJsx =
    `<link rel="preconnect" href="$CDN_URL" crossOrigin="" /><link rel="dns-prefetch" href="$CDN_URL" crossOrigin="" /><link rel="stylesheet" href="$URL" type="text/css" crossOrigin="" />`
      .replace('"$URL"', '{url}')
      .replace(/"\$CDN_URL"/g, '{cdnBaseUrl}');

  const func = `export function getFontFaceStylesheet(opts?: GetFontFaceStylesheetOptions & { format: 'jsx' }): JSX.Element;
export function getFontFaceStylesheet(opts?: GetFontFaceStylesheetOptions): string;
export function getFontFaceStylesheet(opts?: GetFontFaceStylesheetOptions): string | JSX.Element {
  const { cdn, format }: GetFontFaceStylesheetOptions = {
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getFontFaceStylesheet');

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const url = \`\${cdnBaseUrl}/${CDN_BASE_PATH_STYLES}/\${cdn === 'cn'
    ? '${cssFileCn}'
    : '${cssFileCom}'
  }\`;

  return format === 'html'
    ? \`${linksHtml}\`
    : <>${linksJsx}</>;
}`;

  return [types, func].join('\n\n');
};
