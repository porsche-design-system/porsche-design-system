import { generatedRoutes } from './pages';

export const sitemap = {
  home: { path: '/', name: 'Home' },
  table: { path: '/table', name: 'Table' },
  ...generatedRoutes,
};

export const routes = Object.values(sitemap).sort((a, b) => a.name.localeCompare(b.name));
