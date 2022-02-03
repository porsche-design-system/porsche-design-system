import { minifyHTML } from './utils';
import { FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { CDN_BASE_PATH_FONTS } from '../../../../../cdn.config';

export const generateFontLinksPartial = (): string => {
  const fontSubsets = ['latin', 'greek', 'cyril'];
  const fontWeights = ['thin', 'regular', 'semi-bold', 'bold'];

  const types = `type FontSubset = ${fontSubsets.map((x) => `'${x}'`).join(' | ')};
type FontWeight = ${fontWeights.map((x) => `'${x}'`).join(' | ')};
type FontPreloadLinkOptions = {
  subset?: FontSubset;
  weights?: FontWeight[];
  cdn?: Cdn;
  withoutTags?: boolean;
  format?: Format;
}
type FontPreloadLinkOptionsWithTags = FontPreloadLinkOptions & {
  withoutTags?: false;
  format?: 'html';
};
type FontPreloadLinkOptionsWithoutTags = FontPreloadLinkOptions & {
  withoutTags?: true;
  format?: 'html';
};
type FontPreloadLinkOptionsJsx = FontPreloadLinkOptions & {
  withoutTags?: false;
  format?: 'jsx';
}`;

  const linkTemplate = minifyHTML('<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin>');

  const func = `export function getFontLinks(opts?: FontPreloadLinkOptionsWithTags): string;
export function getFontLinks(opts?: FontPreloadLinkOptionsWithoutTags): string[];
export function getFontLinks(opts?: FontPreloadLinkOptionsJsx): JSX.Element[];
export function getFontLinks(opts?: FontPreloadLinkOptions): string | string[] | JSX.Element[] {
  const { subset, weights, cdn, withoutTags, format }: FontPreloadLinkOptions = {
    subset: 'latin',
    weights: ['regular'],
    cdn: 'auto',
    withoutTags: false,
    format: 'html',
    ...opts
  };

  if (opts['weight']) {
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
  const linksHtml = urls.map((url) => \`${linkTemplate}\`).join('');
  const linksJsx = urls.map((url) => <link rel="preload" href={url} as="font" type="font/woff2" crossOrigin="true" />);

  const markup = format === 'html' ? linksHtml : linksJsx
  return withoutTags ? urls : markup;
};`;

  return [types, func].join('\n\n');
};
