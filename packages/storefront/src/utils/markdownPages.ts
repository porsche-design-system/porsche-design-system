import path from 'node:path';
import { findPages, type PageSource } from '@porsche-design-system/docs-components/markdown';

/**
 * Which Storefront pages are written as Markdown, for the Storefront's own `.md` files and for the skills. Migrated
 * pages import their components only from `@porsche-design-system/docs-components`; the pattern widens with each
 * migrated area (`docs/docs-components-design.md`).
 */
const MARKDOWN_ROUTES = /^developing\/[^/]+\/getting-started$/;

const APP_DIR = path.resolve(__dirname, '../app');

/** Every route of the Storefront, to check links against, and the pages among them that are written as Markdown. */
export const getStorefrontPages = (): { routes: string[]; markdownPages: PageSource[] } => {
  const pages = findPages(APP_DIR);
  return {
    routes: pages.map(({ route }) => route),
    markdownPages: pages.filter(({ route }) => MARKDOWN_ROUTES.test(route)),
  };
};
