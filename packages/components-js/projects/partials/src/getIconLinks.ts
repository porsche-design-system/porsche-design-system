import { ICONS_MANIFEST, type IconName } from '@porsche-design-system/icons';
import { CDN_BASE_PATH_ICONS } from '../../../../../cdn.config';
import { type Cdn, getCdnBaseUrl, type PartialLink } from './shared';

type GetIconLinksOptions = {
  /** List of icon names to preload (default: ['arrow-right']) */
  icons?: IconName[];
  /** CDN to load icon files from (default: 'auto') */
  cdn?: Cdn;
};

/**
 * Generates preload links for icon files.
 *
 * @param opts - Options to control which icons and CDN to use
 * @param opts.icons - Icon names to preload (default: ['arrow-right'])
 * @param opts.cdn - CDN to use for loading icons (default: 'auto')
 * @returns {PartialLink[]} Array of icon link objects suitable for creating `<link rel="preload">`
 *
 * @example
 * ```html
 * <!-- Intended usage: -->
 * <link rel="<icon.options.rel>" href="<icon.href>" as="<icon.options.as>" type="<icon.options.type>" <icon.option.crossorigin> />
 * ```
 */
export const getIconLinks = ({ icons = ['arrow-right'], cdn = 'auto' }: GetIconLinksOptions) => {
  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const urls = icons.map((icon) => `${cdnBaseUrl}/${CDN_BASE_PATH_ICONS}/${ICONS_MANIFEST[icon]}`);

  return urls.map(
    (url) =>
      ({ href: url, options: { rel: 'prefetch', as: 'image', type: 'image/svg+xml', crossOrigin: '' } }) as PartialLink
  );
};
