import { type Category, type Page, sitemap, type Tab } from '@/sitemap';

/**
 * The sitemap's entries along a pathname: `/components/button/usage/` → the Components category, its Button page and its
 * Usage tab.
 */
export const getPathnameRoutes = (
  pathname: string
): {
  keys: string[];
  category?: Category;
  page?: Page;
  tab?: Tab;
} => {
  const keys = pathname
    .replace(/^\/|\/$/g, '') // Trim slashes
    .split('/'); // Split into keys

  const [categoryKey, pageKey, tabKey] = keys;

  const category = categoryKey ? (sitemap as Record<string, Category>)[categoryKey] : undefined;
  const page = pageKey ? category?.pages[pageKey] : undefined;
  const tab = tabKey ? page?.tabs?.[tabKey] : undefined;

  return {
    keys,
    category,
    page,
    tab,
  };
};
