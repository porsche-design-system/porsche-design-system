import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getHeadingAnchorId } from '@/links';
import { getLandingPath } from '@/sitemap';
import { isDocsRoute, parseHref } from '../helpers/links';
import {
  type DocsPage,
  getDocsPages,
  getImportSources,
  getLinks,
  getMdxFiles,
  type MdxLink,
  publicDir,
  toRelativePath,
} from '../helpers/mdxDocs';

/**
 * Checks every link written in the Storefront's MDX, pages and fragments alike, before anything is built: routes
 * against the sitemap, anchors against the headings of the page they point to, and files against `public/`.
 * See `parseHref` in `tests/unit/helpers/links.ts` for the kinds of links and how they are written.
 */

/** Generated from `packages/components/CHANGELOG.md`, whose released entries keep the links they were written with. */
const GENERATED_FILES = ['src/app/(main)/news/changelog/page.mdx'];

/** Pages outside the navigation that demonstrate rendering, e.g. the same heading on purpose. */
const isDemoPage = (page: DocsPage): boolean => page.route.startsWith('/-/');

const pages = getDocsPages();
const pagesByRoute = new Map(pages.map((page) => [page.route, page]));
const links = getMdxFiles().flatMap(getLinks);

/** The pages that render a file, so a link to `#anchor` in a fragment is checked on each of them. */
const getPagesRendering = (file: string): DocsPage[] => pages.filter((page) => page.renderedFiles.includes(file));

const describeLink = ({ file, line, href }: MdxLink): string => `${file}:${line} → ${href}`;

const routeLinks = links.flatMap((link) => {
  const parsed = parseHref(link.href);
  return parsed.kind === 'route' ? [{ link, ...parsed }] : [];
});

describe('links in MDX', () => {
  it('link to a route of the sitemap', () => {
    const broken = routeLinks
      .filter(({ path }) => !isDocsRoute(path.replace(/(.)\/$/, '$1')))
      .map(({ link }) => describeLink(link));

    expect(broken).toEqual([]);
  });

  it('write routes without a trailing slash, the way the sitemap does', () => {
    const withTrailingSlash = routeLinks
      .filter(({ link }) => !GENERATED_FILES.includes(link.file))
      .filter(({ path }) => path !== '/' && path.endsWith('/'))
      .map(({ link }) => describeLink(link));

    expect(withTrailingSlash).toEqual([]);
  });

  it('link to a route or an anchor as a Markdown link or with DocsLink, which add the base path and the current page', () => {
    const bypassingDocsLink = links
      .filter((link) => ['route', 'anchor'].includes(parseHref(link.href).kind))
      .filter((link) => link.element !== 'markdown' && link.element !== 'DocsLink')
      .map((link) => `${describeLink(link)} (${link.element})`);

    expect(bypassingDocsLink).toEqual([]);
  });

  it('use DocsLink instead of next/link', () => {
    const importingNextLink = getMdxFiles()
      .filter((file) => getImportSources(file).includes('next/link'))
      .map(toRelativePath);

    expect(importingNextLink).toEqual([]);
  });

  it('link to an anchor that exists on the page it points to', () => {
    const broken = links.flatMap((link) => {
      const parsed = parseHref(link.href);
      if (parsed.kind === 'route' && parsed.anchor !== undefined) {
        const target = pagesByRoute.get(parsed.path.replace(/(.)\/$/, '$1'));
        return target?.anchors.includes(decodeURIComponent(parsed.anchor)) ? [] : [describeLink(link)];
      }
      if (parsed.kind === 'anchor') {
        const hosts = getPagesRendering(link.file);
        const missing = hosts.filter((page) => !page.anchors.includes(decodeURIComponent(parsed.anchor)));
        return hosts.length === 0 || missing.length > 0
          ? [`${describeLink(link)} (on ${hosts.length ? missing.map((page) => page.route).join(', ') : 'no page'})`]
          : [];
      }
      return [];
    });

    expect(broken).toEqual([]);
  });

  it('link to files in public/ with a relative path, which the <base> of the root layout resolves', () => {
    const broken = links
      .filter((link) => {
        const parsed = parseHref(link.href);
        return parsed.kind === 'file' && !fs.existsSync(path.join(publicDir, parsed.path.split(/[?#]/)[0]));
      })
      .map(describeLink);

    expect(broken).toEqual([]);
  });
});

describe('pages', () => {
  it('have a unique anchor for every heading', () => {
    const duplicates = pages
      .filter((page) => !isDemoPage(page))
      .flatMap((page) =>
        page.anchors
          .filter((anchor, index) => page.anchors.indexOf(anchor) !== index)
          .map((anchor) => `${page.route}#${anchor}`)
      );

    expect(duplicates).toEqual([]);
  });

  it('list only headings of the page in their table of contents', () => {
    const broken = pages.flatMap((page) =>
      page.tableOfContents
        .filter(({ heading }) => !page.anchors.includes(getHeadingAnchorId(heading)))
        .map(({ file, line, heading }) => `${file}:${line} → ${heading}`)
    );

    expect(broken).toEqual([]);
  });

  it('redirect where the navigation leads, the first entry of their route in the sitemap', () => {
    const broken = pages
      .filter((page) => page.redirect !== undefined)
      .filter((page) => {
        const [category, pageKey] = page.route.slice(1).split('/');
        return page.redirect !== getLandingPath(category, pageKey);
      })
      .map((page) => `${page.file} → ${page.redirect}`);

    expect(broken).toEqual([]);
  });
});
