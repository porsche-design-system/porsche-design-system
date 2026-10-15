import { type Category, type DocsRoute, getPath, ROUTES_WITHOUT_SITEMAP_ENTRY, sitemap } from '@/sitemap';

export type SitemapRoute = {
  path: string;
  /** The component a page documents */
  tagName?: string;
};

/** Every route of the sitemap, in order: each category, then its pages, each followed by its tabs. */
export const getRoutes = (): SitemapRoute[] =>
  Object.entries(sitemap as Record<string, Category>).flatMap(([categoryKey, category]) => [
    { path: getPath(categoryKey) },
    ...Object.entries(category.pages).flatMap(([pageKey, page]) => [
      { path: getPath(categoryKey, pageKey), tagName: page.tagName },
      ...Object.keys(page.tabs ?? {}).map((tabKey) => ({ path: getPath(categoryKey, pageKey, tabKey) })),
    ]),
  ]);

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
