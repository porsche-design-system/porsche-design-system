import type { Framework } from '@porsche-design-system/shared/models';
import type { LinkResolver, Page } from './pages';

/**
 * An output's structure is derived from the Storefront's tree (the sitemap) through an output map, which places every
 * page in a file. Links resolve against the same map, so an output's files and its links cannot disagree.
 */

/** Where a page lands in an output. */
export type Location = { file: string };

export type OutputMap = {
  /** Where a page, or its variant for a framework, lands; `undefined` leaves it out of the output. */
  locate: (page: Page, framework: Framework | undefined) => Location | undefined;
};

/**
 * Links within an output: a target the map places in this output is linked at its file, everything else goes to the
 * fallback.
 *
 * @param href how a file of the output is linked, e.g. below a deployment's base path.
 */
export const mapLinks =
  ({ map, href, fallback }: { map: OutputMap; href: (file: string) => string; fallback: LinkResolver }): LinkResolver =>
  (target, source) => {
    const to = target.page && map.locate(target.page, source.framework);
    if (!to) {
      return fallback(target, source);
    }
    if (target.hash && map.locate(source.page, source.framework)?.file === to.file) {
      return target.hash;
    }
    return `${href(to.file)}${target.hash}`;
  };

/** Links to the HTML page of a route, below a deployment's base path (`/pr-4777/partials/introduction/`). */
export const htmlLink = (prefix: string, route: string): string => `${prefix}/${route ? `${route}/` : ''}`;
