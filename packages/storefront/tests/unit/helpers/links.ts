import { type DocsRoute, ROUTES_WITHOUT_SITEMAP_ENTRY } from '@/links';
import { type Route, type Routes, sitemap } from '@/sitemap';

/** Every route in the sitemap, depth first. */
export const getRoutes = (routes: Routes = sitemap): Route[] =>
  Object.values(routes).flatMap((route) => [route, ...getRoutes(route.subPaths ?? {})]);

const docsRoutes: ReadonlySet<string> = new Set([
  ...getRoutes().map(({ path }) => path),
  ...ROUTES_WITHOUT_SITEMAP_ENTRY,
]);

/** The runtime counterpart of `DocsRoute`, for MDX, which isn't typechecked. */
export const isDocsRoute = (path: string): path is DocsRoute => docsRoutes.has(path);

/**
 * What an `href` written in the Storefront's content points to:
 *
 * - `route`: a Storefront page, root-absolute and without a trailing slash: `/components/button/usage#do`. `next/link`
 *   adds the base path and the trailing slash.
 * - `anchor`: a heading on the same page: `#do`.
 * - `file`: a file in `public/`, relative: `assets/downloads/AGENTS.md`. The `<base>` of the root layout resolves it
 *   against the deployment's base path, which a root-absolute `/assets/…` would miss.
 * - `external`: anything with a scheme: `https:`, `mailto:`.
 */
export type ParsedHref =
  | { kind: 'route'; path: string; anchor?: string }
  | { kind: 'anchor'; anchor: string }
  | { kind: 'file'; path: string }
  | { kind: 'external' };

export const parseHref = (href: string): ParsedHref => {
  if (/^[a-z][a-z\d+.-]*:/i.test(href)) {
    return { kind: 'external' };
  }
  if (href.startsWith('#')) {
    return { kind: 'anchor', anchor: href.slice(1) };
  }
  if (href.startsWith('/')) {
    const [path, anchor] = href.split('#');
    return anchor === undefined ? { kind: 'route', path } : { kind: 'route', path, anchor };
  }
  return { kind: 'file', path: href };
};
