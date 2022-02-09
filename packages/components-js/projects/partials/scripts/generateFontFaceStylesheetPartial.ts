import * as fs from 'fs';
import { minifyHTML, withoutTagsOption } from './utils';
import { CDN_BASE_PATH_STYLES } from '../../../../../cdn.config';

export const generateFontFaceStylesheetPartial = (): string => {
  const generatedUtilitiesPackage = fs.readFileSync(require.resolve('@porsche-design-system/styles'), 'utf8');
  const hashedFontFaceCssFiles = generatedUtilitiesPackage.match(/(font-face\.min[\w\d\.]*)/g);

  const types = `type GetFontFaceStylesheetOptions = {
  cdn?: Cdn;
  ${withoutTagsOption}
  format?: Format;
};
type GetFontFaceStylesheetOptionsFormatHtml = Omit<GetFontFaceStylesheetOptions, 'withoutTags'> & {
  format: 'html';
};
type GetFontFaceStylesheetOptionsFormatJsx =  Omit<GetFontFaceStylesheetOptions, 'withoutTags'> & {
  format: 'jsx';
};
type GetFontFaceStylesheetOptionsWithoutTags =  Omit<GetFontFaceStylesheetOptions, 'format'>;`;

  const cssFileCn = hashedFontFaceCssFiles?.find((x) => x.includes('.cn.'));
  const cssFileCom = hashedFontFaceCssFiles?.find((x) => !x.includes('.cn.'));
  const linksHtml = minifyHTML(
    `<link rel="preconnect" href="$CDN_URL" crossorigin><link rel="dns-prefetch" href="$CDN_URL" crossorigin><link rel="stylesheet" href="$URL" type="text/css" crossorigin>`
  )
    .replace('$URL', '${url}')
    .replace(/\$CDN_URL/g, '${cdnBaseUrl}');
  const linksJsx =
    `<link rel="preconnect" href="$CDN_URL" crossOrigin="true" /><link rel="dns-prefetch" href="$CDN_URL" crossOrigin="true" /><link rel="stylesheet" href="$URL" type="text/css" crossOrigin="true" />`
      .replace('"$URL"', '{url}')
      .replace(/"\$CDN_URL"/g, '{cdnBaseUrl}');

  const func = `export function getFontFaceStylesheet(opts?: GetFontFaceStylesheetOptionsFormatHtml): string;
export function getFontFaceStylesheet(opts?: GetFontFaceStylesheetOptionsFormatJsx): JSX.Element;
export function getFontFaceStylesheet(opts?: GetFontFaceStylesheetOptionsWithoutTags): string;
export function getFontFaceStylesheet(opts?: GetFontFaceStylesheetOptions): string | JSX.Element {
  const { cdn, withoutTags, format }: GetFontFaceStylesheetOptions = {
    cdn: 'auto',
    withoutTags: false,
    format: 'html',
    ...opts
  };

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const url = \`\${cdnBaseUrl}/${CDN_BASE_PATH_STYLES}/\${cdn === 'cn'
    ? '${cssFileCn}'
    : '${cssFileCom}'
  }\`;

  const markup = format === 'html' ? \`${linksHtml}\` : <>${linksJsx}</>;

  return withoutTags
    ? url
    : markup;
}`;

  return [types, func].join('\n\n');
};
