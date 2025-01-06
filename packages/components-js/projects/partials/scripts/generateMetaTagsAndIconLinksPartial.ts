import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';
import { CDN_BASE_PATH_META_ICONS, CDN_BASE_URL_CN, CDN_BASE_URL_COM } from '../../../../../cdn.config';
import { minifyHTML } from './utils';

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

  const themeColorLight = '#FFF';
  const themeColorDark = '#0E1418';

  const metadata = `{
      themeColor: [
        { media: '(prefers-color-scheme: light)', color: '${themeColorLight}' },
        { media: '(prefers-color-scheme: dark)', color: '${themeColorDark}' },
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
      openGraph: {
        image: {
          url: \`\${cdnBaseUrl}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.openGraph.ogImage}\`,
        }
      }
    }`;

  const metaIconLinks: string[] = [
    `<meta name="theme-color" content="${themeColorLight}" media="(prefers-color-scheme:light)" />`,
    `<meta name="theme-color" content="${themeColorDark}" media="(prefers-color-scheme:dark)" />`,
    '<meta name="mobile-web-app-capable" content="yes" />',
    '<meta name="apple-mobile-web-app-status-bar-style" content="default" />',
    '<meta name="apple-mobile-web-app-title" content="$appTitle" />',
    `<meta name="msapplication-TileImage" content='${metaIconCDNPath}/${META_ICONS_MANIFEST.mstile.mstile_270x270}' />`,
    '<meta name="msapplication-TileColor" content="#FFF" />',
    `<link rel="icon" sizes="any" href='${metaIconCDNPath}/${META_ICONS_MANIFEST.favicon.favicon}'/>`,
    `<link rel="icon" type="image/png" sizes="32x32" href='${metaIconCDNPath}/${META_ICONS_MANIFEST.favicon.favicon_32x32}'/>`,
    `<link rel="apple-touch-icon" href='${metaIconCDNPath}/${META_ICONS_MANIFEST.touchIcon.appleTouchIcon_180x180}' />`,
    `<link rel="manifest" href="$manifestUrl" />`,
  ];

  const ogImageMeta = [
    `<meta property="og:title" content="$appTitle" />`,
    `<meta property="og:image" content='${metaIconCDNPath}/${META_ICONS_MANIFEST.openGraph.ogImage}' />`,
    `<meta name="twitter:title" content="$appTitle" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content='${metaIconCDNPath}/${META_ICONS_MANIFEST.openGraph.ogImage}' />`,
  ];
  const minifiedOgImageMeta = JSON.stringify(ogImageMeta.map((template) => minifyHTML(template)));
  const minifiedMetaIconsHTML = JSON.stringify(metaIconLinks.map((template) => minifyHTML(template)));

  const metaIconTemplatesJSX = convertToJSX(metaIconLinks);
  const ogImageMetaJSX = convertToJSX(ogImageMeta);

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
  openGraph: {
    image: {
      url: string;
    };
  }
}

type GetMetaTagsAndIconLinksOptions = {
  appTitle: string;
  cdn?: Cdn;
  format?: FormatWithJS;
  ogImage?: boolean;
};`;

  const func = `export function getMetaTagsAndIconLinks(opts: GetMetaTagsAndIconLinksOptions & { format: 'js' }): Metadata;
export function getMetaTagsAndIconLinks(opts: GetMetaTagsAndIconLinksOptions & { format: 'jsx' }): JSX.Element;
export function getMetaTagsAndIconLinks(opts?: GetMetaTagsAndIconLinksOptions): string;
export function getMetaTagsAndIconLinks(opts?: GetMetaTagsAndIconLinksOptions): string | JSX.Element | Metadata {
  const { appTitle, cdn, format, ogImage }: GetMetaTagsAndIconLinksOptions = {
    appTitle: '',
    cdn: 'auto',
    format: 'html',
    ogImage: true,
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

  let metaIconTags = ${minifiedMetaIconsHTML};

  if (ogImage) {
    metaIconTags = ${minifiedOgImageMeta}.concat(metaIconTags);
  }
  const meta = metaIconTags.map(metaIconTemplate => metaIconTemplate.replace('$appTitle', \`"\${appTitle}"\`).replace('$cdnBaseUrl', cdnBaseUrl).replace('$manifestUrl', manifestUrl));

  if (format === 'html') {
    return meta.join('');
  } else if (format === 'jsx') {
    let metaIconTagsJSX = [${metaIconTemplatesJSX}];
    if (ogImage) {
      metaIconTagsJSX = [${ogImageMetaJSX}].concat(metaIconTagsJSX);
    }
    return <>{...metaIconTagsJSX}</>;
  } else {
    return ${metadata};
  }
}`;

  return [types, func].join('\n\n');
};
