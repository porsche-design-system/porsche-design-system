import { type Route, sitemap } from '@/sitemap';

export const getPathnameRoutes = (
  pathname: string
): {
  keys: string[];
  category?: Route;
  page?: Route;
  tab?: Route;
} => {
  const keys = pathname
    .replace(/^\/|\/$/g, '') // Trim slashes
    .split('/'); // Split into keys

  const [categoryKey, pageKey, tabKey] = keys;

  const category = categoryKey ? sitemap[categoryKey] : undefined;
  const page = category?.subPaths?.[pageKey];
  const tab = page?.subPaths?.[tabKey];

  return {
    keys,
    category,
    page,
    tab,
  };
};
