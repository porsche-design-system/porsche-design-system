import { generatedRoutes } from './pages';

export const sitemap = {
  home: { path: '/', name: 'Home' },
  ...generatedRoutes,
};

export const routes = Object.values(sitemap);
