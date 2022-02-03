import { minifyHTML } from './utils';
import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';
import { CDN_BASE_PATH_META_ICONS, CDN_BASE_URL, CDN_BASE_URL_CN } from '../../../../../cdn.config';

const convertToJSX = (templates: string[]): JSX.Element[] => {
  return templates.map(
    (template) =>
      template
        .replace(/'\$cdnBaseUrl(.*?)'/g, '{`${cdnBaseUrl}$1`}')
        .replace('"$appTitle"', '{appTitle}') as unknown as JSX.Element
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
  ];

  const manifestLinks: string[] = [
    `<link rel="manifest" href='${CDN_BASE_URL}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.auto}' />`,
    `<link rel="manifest" href='${CDN_BASE_URL_CN}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.cn}' />`,
  ];

  const minifiedMetaIconsHTML = JSON.stringify(metaIconLinks.map((template) => minifyHTML(template)));
  const minifiedManifestsHTML = JSON.stringify(manifestLinks.map((template) => minifyHTML(template)));

  const metaIconTemplatesJSX = convertToJSX(metaIconLinks);
  const manifestTemplatesJSX = convertToJSX(manifestLinks);

  const types = `
type MetaIconsOptions = {
  appTitle: string;
  cdn?: Cdn;
  format?: Format;
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

  const metaIconTagsJsx = [${metaIconTemplatesJSX}];
  const manifestTagJsx = [${manifestTemplatesJSX}].find(item => JSON.stringify(item).includes(cdnBaseUrl));

  const metaIconTags = ${minifiedMetaIconsHTML}.map(metaIconTemplate => metaIconTemplate.replace('$appTitle', \`"\${appTitle}"\`).replace('$cdnBaseUrl', cdnBaseUrl));
  const webManifestTag = ${minifiedManifestsHTML}.find(item => item.includes(cdnBaseUrl));

  return format === 'html' ? [...metaIconTags, webManifestTag].join('') : [...metaIconTagsJsx, manifestTagJsx];
};`;

  return [types, func].join('\n\n');
};
