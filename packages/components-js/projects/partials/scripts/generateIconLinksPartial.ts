import { minifyHTML } from './utils';
import { CDN_BASE_PATH_ICONS } from '../../../../../cdn.config';
import { ICON_NAMES, ICONS_MANIFEST } from '@porsche-design-system/icons';

export const generateIconLinksPartial = (): string => {
  const iconType = ICON_NAMES.map((x) => `'${x}'`).join(' | ');
  const types = `type IconName = ${iconType};

type GetIconLinksOptions = {
  icons?: IconName[];
  cdn?: Cdn;
  format?: Format;
};`;

  const link = minifyHTML('<link rel="prefetch" href="${url}" as="image" type="image/svg+xml" crossorigin>');

  const func = `export function getIconLinks(opts: GetIconLinksOptions & { format: 'jsx' }): JSX.Element;
export function getIconLinks(opts?: GetIconLinksOptions): string;
export function getIconLinks(opts?: GetIconLinksOptions): string | JSX.Element {
  const { icons, cdn, format }: GetIconLinksOptions = {
    icons: ['arrow-right'],
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getIconLinks');

  const supportedIconNames: IconName[] = ${JSON.stringify(ICON_NAMES)};
  const invalidIconNames = icons.filter((x) => !supportedIconNames.includes(x));

  if (invalidIconNames.length) {
    throw new Error(\`[Porsche Design System] The following supplied icon names are invalid:
  \${invalidIconNames.join(', ')}

Please use only valid icon names:
  \${supportedIconNames.join(', ')}\`);
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const manifest = ${JSON.stringify(ICONS_MANIFEST)};
  const urls = icons.map((icon) => \`\${cdnBaseUrl}/${CDN_BASE_PATH_ICONS}/\${manifest[icon]}\`);
  const linksHtml = urls
    .map((url) => \`${link}\`)
    .join('');
  const linksJsx = urls.map((url, index) => <link key={index} rel="prefetch" href={url} as="image" type="image/svg+xml" crossOrigin="" />);

  return format === 'html'
    ? linksHtml
    : <>{linksJsx}</>;
}`;

  return [types, func].join('\n\n');
};
