import { createRouter, createWebHistory } from 'vue-router';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import * as fromPages from '../pages';
import { paramCase } from 'change-case';
import {
  InlineNotificationExampleActionButton,
  InlineNotificationExampleEvents,
  ModalExampleAccessibility,
  ScrollerExample,
} from '../examples';

const generatedRoutes: RouteRecordRaw[] = Object.keys(fromPages).map<RouteRecordRaw>((page) => {
  const name = page.replace(/Page$/, '');
  return {
    path: '/' + paramCase(name),
    name: name,
    component: (fromPages as Record<string, RouteComponent>)[page],
  };
});

export const routes: RouteRecordRaw[] = [
  ...generatedRoutes,
  {
    path: '/inline-notification-example-action-button',
    name: 'Inline Notification Example Action Button',
    component: InlineNotificationExampleActionButton,
  },
  {
    path: '/inline-notification-example-events',
    name: 'Inline Notification Example Events',
    component: InlineNotificationExampleEvents,
  },
  {
    path: '/modal-example-accessibility',
    name: 'Modal Example Accessibility',
    component: ModalExampleAccessibility,
  },
  {
    path: '/scroller-example',
    name: 'Scroller Example',
    component: ScrollerExample,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
