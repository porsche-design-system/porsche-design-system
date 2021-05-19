import { minifyHTML } from './utils';
import { CDN_BASE_PATH_ICONS } from '../../../../../cdn.config';
import { ICON_NAMES, ICONS_MANIFEST } from '@porsche-design-system/icons';

export const generateIconLinksPartial = (): string => {
  const iconType = ICON_NAMES.map((x) => `'${x}'`).join(' | ');
  const types = `type IconNameCamelCase = ${iconType};

type IconLinksOptions = {
  icons?: IconNameCamelCase[];
  cdn?: Cdn;
  withoutTags?: boolean;
};
type IconLinksOptionsWithTags = IconLinksOptions & {
  withoutTags?: false;
};
type IconLinksOptionsWithoutTags = IconLinksOptions & {
  withoutTags?: true;
};`;

  const link = minifyHTML('<link rel="prefetch" href="${url}" as="image" type="image/svg+xml" crossorigin>');

  const func = `export function getIconLinks(opts?: IconLinksOptionsWithTags): string;
export function getIconLinks(opts?: IconLinksOptionsWithoutTags): string[];
export function getIconLinks(opts?: IconLinksOptions): string | string[] {
  const options: IconLinksOptions = {
    icons: ['arrowHeadRight'],
    cdn: 'auto',
    withoutTags: false,
    ...opts
  };
  const { icons, cdn, withoutTags } = options;

  const supportedIconNames: IconNameCamelCase[] = ${JSON.stringify(ICON_NAMES)};
  const invalidIconNames = icons.filter((x) => !supportedIconNames.includes(x));

  if (invalidIconNames.length) {
    throw new Error(\`The following supplied icon names are invalid:
  \${invalidIconNames.join(', ')}

Please use only valid icon names:
  \${supportedIconNames.join(', ')}\`);
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const manifest = ${JSON.stringify(ICONS_MANIFEST)};
  const urls = icons.map((icon) => \`\${cdnBaseUrl}/${CDN_BASE_PATH_ICONS}/\${manifest[icon]}\`);
  const links = urls
    .map((url) => \`${link}\`)
    .join('');

  return withoutTags ? urls : links;
};`;

  return [types, func].join('\n\n');
};
