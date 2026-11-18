import { kebabCase } from 'change-case';
import { slug } from 'github-slugger';
import type { DocsRoute } from '@/sitemap';

/**
 * What links can target: a route of the sitemap and the anchor of a heading on its page. `DocsHref` types links in TSX
 * (see `DocsLink`); MDX isn't typechecked, so `tests/unit/specs/links.spec.ts` checks its links at runtime.
 */

/** A route, optionally with the anchor of a heading on its page: `/components/button/usage#do`. */
export type DocsHref = DocsRoute | `${DocsRoute}#${string}`;

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
