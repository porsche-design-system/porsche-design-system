import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/events',
    name: 'Events',
    component: () => import('../pages/EventsPage.vue'),
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('../pages/OverviewPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
