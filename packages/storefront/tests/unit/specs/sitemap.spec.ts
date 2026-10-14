import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getPageTitle, type Route, type Routes, sitemap } from '@/sitemap';

/**
 * The sitemap is written by hand while the routes come from the pages in `src/app`, so this checks the two against each
 * other in both directions.
 */

const appDir = path.resolve(__dirname, '../../../src/app');

/** `src/app/(main)/developing/react/getting-started/page.mdx` → `/developing/react/getting-started`; route groups are no part of the URL. */
const pages = fs
  .readdirSync(appDir, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /^page\.(mdx|tsx)$/.test(entry.name))
  .map((entry) => ({
    path: `/${path
      .relative(appDir, entry.parentPath)
      .split(path.sep)
      .filter((segment) => segment && !/^\(.*\)$/.test(segment))
      .join('/')}`,
    source: fs.readFileSync(path.join(entry.parentPath, entry.name), 'utf8'),
  }));

const pagePaths = pages.map((page) => page.path);

/** The pages that render content, as opposed to the ones that only redirect. */
const contentPages = pages.filter((page) => !/\bredirect\(/.test(page.source));

const getMetadata = (source: string): { title?: string; description?: string } | undefined => {
  const metadata = source.match(/export const metadata\b[^=]*=\s*\{([\s\S]*?)\n\}/)?.[1];
  if (!metadata) {
    return undefined;
  }
  const field = (key: string) => metadata.match(new RegExp(`\\b${key}:\\s*(['"])(.*?)\\1`))?.[2];
  return { title: field('title'), description: field('description') };
};

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

  it('has categories, pages and tabs at the first, second and third level', () => {
    const misplaced = (routes: Routes, level = 0): string[] =>
      Object.values(routes).flatMap((route) => [
        ...(route.type === (['CATEGORY', 'PAGE', 'TAB'] as const)[level] ? [] : [route.path]),
        ...misplaced(route.subPaths ?? {}, level + 1),
      ]);

    expect(misplaced(sitemap)).toEqual([]);
  });

  it('has plain-text names only', () => {
    expect(routes.filter((route) => typeof route.name !== 'string')).toEqual([]);
  });
});

describe('getPageTitle', () => {
  it('names a tab after its page, then its category', () => {
    expect(getPageTitle('/components/button/usage')).toBe('Button: Usage - Components');
    expect(getPageTitle('/emotion/blur/api')).toBe('Blur: API - Emotion');
  });

  it('names a page after itself, then its category', () => {
    expect(getPageTitle('/tokens/blur')).toBe('Blur - Tokens');
  });

  it('names a category after itself', () => {
    expect(getPageTitle('/tokens')).toBe('Tokens');
  });

  it('writes acronyms in component names in capitals', () => {
    expect(getPageTitle('/components/input-url/api')).toBe('Input URL: API - Components');
    expect(getPageTitle('/components/ai-tag/api')).toBe('AI Tag: API - Components');
  });

  it('returns undefined for a route outside the sitemap', () => {
    expect(getPageTitle('/license')).toBeUndefined();
  });
});

describe('page metadata', () => {
  it('has a title and a description on every page that renders content, except the home page', () => {
    const withoutMetadata = contentPages
      .filter((page) => page.path !== '/')
      .filter((page) => {
        const metadata = getMetadata(page.source);
        return !metadata?.title || !metadata.description;
      })
      .map((page) => page.path);

    expect(withoutMetadata).toEqual([]);
  });

  it('uses the title the sitemap gives a page', () => {
    const mismatches = contentPages
      .filter((page) => getPageTitle(page.path))
      .map((page) => ({ path: page.path, title: getMetadata(page.source)?.title, expected: getPageTitle(page.path) }))
      .filter(({ title, expected }) => title !== expected);

    expect(mismatches).toEqual([]);
  });

  it('leaves the site name to the root layout', () => {
    const withSiteName = contentPages
      .filter((page) => getMetadata(page.source)?.title?.endsWith(' - Porsche Design System'))
      .map((page) => page.path);

    expect(withSiteName).toEqual([]);
  });
});
