import { createRouter, createWebHistory } from 'vue-router';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import * as fromPages from '../pages';
import { paramCase } from 'change-case';
import * as fromExamples from '../examples';

export type RouteType = RouteRecordRaw & {
  isDisabled?: boolean;
};

const generatedRoutes: RouteType[] = Object.keys(fromPages).map<RouteType>((page) => {
  const name = page.replace(/Page$/, '');
  return {
    path: '/' + paramCase(name),
    name: name,
    component: (fromPages as Record<string, RouteComponent>)[page],
  };
});

export const routes: RouteType[] = [
  ...generatedRoutes,
  {
    path: '/---',
    name: '---',
    isDisabled: true,
    children: [],
  },
  {
    path: '/accordion-example',
    name: 'Accordion Example',
    component: fromExamples.AccordionExample,
  },
  {
    path: '/carousel-example-dynamic-slides',
    name: 'Carousel Example Dynamic Slides',
    component: fromExamples.CarouselExampleDynamicSlides,
  },
  {
    path: '/carousel-example-events',
    name: 'Carousel Example Events',
    component: fromExamples.CarouselExampleEvents,
  },
  {
    path: '/carousel-example-jump-to-slide',
    name: 'Carousel Example Jump to Slide',
    component: fromExamples.CarouselExampleJumpToSlide,
  },
  {
    path: '/flyout-example',
    name: 'Flyout Example',
    component: fromExamples.FlyoutExample,
  },
  {
    path: '/flyout-example-slotted',
    name: 'Flyout Example Slotted',
    component: fromExamples.FlyoutExampleSlotted,
  },
  {
    path: '/flyout-example-slotted-secondary',
    name: 'Flyout Example Slotted Secondary',
    component: fromExamples.FlyoutExampleSlottedSecondary,
  },
  {
    path: '/inline-notification-example-action-button',
    name: 'Inline Notification Example Action Button',
    component: fromExamples.InlineNotificationExampleActionButton,
  },
  {
    path: '/inline-notification-example-events',
    name: 'Inline Notification Example Events',
    component: fromExamples.InlineNotificationExampleEvents,
  },
  {
    path: '/modal-example-accessibility',
    name: 'Modal Example Accessibility',
    component: fromExamples.ModalExampleAccessibility,
  },
  {
    path: '/multi-select-example',
    name: 'Multi-Select Example',
    component: fromExamples.MultiSelectExample,
  },
  {
    path: '/multi-select-example-controlled',
    name: 'Multi-Select Example Controlled',
    component: fromExamples.MultiSelectExampleControlled,
  },
  {
    path: '/multi-select-example-dynamic',
    name: 'Multi-Select Example Dynamic',
    component: fromExamples.MultiSelectExampleDynamic,
  },
  {
    path: '/scroller-example',
    name: 'Scroller Example',
    component: fromExamples.ScrollerExample,
  },
  {
    path: '/segmented-control-example',
    name: 'Segmented Control Example',
    component: fromExamples.SegmentedControlExample,
  },
  {
    path: '/stepper-horizontal-example',
    name: 'Stepper Horizontal Example',
    component: fromExamples.StepperHorizontalExample,
  },
  {
    path: '/table-example-advanced',
    name: 'Table Example Advanced',
    component: fromExamples.TableExampleAdvanced,
  },
  {
    path: '/table-example-basic',
    name: 'Table Example Basic',
    component: fromExamples.TableExampleBasic,
  },
  {
    path: '/table-example-sorting',
    name: 'Table Example Sorting',
    component: fromExamples.TableExampleSorting,
  },
  {
    path: '/tabs-bar-example-accessibility',
    name: 'Tabs Bar Example Accessibility',
    component: fromExamples.TabsBarExampleAccessibility,
  },
  {
    path: '/tabs-bar-example-basic',
    name: 'Tabs Bar Example Basic',
    component: fromExamples.TabsBarExampleBasic,
  },
  {
    path: '/text-field-wrapper-example-imask',
    name: 'Text Field Wrapper Example IMask',
    component: fromExamples.TextFieldWrapperExampleIMask,
  },
  {
    path: '/text-field-wrapper-example-search',
    name: 'Text Field Wrapper Example Search',
    component: fromExamples.TextFieldWrapperExampleSearch,
  },
  {
    path: '/toast-example',
    name: 'Toast Example',
    component: fromExamples.ToastExample,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
