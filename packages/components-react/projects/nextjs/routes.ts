import { generatedRoutes } from './pages';

export const sitemap = {
  home: { path: '/', name: 'Home' },
  table: { path: '/table', name: 'Table' },
  'link-example': { path: './link-example', name: 'Link Example' },
  ...generatedRoutes,
};

export const routes = Object.values(sitemap).sort((a, b) => a.name.localeCompare(b.name));
