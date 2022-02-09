import { minifyHTML } from './utils';
import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';
import { CDN_BASE_PATH_META_ICONS, CDN_BASE_URL, CDN_BASE_URL_CN } from '../../../../../cdn.config';

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

  const metaIconLinks: string[] = [
    '<meta name="theme-color" content="#FFFFFF" />',
    '<meta name="apple-mobile-web-app-capable" content="yes" />',
    '<meta name="apple-mobile-web-app-status-bar-style" content="white" />',
    '<meta name="apple-mobile-web-app-title" content="$appTitle" />',
    `<meta name="msapplication-TileImage" content='${metaIconCDNPath}/${META_ICONS_MANIFEST.mstile.mstile_270x270}' />`,
    '<meta name="msapplication-TileColor" content="#FFFFFF" />',
    `<link rel="icon" type="image/png" sizes="32x32" href='${metaIconCDNPath}/${META_ICONS_MANIFEST.favicon.favicon_32x32}'/>`,
    `<link rel="apple-touch-icon" href='${metaIconCDNPath}/${META_ICONS_MANIFEST.touchIcon.appleTouchIcon_180x180}' />`,
    `<link rel="manifest" href="$manifestUrl" />`,
  ];

  const minifiedMetaIconsHTML = JSON.stringify(metaIconLinks.map((template) => minifyHTML(template)));

  const metaIconTemplatesJSX = convertToJSX(metaIconLinks).join('');

  const types = `type GetMetaTagsAndIconLinksOptions = {
  appTitle: string;
  cdn?: Cdn;
  format?: Format;
};`;

  const func = `export function getMetaTagsAndIconLinks(opts?: GetMetaTagsAndIconLinksOptions & { format: 'html'}): string;
export function getMetaTagsAndIconLinks(opts?: GetMetaTagsAndIconLinksOptions & { format: 'jsx'}): JSX.Element;
export function getMetaTagsAndIconLinks(opts?: GetMetaTagsAndIconLinksOptions): string;
export function getMetaTagsAndIconLinks(opts?: GetMetaTagsAndIconLinksOptions): string | JSX.Element {
  const { appTitle, cdn, format }: GetMetaTagsAndIconLinksOptions
  = {
    cdn: 'auto',
    format: 'html',
    ...opts
  };

  if (!appTitle) {
    throw new Error('Option "appTitle" is required to output "<meta name="apple-mobile-web-app-title" content="appTitle" />');
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const manifestUrlCom = '${CDN_BASE_URL}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.auto}';
  const manifestUrlCn = '${CDN_BASE_URL_CN}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.cn}';
  const manifestUrl = cdn === 'auto' ? manifestUrlCom : manifestUrlCn;

  const metaIconTags = ${minifiedMetaIconsHTML}.map(metaIconTemplate => metaIconTemplate.replace('$appTitle', \`"\${appTitle}"\`).replace('$cdnBaseUrl', cdnBaseUrl).replace('$manifestUrl', manifestUrl));

  return format === 'html' ? metaIconTags.join('') : <>${metaIconTemplatesJSX}</>;
}`;

  return [types, func].join('\n\n');
};
