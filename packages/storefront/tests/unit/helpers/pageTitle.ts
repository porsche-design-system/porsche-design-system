import { type Category, sitemap } from '@/sitemap';

/**
 * The title of a page in the sitemap, most specific first: `Button: Usage - Components` for a tab, `Blur - Tokens` for
 * a page. The root layout appends ` - Porsche Design System`. Every page's `metadata.title` must match it, which
 * `tests/unit/specs/sitemap.spec.ts` checks.
 */
export const getPageTitle = (path: string): string | undefined => {
  const [categoryKey, pageKey, tabKey] = path.slice(1).split('/');
  const category = (sitemap as Record<string, Category>)[categoryKey];
  const page = pageKey ? category?.pages[pageKey] : undefined;
  const tab = tabKey ? page?.tabs?.[tabKey] : undefined;
  if (!category || (pageKey && !page) || (tabKey && !tab)) {
    return undefined;
  }
  if (tab && page) {
    return `${page.name}: ${tab.name} - ${category.name}`;
  }
  return page ? `${page.name} - ${category.name}` : category.name;
};
