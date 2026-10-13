import path from 'node:path';
import { findPages, type PageSource } from '@porsche-design-system/docs-components/markdown';
import { type Route, type Routes, sitemap } from '../sitemap';

/**
 * The Storefront's tree (`src/sitemap.tsx`) is the one structure every output derives from: a node flagged with
 * `markdown: true` is written as Markdown next to its HTML and into the skills, under its category, as part of its
 * sitemap page (`docs/docs-components-design.md`).
 */

const APP_DIR = path.resolve(__dirname, '../app');

const titleOf = (node: Route): string => {
  const title = node.title ?? (typeof node.name === 'string' ? node.name : undefined);
  if (!title) {
    throw new Error(`[storefront] sitemap node ${node.path} needs a \`title\`, its \`name\` is not plain text`);
  }
  return title;
};

const toRoute = (sitemapPath: string): string => sitemapPath.replace(/^\/+|\/+$/g, '');

/** Every route of the Storefront, to check links against, and the flagged pages in sitemap order. */
export const getStorefrontPages = (): { routes: string[]; markdownPages: PageSource[] } => {
  const routeSources = findPages(APP_DIR);
  const files = new Map(routeSources.map(({ route, file }) => [route, file]));
  const markdownPages: PageSource[] = [];

  const visit = (routes: Routes | undefined, category: Route, parent?: Route): void => {
    for (const node of Object.values(routes ?? {})) {
      if (node.markdown) {
        const route = toRoute(node.path);
        const file = files.get(route);
        if (!file) {
          throw new Error(`[storefront] sitemap node ${node.path} is flagged for Markdown but has no page`);
        }
        const page = node.type === 'TAB' && parent ? parent : node;
        markdownPages.push({
          route,
          file,
          place: {
            category: { route: toRoute(category.path), title: titleOf(category), description: category.description },
            reference: { route: toRoute(page.path), title: titleOf(page) },
            tab: page === node ? undefined : titleOf(node),
          },
        });
      }
      visit(node.subPaths, category, node);
    }
  };
  for (const category of Object.values(sitemap)) {
    visit(category.subPaths, category, category);
  }

  return { routes: routeSources.map(({ route }) => route), markdownPages };
};
