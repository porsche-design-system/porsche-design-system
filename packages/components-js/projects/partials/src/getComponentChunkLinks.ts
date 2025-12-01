import { CDN_BASE_PATH_COMPONENTS } from '../../../../../cdn.config';
import { COMPONENT_CHUNKS_MANIFEST, type ComponentChunkName } from '../../components-wrapper';
import { type Cdn, getCdnBaseUrl, type PartialLink } from './shared';

type GetComponentChunkLinksOptions = {
  /** Component names to preload (core is always included) */
  components?: ComponentChunkName[];
  /** CDN to load chunks from (default: 'auto') */
  cdn?: Cdn;
};

/**
 * Generates chunk link information for preloading component scripts.
 * The 'core' chunk will always be returned, even if `components` is empty.
 *
 * @param opts - Options to control which components and CDN to use
 * @param opts.components - Components to preload (core is always included)
 * @param opts.cdn - CDN to use (defaults to 'auto')
 * @returns @returns {PartialLink[]} Array of component chunk link objects suitable for creating `<link rel="preload">`
 *
 * @example
 * ```html
 * <!-- Intended usage: -->
 * <link rel="<chunk.options.rel>" href="<chunk.href>" as="<chunk.options.as>" <chunk.options.crossorigin> />
 * ```
 */
export const getComponentChunkLinks = ({
  components = [],
  cdn = 'auto',
}: GetComponentChunkLinksOptions): PartialLink[] => {
  const cdnBaseUrl = getCdnBaseUrl(cdn);

  return ['core', ...components].map((name) => ({
    href: `${cdnBaseUrl}/${CDN_BASE_PATH_COMPONENTS}/${COMPONENT_CHUNKS_MANIFEST[name as keyof typeof COMPONENT_CHUNKS_MANIFEST]}`,
    options: {
      rel: 'preload',
      as: 'script',
      ...(name === 'core' ? { crossOrigin: '' } : {}),
    },
  }));
};
