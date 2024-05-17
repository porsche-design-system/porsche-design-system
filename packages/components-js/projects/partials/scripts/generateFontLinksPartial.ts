import { minifyHTML } from './utils';
import { FONTS_MANIFEST } from '@porsche-design-system/fonts';
import { CDN_BASE_PATH_FONTS } from '../../../../../cdn.config';

export const generateFontLinksPartial = (): string => {
  const fontSubsets = ['latin', 'greek', 'cyril', 'arabic', 'pashto', 'urdu'];
  const fontWeights = ['regular', 'semi-bold', 'bold'];

  const types = `type FontSubset = ${fontSubsets.map((x) => `'${x}'`).join(' | ')};
type FontWeight = ${fontWeights.map((x) => `'${x}'`).join(' | ')};
type GetFontLinksOptions = {
  subset?: FontSubset;
  weights?: FontWeight[];
  cdn?: Cdn;
  format?: FormatWithJS;
};`;

  const linkTemplate = minifyHTML('<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin>');

  const func = `export function getFontLinks(opts: GetFontLinksOptions & { format: 'js' }): PartialLink[];
export function getFontLinks(opts: GetFontLinksOptions & { format: 'jsx' }): JSX.Element;
export function getFontLinks(opts?: GetFontLinksOptions): string;
export function getFontLinks(opts?: GetFontLinksOptions): string | JSX.Element | PartialLink[] {
  const { subset, weights, cdn, format }: GetFontLinksOptions = {
    subset: 'latin',
    weights: ['regular', 'semi-bold'],
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getFontLinks');

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const fonts: Record<FontSubset, Partial<Record<FontWeight, string>>> = {
    latin: {
      regular: '${FONTS_MANIFEST.porscheNextWLaRegular}',
      'semi-bold': '${FONTS_MANIFEST.porscheNextWLaSemiBold}',
      bold: '${FONTS_MANIFEST.porscheNextWLaBold}',
    },
    greek: {
      regular: '${FONTS_MANIFEST.porscheNextWGrRegular}',
      'semi-bold': '${FONTS_MANIFEST.porscheNextWGrSemiBold}',
      bold: '${FONTS_MANIFEST.porscheNextWGrBold}',
    },
    cyril: {
      regular: '${FONTS_MANIFEST.porscheNextWCyRegular}',
      'semi-bold': '${FONTS_MANIFEST.porscheNextWCySemiBold}',
      bold: '${FONTS_MANIFEST.porscheNextWCyBold}',
    },
    arabic: {
      regular: '${FONTS_MANIFEST.porscheNextWArRegular}',
      bold: '${FONTS_MANIFEST.porscheNextWArBold}',
    },
    pashto: {
      regular: '${FONTS_MANIFEST.porscheNextWPaRegular}',
      bold: '${FONTS_MANIFEST.porscheNextWPaBold}',
    },
    urdu: {
      regular: '${FONTS_MANIFEST.porscheNextWUrRegular}',
      bold: '${FONTS_MANIFEST.porscheNextWUrBold}',
    },
  };

  const supportedSubsets: FontSubset[] = ${JSON.stringify(fontSubsets)};
  const supportedWeights: FontWeight[] = ${JSON.stringify(fontWeights)};

  const isSubsetInvalid = !supportedSubsets.includes(subset);
  const invalidWeights = weights.filter((x) => !supportedWeights.includes(x));

  if (isSubsetInvalid) {
    throw new Error(\`[Porsche Design System] The following supplied font subset is invalid:
  \${subset}

Please use only valid font subset:
  \${supportedSubsets.join(', ')}\`);
  }

  if (invalidWeights.length) {
    throw new Error(\`[Porsche Design System] The following supplied font weights are invalid:
  \${invalidWeights.join(', ')}

Please use only valid font weights:
  \${supportedWeights.join(', ')}\`);
  }

  const urls = weights.map((weight) => fonts[subset][weight] && \`\${cdnBaseUrl}/${CDN_BASE_PATH_FONTS}/\${fonts[subset][weight]}\`).filter(Boolean);
  const linksHtml = urls.map((url) => \`${linkTemplate}\`).join('');
  const linksJsx = urls.map((url, index) => <link key={index} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="" />);

  if (format === 'html') {
    return linksHtml;
  } else if (format === 'jsx') {
    return <>{linksJsx}</>;
  } else {
    return urls.map((url) => ({ href: url, options: { as: 'font', type: "font/woff2", crossOrigin: "" } } as PartialLink))
  }
}`;

  return [types, func].join('\n\n');
};
