import type { TagNameWithChunk } from '@porsche-design-system/shared';
import { kebabCase } from 'change-case';
import { slug } from 'github-slugger';
import type { Route, SitemapTree } from '@/sitemap';

/**
 * What links can target: the routes of the sitemap and the anchors of headings. `DocsHref` types links in TSX (see
 * `DocsLink`); MDX isn't typechecked, so `tests/unit/specs/links.spec.ts` checks its links at runtime.
 */

/** Pages that are deliberately not part of the navigation but can be linked. */
export const ROUTES_WITHOUT_SITEMAP_ENTRY = ['/', '/accessibility-statement', '/license'] as const;

/** Ignores the index signature the generated component pages add to the hand-written tree. */
type LiteralKey<T> = keyof { [K in keyof T as string extends K ? never : K]: unknown };

/** Every `path` written in the sitemap, at any depth. */
type SitemapRoute<T> = {
  [K in LiteralKey<T>]: T[K] extends { readonly path: infer P extends string }
    ? P | (T[K] extends { readonly subPaths: infer S } ? SitemapRoute<S> : never)
    : never;
}[LiteralKey<T>];

type Slug<T> = T extends `p-${infer S}` ? S : never;

/**
 * The component pages, generated from `componentMeta` at runtime. Looser than the sitemap: it allows every tab for
 * every chunked component, which the link test narrows down for MDX.
 */
type ComponentRoute =
  | `/components/${Slug<TagNameWithChunk>}`
  | `/components/${Slug<TagNameWithChunk>}/${'configurator' | 'examples' | 'usage' | 'accessibility' | 'api'}`;

/** A route of the Storefront, without a trailing slash: `/components/button/usage`. */
export type DocsRoute = SitemapRoute<SitemapTree> | ComponentRoute | (typeof ROUTES_WITHOUT_SITEMAP_ENTRY)[number];

/** A route, optionally with the anchor of a heading on its page: `/components/button/usage#do`. */
export type DocsHref = DocsRoute | `${DocsRoute}#${string}`;

/** Where a route leads: a category or a page with tabs to its first entry, `/news` → `/news/migration-guide/porsche-design-system`. */
export const getLandingRoute = (route: Route): Route =>
  route.subPaths ? getLandingRoute(Object.values(route.subPaths)[0]) : route;

const CHANGELOG_RELEASE = /^\[([^\]]+)]/;

/** `3.31.0` → `3-31-0`, the anchor of that release in the changelog. */
export const getVersionAnchorId = (version: string): string => kebabCase(version);

/**
 * The anchor of a heading, generated the way GitHub and most Markdown readers do, so a link to a section works in the
 * Storefront and in its Markdown alike: `Unsupported APIs` → `unsupported-apis`.
 *
 * Changelog releases (`[3.31.0] - 2025-11-13`) are the exception: their anchor is the version alone, `3-31-0`, so a
 * release can be linked without knowing its date.
 */
export const getHeadingAnchorId = (heading: string): string => {
  const version = heading.match(CHANGELOG_RELEASE)?.[1];
  return version ? getVersionAnchorId(version) : slug(heading);
};
