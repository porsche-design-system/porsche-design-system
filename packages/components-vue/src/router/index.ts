import { createRouter, createWebHistory } from 'vue-router';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import * as fromPages from '../pages';
import { paramCase } from 'change-case';
import {
  InlineNotificationExampleActionButton,
  InlineNotificationExampleEvents,
  ModalExampleAccessibility,
  ScrollerExample,
  SegmentedControlExample,
  StepperHorizontalExample,
  TableExampleAdvanced,
  TableExampleBasic,
  TableExampleSorting,
  TabsBarExampleAccessibility,
  TabsBarExampleBasic,
  TextFieldWrapperIMask,
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
  {
    path: '/segmented-control-example',
    name: 'Segmented Control Example',
    component: SegmentedControlExample,
  },
  {
    path: '/stepper-horizontal-example',
    name: 'Stepper Horizontal Example',
    component: StepperHorizontalExample,
  },
  {
    path: '/table-example-advanced',
    name: 'Table Example Advanced',
    component: TableExampleAdvanced,
  },
  {
    path: '/table-example-basic',
    name: 'Table Example Basic',
    component: TableExampleBasic,
  },
  {
    path: '/table-example-sorting',
    name: 'Table Example Sorting',
    component: TableExampleSorting,
  },
  {
    path: '/tabs-bar-example-accessibility',
    name: 'Tabs Bar Example Accessibility',
    component: TabsBarExampleAccessibility,
  },
  {
    path: '/tabs-bar-example-basic',
    name: 'Tabs Bar Example Basic',
    component: TabsBarExampleBasic,
  },
  {
    path: '/text-field-wrapper-example-imask',
    name: 'Text Field Wrapper Example IMask',
    component: TextFieldWrapperIMask,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
