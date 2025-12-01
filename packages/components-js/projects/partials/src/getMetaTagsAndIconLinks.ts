import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';
import { CDN_BASE_PATH_META_ICONS, CDN_BASE_URL_CN, CDN_BASE_URL_COM } from '../../../../../cdn.config';
import { type Cdn, getCdnBaseUrl } from './shared';

// TODO: Remove title?
type GetMetaTagsAndIconLinksOptions = {
  /** Title of the app, used in apple web app metadata */
  appTitle: string;
  /** CDN to load meta icons from (default: 'auto') */
  cdn?: Cdn;
};

/**
 * Generates meta tags and icon links for an app.
 *
 * Returns theme colors, apple web app metadata, favicon and touch icons, web manifest URL,
 * and Open Graph image info, all pointing to the appropriate CDN.
 *
 * @param opts - Options for generating meta tags and icon links
 * @param opts.appTitle - Title of the app, used for apple web app metadata
 * @param opts.cdn - CDN to load meta icons from (default: 'auto')
 * @returns {{
 *   themeColor: { media: string; color: string }[];
 *   appleWebApp: { title: string; statusBarStyle: string };
 *   icons: { icon: { url: string; sizes: string; type?: string }[]; apple: string };
 *   manifest: string;
 *   openGraph: { image: { url: string } };
 * }} Object containing meta tags and icon links
 *
 */
export const getMetaTagsAndIconLinks = ({ appTitle = '', cdn = 'auto' }: GetMetaTagsAndIconLinksOptions) => {
  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const manifestUrlCom = `${CDN_BASE_URL_COM}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.auto}`;
  const manifestUrlCn = `${CDN_BASE_URL_CN}/${CDN_BASE_PATH_META_ICONS}/${META_ICONS_MANIFEST.webManifest.cn}`;
  const manifestUrl = cdn === 'auto' ? manifestUrlCom : manifestUrlCn;
  // TODO: Import from tokens package
  const themeColorLight = '#FFF';
  const themeColorDark = '#0E1418';

  // TODO: Change links into PartialLink format and create a similar structure for meta tags? Integration in Next would be more difficult but more consistent to the other partials.
  return {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: themeColorLight },
      { media: '(prefers-color-scheme: dark)', color: themeColorDark },
    ],
    appleWebApp: {
      title: appTitle,
      statusBarStyle: 'default',
    },
    icons: {
      icon: [
        {
          url: `${cdnBaseUrl}${CDN_BASE_PATH_META_ICONS}${META_ICONS_MANIFEST.favicon.favicon}`,
          sizes: 'any',
        },
        {
          url: `${cdnBaseUrl}${CDN_BASE_PATH_META_ICONS}${META_ICONS_MANIFEST.favicon.favicon_32x32}`,
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: `${cdnBaseUrl}${CDN_BASE_PATH_META_ICONS}${META_ICONS_MANIFEST.touchIcon.appleTouchIcon_180x180}`,
    },
    manifest: manifestUrl,
    openGraph: {
      image: {
        url: `${cdnBaseUrl}${CDN_BASE_PATH_META_ICONS}${META_ICONS_MANIFEST.openGraph.ogImage}`,
      },
    },
  };
};
