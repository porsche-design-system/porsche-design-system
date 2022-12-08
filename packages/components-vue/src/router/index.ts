import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import * as fromPages from '../pages';

export const routes: RouteRecordRaw[] = [
  {
    path: '/events',
    name: 'Events',
    component: fromPages.EventsPage,
  },
  {
    path: '/overview',
    name: 'Overview',
    component: fromPages.OverviewPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
