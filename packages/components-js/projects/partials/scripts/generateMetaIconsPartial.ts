import { minifyHTML } from './utils';
import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';

import { CDN_BASE_PATH_META_ICONS } from '../../../../../cdn.config';
export const generateMetaIconsPartial = (): string => {
  const metaIconCDNPath = `$cdnBaseUrl/${CDN_BASE_PATH_META_ICONS}`;

  const linkTemplates = [
    {
      template: '<meta name="theme-color" content="$value" />',
      value: '#FFFFFF',
    },
    {
      template: '<meta name="apple-mobile-web-app-capable" content="$value" />',
      value: 'yes',
    },
    {
      template: '<meta name="apple-mobile-web-app-status-bar-style" content="$value" />',
      value: 'white',
    },
    {
      template: '<meta name="apple-mobile-web-app-title" content="$value" />',
      value: `"$appTitle"`, //wrapped in quotes to work with spaces after minification of template
    },
    {
      template: '<meta name="msapplication-TileImage" content="$value" />',
      value: `${metaIconCDNPath}/${META_ICONS_MANIFEST.mstile.mstile_270x270}`,
    },
    {
      template: '<meta name="msapplication-TileColor" content="$value">',
      value: '#FFFFFF',
    },
    {
      template: '<link rel="icon" type="image/png" sizes="16x16" href="$value" />',
      value: `${metaIconCDNPath}/${META_ICONS_MANIFEST.favicon.favicon_16x16}`,
    },
    {
      template: '<link rel="icon" type="image/png" sizes="32x32" href="$value" />',
      value: `${metaIconCDNPath}/${META_ICONS_MANIFEST.favicon.favicon_32x32}`,
    },
    {
      template: '<link rel="apple-touch-icon" href="$value" />',
      value: `${metaIconCDNPath}/${META_ICONS_MANIFEST.touchIcon.appleTouchIcon_180x180}`,
    },
    {
      template: '<link rel="mask-icon" color="#FFFFFF" href="$value" />',
      value: `${metaIconCDNPath}/${META_ICONS_MANIFEST.pinnedTab.pinnedTabIcon}`,
    },
  ];

  const metaIconTemplates = linkTemplates.map(({ template, value }) => {
    return minifyHTML(template).replace('$value', value);
  });

  const types = `
type MetaIconsOptions = {
  appTitle: string;
  cdn?: Cdn;
  withoutTags?: boolean;
};
type MetaIconsOptionsWithTags = MetaIconsOptions & {
  withoutTags?: false;
};
type MetaIconsOptionsWithoutTags = MetaIconsOptions & {
  withoutTags?: true;
};`;

  const func = `
export function getMetaIcons(opts?: MetaIconsOptionsWithTags): string;
export function getMetaIcons(opts?: MetaIconsOptionsWithoutTags): string[];
export function getMetaIcons(opts?: MetaIconsOptions): string | string[] {
  const options: MetaIconsOptions = {
    cdn: 'auto',
    withoutTags: false,
    ...opts
  };
  const { appTitle, cdn,  withoutTags } = options;

  if (!appTitle) {
    throw new Error('Option "appTitle" is required to output "<meta name="apple-mobile-web-app-title" content="appTitle" />');
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const metaIconTemplates = ${JSON.stringify(metaIconTemplates)};
  const metaIconTags = metaIconTemplates.map(metaIconTemplate=> metaIconTemplate.replace('$appTitle', appTitle).replace('$cdnBaseUrl', cdnBaseUrl))
  const urls = metaIconTags.map((template) => template.match(/(http.*)>/)?.[1]).filter((x) => x);

  return withoutTags ? urls : metaIconTags.join('');
};`;

  return [types, func].join('\n\n');
};
