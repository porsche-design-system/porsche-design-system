import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { type Route, type Routes, sitemap } from '@/sitemap';

/**
 * The sitemap is written by hand while the routes come from the pages in `src/app`, so this checks the two against each
 * other in both directions.
 */

const appDir = path.resolve(__dirname, '../../../src/app');

/** `src/app/(main)/developing/react/getting-started/page.mdx` → `/developing/react/getting-started`; route groups are no part of the URL. */
const pagePaths = fs
  .readdirSync(appDir, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /^page\.(mdx|tsx)$/.test(entry.name))
  .map(
    (entry) =>
      `/${path
        .relative(appDir, entry.parentPath)
        .split(path.sep)
        .filter((segment) => segment && !/^\(.*\)$/.test(segment))
        .join('/')}`
  );

const flatten = (routes: Routes | undefined): Route[] =>
  Object.values(routes ?? {}).flatMap((route) => [route, ...flatten(route.subPaths)]);

const routes = flatten(sitemap);

/** Pages that are deliberately not part of the navigation. */
const PAGES_WITHOUT_SITEMAP_ENTRY = [
  '/',
  '/accessibility-statement',
  '/license',
  '/-/hljs',
  '/-/mdx',
  // Redirects every component page (`/components/button`) to its first tab.
  '/components/[component]',
];

describe('sitemap', () => {
  it('has a page for every route, except pages with tabs, which link to their first tab', () => {
    const withoutPage = routes
      .filter((route) => !(route.type === 'PAGE' && route.subPaths))
      .map((route) => route.path)
      .filter((routePath) => !pagePaths.includes(routePath));

    expect(withoutPage).toEqual([]);
  });

  it('has a route for every page, except the ones deliberately left out of the navigation', () => {
    const routePaths = routes.map((route) => route.path);
    const withoutRoute = pagePaths.filter(
      (pagePath) => !routePaths.includes(pagePath) && !PAGES_WITHOUT_SITEMAP_ENTRY.includes(pagePath)
    );

    expect(withoutRoute).toEqual([]);
  });

  it('has plain-text names only', () => {
    expect(routes.filter((route) => typeof route.name !== 'string')).toEqual([]);
  });
});
