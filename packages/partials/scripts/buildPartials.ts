import * as fs from 'fs';
import * as path from 'path';
import { TAG_NAMES } from '@porsche-design-system/components/src/tags';
import { FONTS_MANIFEST } from '@porsche-design-system/assets';
import { minifyHTML } from './utils';
import { CDN_BASE_URL, CDN_BASE_URL_CN, CDN_BASE_PATH_STYLES, CDN_BASE_PATH_FONTS } from '../../../cdn.config';

const generatePartials = async (): Promise<void> => {
  const targetDirectory = path.normalize('./src/lib');
  const targetFile = path.normalize(`${targetDirectory}/partials.ts`);
  const generatedUtilitiesPackage = fs.readFileSync(require.resolve('@porsche-design-system/utilities'), 'utf8');
  const hashedFontFaceCssFiles = generatedUtilitiesPackage.match(/(font-face\.min[\w\d\.]*)/g);

  // TODO: reuse types from types.d.ts
  const newContent = `
type FontWeight = 'thin' | 'regular' | 'semi-bold' | 'bold';
type FontSubset = 'latin' | 'greek' | 'cyril';
type Options = {
  cdn?: 'auto' | 'cn';
  withoutTags?: boolean;
  prefix?: string;
  weight?: FontWeight | FontWeight[];
  subset?: FontSubset;
};

export const getFontFaceStylesheet = (opts?: Pick<Options, 'cdn' | 'withoutTags'>): string => {
  const url = \`\${opts?.cdn === 'cn'
    ? '${CDN_BASE_URL_CN}'
    : '${CDN_BASE_URL}'
  }/${CDN_BASE_PATH_STYLES}/\${opts?.cdn === 'cn'
    ? '${hashedFontFaceCssFiles?.find((x) => x.includes('.cn.'))}'
    : '${hashedFontFaceCssFiles?.find((x) => !x.includes('.cn.'))}'
  }\`;

  return opts?.withoutTags
    ? url
    : \`${minifyHTML('<link rel="preconnect" href="$URL">').replace('$URL', '${url}')}\`;
}

export const getInitialStyles = (opts?: Pick<Options, 'withoutTags' | 'prefix'>): string => {
  const tagNames = [${TAG_NAMES.map((x) => `'${x}'`).join(', ')}];
  const styleInnerHtml = tagNames.map((x) => opts?.prefix
    ? \`\${opts.prefix}-\${x}\`
    : x
  ).join(',') + '{visibility:hidden}';

  return opts?.withoutTags
    ? styleInnerHtml
    : \`<style>\${styleInnerHtml}</style>\`;
};

type Options1 = {
  cdn?: 'auto' | 'cn';
  withoutTags?: boolean;
  weight?: FontWeight;
  subset?: FontSubset;
};

type Options2 = {
  cdn?: 'auto' | 'cn';
  withoutTags?: boolean;
  weight?: FontWeight[];
  subset?: FontSubset;
};
export function getFontPreloadLink(opts?: Options1): string;
export function getFontPreloadLink(opts?: Options2): string[];
export function getFontPreloadLink(opts?: Options1 | Options2): string | string[] {
  const options: Options1 | Options2 = {
    subset: 'latin',
    weight: 'regular',
    cdn: 'auto',
    ...opts
  };
  const {subset, weight, cdn} = options;
  const cdnBaseUrl = cdn === 'cn' ? '${CDN_BASE_URL_CN}' : '${CDN_BASE_URL}';
  // TODO: auto generate
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

  if (Array.isArray(weight)) {
    const urls = [];
    let links = '';
    for (let w of weight) {
      urls.push(\`\${cdnBaseUrl}/${CDN_BASE_PATH_FONTS}/\${fonts[subset][w]}\`);
    }
    for (let url of urls) {
      links += \`${minifyHTML('<link rel="preconnect" href="$URL" as="font" type="font/woff2" crossorigin />').replace(
        '$URL',
        '${url}'
      )}\`
    }
    return opts?.withoutTags ? urls : links;
  }

  const url = \`\${cdnBaseUrl}/${CDN_BASE_PATH_FONTS}/\${fonts[subset][weight]}\`;
  const link = \`${minifyHTML('<link rel="preconnect" href="$URL" as="font" type="font/woff2" crossorigin />').replace(
    '$URL',
    '${url}'
  )}\`;
  return opts?.withoutTags ? url : link;
};
`;

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetFile, newContent.trimStart());
};

generatePartials().catch((e) => {
  console.error(e);
  process.exit(1);
});
