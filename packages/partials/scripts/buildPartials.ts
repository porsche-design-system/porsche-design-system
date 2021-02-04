import * as fs from 'fs';
import * as path from 'path';
import { FONTS_MANIFEST } from '@porsche-design-system/assets';
import { COMPONENT_CHUNK_NAMES, COMPONENT_CHUNKS_MANIFEST, TAG_NAMES } from '@porsche-design-system/shared';
import { minifyHTML } from './utils';
import {
  CDN_BASE_URL,
  CDN_BASE_URL_CN,
  CDN_BASE_PATH_STYLES,
  CDN_BASE_PATH_FONTS,
  CDN_BASE_PATH_COMPONENTS,
} from '../../../cdn.config';

const generateSharedCode = (): string => {
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

const generateInitialStylesPartial = (): string => {
  const types = `type InitialStylesOptions = {
  prefix?: string;
  withoutTags?: boolean;
}`;

  const tagNames = TAG_NAMES.map((x) => `'${x}'`).join(', ');

  const func = `
export const getInitialStyles = (opts?: InitialStylesOptions): string => {
  const options: InitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    ...opts
  };
  const { prefix, withoutTags } = options;

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
  const fontSubsets = ['latin', 'greek', 'cyril'];
  const fontWeights = ['thin', 'regular', 'semi-bold', 'bold'];

  const types = `type FontSubset = ${fontSubsets.map((x) => `'${x}'`).join(' | ')};
type FontWeight = ${fontWeights.map((x) => `'${x}'`).join(' | ')};
type FontPreloadLinkOptions = {
  subset?: FontSubset;
  weights?: FontWeight[];
  cdn?: Cdn;
  withoutTags?: boolean;
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
    weights: ['regular'],
    cdn: 'auto',
    withoutTags: false,
    ...opts
  };
  const { subset, weights, cdn, withoutTags } = options;

  if (options['weight']) {
    throw new Error('Option "weight" is not supported, please use "weights" instead');
  }

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

  const supportedSubsets: FontSubset[] = ${JSON.stringify(fontSubsets)};
  const supportedWeights: FontWeight[] = ${JSON.stringify(fontWeights)};

  const isSubsetInvalid = !supportedSubsets.includes(subset);
  const invalidWeights = weights.filter((x) => !supportedWeights.includes(x));

  if (isSubsetInvalid) {
    throw new Error(\`The following supplied font subset is invalid:
  \${subset}

Please use only valid font subset:
  \${supportedSubsets.join(', ')}\`);
  }

  if (invalidWeights.length) {
    throw new Error(\`The following supplied font weights are invalid:
  \${invalidWeights.join(', ')}

Please use only valid font weights:
  \${supportedWeights.join(', ')}\`);
  }

  const urls = weights.map((weight) => \`\${cdnBaseUrl}/${CDN_BASE_PATH_FONTS}/\${fonts[subset][weight]}\`);
  const links = urls.map((link) => \`${link}\`).join('');

  return withoutTags ? urls : links;
};`;

  return [types, func].join('\n\n');
};

const generateComponentChunkLinksPartial = (): string => {
  const chunkNamesTypeLiteral = COMPONENT_CHUNK_NAMES.map((x) => `'${x}'`).join(' | ');
  // 'any' is fallback when COMPONENT_CHUNK_NAMES is an empty array because components-js wasn't built, yet
  const types = `type ComponentChunkName = ${chunkNamesTypeLiteral || 'any'};

type ComponentChunkLinksOptions = {
  components?: ComponentChunkName[];
  cdn?: Cdn;
  withoutTags?: boolean;
};
type ComponentChunkLinksOptionsWithTags = ComponentChunkLinksOptions & {
  withoutTags?: false;
};
type ComponentChunkLinksOptionsWithoutTags = ComponentChunkLinksOptions & {
  withoutTags?: true;
};`;

  const link = minifyHTML('<link rel="preload" href="$URL" as="script">').replace('$URL', '${url}');

  const func = `export function getComponentChunkLinks(opts?: ComponentChunkLinksOptionsWithTags): string;
export function getComponentChunkLinks(opts?: ComponentChunkLinksOptionsWithoutTags): string[];
export function getComponentChunkLinks(opts?: ComponentChunkLinksOptions): string | string[] {
  const options: ComponentChunkLinksOptions = {
    components: [],
    cdn: 'auto',
    withoutTags: false,
    ...opts
  };
  const { components, cdn, withoutTags } = options;

  const supportedComponentChunkNames: ComponentChunkName[] = ${JSON.stringify(COMPONENT_CHUNK_NAMES)};
  const invalidComponentChunkNames = components.filter((x) => !supportedComponentChunkNames.includes(x));

  if (invalidComponentChunkNames.length) {
    throw new Error(\`The following supplied component chunk names are invalid:
  \${invalidComponentChunkNames.join(', ')}

Please use only valid component chunk names:
  \${supportedComponentChunkNames.join(', ')}\`);
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const manifest = ${JSON.stringify(COMPONENT_CHUNKS_MANIFEST)};
  const urls = ['core'].concat(components).map((cmp) => \`\${cdnBaseUrl}/${CDN_BASE_PATH_COMPONENTS}/\${manifest[cmp]}\`);
  const links = urls
    .map((url) => \`${link}\`)
    .map((link, idx) => idx === 0 ? link.replace('>', ' crossorigin>') : link) // core needs crossorigin attribute
    .join('');

  return withoutTags ? urls : links;
};`;

  return [types, func].join('\n\n');
};

const generatePartials = async (): Promise<void> => {
  const targetDirectory = path.normalize('./src/lib');
  const targetFile = path.resolve(targetDirectory, 'partials.ts');

  const content = [
    generateSharedCode(),
    generateFontFaceStylesheetPartial(),
    generateInitialStylesPartial(),
    generateFontLinksPartial(),
    generateComponentChunkLinksPartial(),
  ].join('\n\n');

  fs.mkdirSync(targetDirectory, { recursive: true });
  fs.writeFileSync(targetFile, content);
};

generatePartials().catch((e) => {
  console.error(e);
  process.exit(1);
});
