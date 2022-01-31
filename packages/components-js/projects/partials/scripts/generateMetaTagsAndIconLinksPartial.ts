import { minifyHTML } from './utils';
import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';
import { CDN_BASE_PATH_META_ICONS, CDN_BASE_URL, CDN_BASE_URL_CN } from '../../../../../cdn.config';

type Template = {
  template: string;
  value: string;
};

const convertTemplates = (templates: Template[]): string[] => {
  return templates.map(({ template, value }) => {
    return minifyHTML(template).replace('$value', value);
  });
};

const convertTemplatesJsx = (templates: Template[]): JSX.Element[] => {
  return templates.map(({ template, value }) => {
    if (value.includes('$cdnBaseUrl')) {
      value = value.replace('$cdnBaseUrl', '${cdnBaseUrl}');
      template = template.replace('"$value"', `{\`${value}\`}`);
    } else {
      template = template.replace('$value', value).replace('""$appTitle""', '{appTitle}');
    }
    return template as unknown as JSX.Element;
  });
};

export const generateMetaTagsAndIconLinksPartial = (): string => {
  const metaIconCDNPath = `$cdnBaseUrl/${CDN_BASE_PATH_META_ICONS}`;

  const metaIconLinkTemplates: Template[] = [
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
      template: '<meta name="msapplication-TileColor" content="$value" />',
      value: '#FFFFFF',
    },
    {
      template: '<link rel="icon" type="image/png" sizes="32x32" href="$value" />',
      value: `${metaIconCDNPath}/${META_ICONS_MANIFEST.favicon.favicon_32x32}`,
    },
    {
      template: '<link rel="apple-touch-icon" href="$value" />',
      value: `${metaIconCDNPath}/${META_ICONS_MANIFEST.touchIcon.appleTouchIcon_180x180}`,
    },
  ];

  const manifestLinkTemplates: Template[] = [
    {
      template: '<link rel="manifest" href="$value" />',
      value: `${CDN_BASE_URL}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.auto}`,
    },
    {
      template: '<link rel="manifest" href="$value" />',
      value: `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.cn}`,
    },
  ];

  const metaIconTemplates = convertTemplates(metaIconLinkTemplates);
  const manifestTemplates = convertTemplates(manifestLinkTemplates);

  const metaIconTemplatesJsx = convertTemplatesJsx(metaIconLinkTemplates);
  const manifestTemplatesJsx = convertTemplatesJsx(manifestLinkTemplates);

  const types = `
type MetaIconsOptions = {
  appTitle: string;
  cdn?: Cdn;
  format?: PartialFormat;
};
type MetaIconsOptionsHtml = MetaIconsOptions & {
  format?: 'html';
};
type MetaIconsOptionsJsx = MetaIconsOptions & {
   format?: 'jsx';
};`;

  const func = `
export function getMetaTagsAndIconLinks(opts?: MetaIconsOptionsHtml): string;
export function getMetaTagsAndIconLinks(opts?: MetaIconsOptionsJsx): JSX.Element[];
export function getMetaTagsAndIconLinks(opts?: MetaIconsOptions): string | JSX.Element[] {
  const { appTitle, cdn, format }: MetaIconsOptions = {
    cdn: 'auto',
    format: 'html',
    ...opts
  };

  if (!appTitle) {
    throw new Error('Option "appTitle" is required to output "<meta name="apple-mobile-web-app-title" content="appTitle" />');
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const metaIconTemplates = ${JSON.stringify(metaIconTemplates)};
  const manifestTemplates = ${JSON.stringify(manifestTemplates)};

  const metaIconTagsJsx = [${metaIconTemplatesJsx}];
  const manifestTagJsx = [${manifestTemplatesJsx}].find(item => JSON.stringify(item).includes(cdnBaseUrl));

  const metaIconTags = metaIconTemplates.map(metaIconTemplate => metaIconTemplate.replace('$appTitle', appTitle).replace('$cdnBaseUrl', cdnBaseUrl));
  const webManifestTag = manifestTemplates.find(item => item.includes(cdnBaseUrl));

  return format === 'html' ? [...metaIconTags, webManifestTag].join('') : [...metaIconTagsJsx, manifestTagJsx];
};`;

  return [types, func].join('\n\n');
};
