import path from 'node:path';
import { findPages, type PageSource } from '@porsche-design-system/docs-components/markdown';
import { type Category, getPath, sitemap } from '../sitemap';

/**
 * The Storefront's tree (`src/sitemap.ts`) is the one structure every output derives from: a page or tab flagged with
 * `markdown: true` is written as Markdown next to its HTML and into the skills, under its category, as part of its
 * sitemap page (`docs/docs-components-design.md`).
 */

const APP_DIR = path.resolve(__dirname, '../app');

/** `/developing/react` → `developing/react`, a route as `@porsche-design-system/docs-components` writes it. */
const toRoute = (sitemapPath: string): string => sitemapPath.replace(/^\/+|\/+$/g, '');

/** Every route of the Storefront, to check links against, and the flagged pages in sitemap order. */
export const getStorefrontPages = (): { routes: string[]; markdownPages: PageSource[] } => {
  const routeSources = findPages(APP_DIR);
  const files = new Map(routeSources.map(({ route, file }) => [route, file]));
  const markdownPages: PageSource[] = [];

  for (const [categoryKey, category] of Object.entries(sitemap as Record<string, Category>)) {
    for (const [pageKey, page] of Object.entries(category.pages)) {
      const flagged = page.tabs
        ? Object.entries(page.tabs).flatMap(([tabKey, tab]) => (tab.markdown ? [{ tabKey, tab: tab.name }] : []))
        : page.markdown
          ? [{ tabKey: undefined, tab: undefined }]
          : [];

      for (const { tabKey, tab } of flagged) {
        const route = toRoute(getPath(categoryKey, pageKey, tabKey));
        const file = files.get(route);
        if (!file) {
          throw new Error(`[storefront] /${route} is flagged for Markdown in the sitemap but has no page`);
        }
        markdownPages.push({
          route,
          file,
          place: {
            category: { route: toRoute(getPath(categoryKey)), title: category.name, description: category.description },
            reference: { route: toRoute(getPath(categoryKey, pageKey)), title: page.name },
            tab,
          },
        });
      }
    }
  }

  return { routes: routeSources.map(({ route }) => route), markdownPages };
};
