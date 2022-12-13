import { createRouter, createWebHistory } from 'vue-router';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import * as fromPages from '../pages';
import { paramCase } from 'change-case';

export const routes: RouteRecordRaw[] = Object.keys(fromPages).map<RouteRecordRaw>((page) => {
  const name = page.replace(/Page$/, '');
  return {
    path: '/' + paramCase(name),
    name: name,
    component: (fromPages as Record<string, RouteComponent>)[page],
  };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
