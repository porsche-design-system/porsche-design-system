import * as fs from 'fs';
import * as path from 'path';
import { TAG_NAMES } from '@porsche-design-system/components/src/tags';
import { FONTS_MANIFEST } from '@porsche-design-system/assets';
import { minifyHTML } from './utils';
import { CDN_BASE_URL, CDN_BASE_URL_CN, CDN_BASE_PATH_STYLES, CDN_BASE_PATH_FONTS } from '../../../cdn.config';

const generateSharedStuff = (): string => {
  return `type Cdn = 'auto' | 'cn';

const getCdnBaseUrl = (cdn: Cdn): string => cdn === 'cn' ? '${CDN_BASE_URL_CN}' : '${CDN_BASE_URL}';`;
};

const generateFontFaceStylesheetPartial = (): string => {
  const generatedUtilitiesPackage = fs.readFileSync(require.resolve('@porsche-design-system/utilities'), 'utf8');
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
  const {cdn, withoutTags} = options;
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

const generateInitialStylesPartial = (): string => {
  const types = `type InitialStylesOptions = {
  withoutTags?: boolean;
  prefix?: string;
}`;

  const tagNames = TAG_NAMES.map((x) => `'${x}'`).join(', ');

  const func = `
export const getInitialStyles = (opts?: InitialStylesOptions): string => {
  const options: InitialStylesOptions = {
    withoutTags: false,
    prefix: '',
    ...opts
  };
  const {withoutTags, prefix} = options;

  const tagNames = [${tagNames}];
  const styleInnerHtml = tagNames.map((x) => prefix
    ? \`\${prefix}-\${x}\`
    : x
  ).join(',') + '{visibility:hidden}';

  return withoutTags
    ? styleInnerHtml
    : \`<style>\${styleInnerHtml}</style>\`;
};`;

  return [types, func].join('\n\n');
};

const generateFontLinksPartial = (): string => {
  const types = `type FontSubset = 'latin' | 'greek' | 'cyril';
type FontWeight = 'thin' | 'regular' | 'semi-bold' | 'bold';
type FontPreloadLinkOptions = {
  cdn?: Cdn;
  withoutTags?: true | false;
  weight?: FontWeight[];
  subset?: FontSubset;
}
type FontPreloadLinkOptionsWithTags = FontPreloadLinkOptions & {
  withoutTags?: false;
};
type FontPreloadLinkOptionsWithoutTags = FontPreloadLinkOptions & {
  withoutTags?: true;
};`;

  const link = minifyHTML('<link rel="preload" href="$URL" as="font" type="font/woff2" crossorigin>').replace(
    '$URL',
    '${link}'
  );

  const func = `
export function getFontLinks(opts?: FontPreloadLinkOptionsWithTags): string;
export function getFontLinks(opts?: FontPreloadLinkOptionsWithoutTags): string[];
export function getFontLinks(opts?: FontPreloadLinkOptions): string | string[] {
  const options: FontPreloadLinkOptions = {
    subset: 'latin',
    weight: ['regular'],
    cdn: 'auto',
    withoutTags: false,
    ...opts
  };
  const {subset, weight, cdn, withoutTags} = options;
  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const fonts = {
    latin: {
      thin: '${FONTS_MANIFEST.porscheNextWLaThin.woff2}',
      regular: '${FONTS_MANIFEST.porscheNextWLaRegular.woff2}',
      'semi-bold': '${FONTS_MANIFEST.porscheNextWLaSemiBold.woff2}',
      bold: '${FONTS_MANIFEST.porscheNextWLaBold.woff2}'
    },
    greek: {
      thin: '${FONTS_MANIFEST.porscheNextWGrThin.woff2}',
      regular: '${FONTS_MANIFEST.porscheNextWGrRegular.woff2}',
      'semi-bold': '${FONTS_MANIFEST.porscheNextWGrSemiBold.woff2}',
      bold: '${FONTS_MANIFEST.porscheNextWGrBold.woff2}'
    },
    cyril: {
      thin: '${FONTS_MANIFEST.porscheNextWCyThin.woff2}',
      regular: '${FONTS_MANIFEST.porscheNextWCyRegular.woff2}',
      'semi-bold': '${FONTS_MANIFEST.porscheNextWCySemiBold.woff2}',
      bold: '${FONTS_MANIFEST.porscheNextWCyBold.woff2}'
    }
  };

  const urls = weight.map((weight) => \`\${cdnBaseUrl}/${CDN_BASE_PATH_FONTS}/\${fonts[subset][weight]}\`);
  const links = urls.map((link) => \`${link}\`).join('');

  return withoutTags ? urls : links;
};`;

  return [types, func].join('\n\n');
};

const generatePartials = async (): Promise<void> => {
  const targetDirectory = path.normalize('./src/lib');
  const targetFile = path.resolve(targetDirectory, 'partials.ts');

  const content = [
    generateSharedStuff(),
    generateFontFaceStylesheetPartial(),
    generateInitialStylesPartial(),
    generateFontLinksPartial(),
  ].join('\n\n');

  fs.mkdirSync(targetDirectory, { recursive: true });
  fs.writeFileSync(targetFile, content);
};

generatePartials().catch((e) => {
  console.error(e);
  process.exit(1);
});
