import {minifyHTML} from './utils';
import {META_ICONS_MANIFEST} from '@porsche-design-system/meta-icons';
import {CDN_BASE_PATH_META_ICONS, CDN_BASE_URL_COM, CDN_BASE_URL_CN} from '../../../../../cdn.config';
import {Cdn} from "@porsche-design-system/components-js/partials/shared";
import {FormatWithJS} from "../src/shared";

const convertToJSX = (templates: string[]): JSX.Element[] => {
  return templates.map(
    (template) =>
      template
        .replace(/'\$cdnBaseUrl(.*?)'/g, '{`${cdnBaseUrl}$1`}')
        .replace('"$appTitle"', '{appTitle}')
        .replace('"$manifestUrl"', '{manifestUrl}') as unknown as JSX.Element
  );
};

export const generateMetaTagsAndIconLinksPartial = (): string => {
  const metaIconCDNPath = `$cdnBaseUrl/${CDN_BASE_PATH_META_ICONS}`;

  const metadata = `{
      themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FFF' },
        { media: '(prefers-color-scheme: dark)', color: '#0E1418' },
      ],
      appleWebApp: {
        title: appTitle,
        statusBarStyle: 'default',
      },
      icons: {
        icon: [
          {
            url: \`\${cdnBaseUrl}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.favicon.favicon}\`,
            sizes: "any"
          },
          {
            url: \`\${cdnBaseUrl}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.favicon.favicon_32x32}\`,
            sizes: '32x32',
            type: 'image/png'
          },
        ],
        apple: \`\${cdnBaseUrl}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.touchIcon.appleTouchIcon_180x180}\`,
      },
      manifest: \`\${manifestUrl}\`,
    }`;

  const metaIconLinks: string[] = [
    '<meta name="theme-color" content="#FFF" media="(prefers-color-scheme:light)" />',
    '<meta name="theme-color" content="#0E1418" media="(prefers-color-scheme:dark)" />',
    '<meta name="apple-mobile-web-app-capable" content="yes" />',
    '<meta name="apple-mobile-web-app-status-bar-style" content="default" />',
    '<meta name="apple-mobile-web-app-title" content="$appTitle" />',
    `<meta name="msapplication-TileImage" content='${metaIconCDNPath}/${META_ICONS_MANIFEST.mstile.mstile_270x270}' />`,
    '<meta name="msapplication-TileColor" content="#FFF" />',
    `<link rel="icon" sizes="any" href='${metaIconCDNPath}/${META_ICONS_MANIFEST.favicon.favicon}'/>`,
    `<link rel="icon" type="image/png" sizes="32x32" href='${metaIconCDNPath}/${META_ICONS_MANIFEST.favicon.favicon_32x32}'/>`,
    `<link rel="apple-touch-icon" href='${metaIconCDNPath}/${META_ICONS_MANIFEST.touchIcon.appleTouchIcon_180x180}' />`,
    `<link rel="manifest" href="$manifestUrl" />`,
  ];

  const minifiedMetaIconsHTML = JSON.stringify(metaIconLinks.map((template) => minifyHTML(template)));

  const metaIconTemplatesJSX = convertToJSX(metaIconLinks).join('');

  const types = `type Metadata = {
  themeColor: { media: string, color: string }[];
  appleWebApp?: {
    title?: string;
    statusBarStyle?: 'default' | 'black' | 'black-translucent';
  };
  icons?: {
    icon?: { url: string | URL, sizes?: string, type?: string }[];
    apple?: string;
  };
  manifest?: null | string | URL;
}

type GetMetaTagsAndIconLinksOptions = {
  appTitle: string;
  cdn?: Cdn;
  format?: FormatWithJS;
};`;

  const func = `export function getMetaTagsAndIconLinks(opts: GetMetaTagsAndIconLinksOptions & { format: 'js' }): Metadata;
export function getMetaTagsAndIconLinks(opts: GetMetaTagsAndIconLinksOptions & { format: 'jsx' }): JSX.Element;
export function getMetaTagsAndIconLinks(opts?: GetMetaTagsAndIconLinksOptions): string;
export function getMetaTagsAndIconLinks(opts?: GetMetaTagsAndIconLinksOptions): string | JSX.Element | Metadata {
  const { appTitle, cdn, format }: GetMetaTagsAndIconLinksOptions = {
    appTitle: '',
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getMetaTagsAndIconLinks');

  if (!appTitle) {
    throw new Error('[Porsche Design System] Option "appTitle" is required to output "<meta name="apple-mobile-web-app-title" content="appTitle" />');
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const manifestUrlCom = '${CDN_BASE_URL_COM}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.auto}';
  const manifestUrlCn = '${CDN_BASE_URL_CN}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.cn}';
  const manifestUrl = cdn === 'auto' ? manifestUrlCom : manifestUrlCn;

  const metaIconTags = ${minifiedMetaIconsHTML}.map(metaIconTemplate => metaIconTemplate.replace('$appTitle', \`"\${appTitle}"\`).replace('$cdnBaseUrl', cdnBaseUrl).replace('$manifestUrl', manifestUrl));

  if (format === 'html') {
    return metaIconTags.join('');
  } else if (format === 'jsx') {
    return <>${metaIconTemplatesJSX}</>;
  } else {
    return ${metadata};
  }
}`;

  return [types, func].join('\n\n');
};
