import { createRouter, createWebHistory } from 'vue-router';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import * as fromPages from '../pages';
import { kebabCase } from 'change-case';
import * as fromExamples from '../examples';

export type RouteType = RouteRecordRaw & {
  isDisabled?: boolean;
};

const generatedRoutes: RouteType[] = Object.keys(fromPages).map<RouteType>((page) => {
  const name = page.replace(/Page$/, '');
  return {
    path: '/' + kebabCase(name),
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
    path: '/banner-basic',
    name: 'BannerBasic',
    component: fromPages.BannerBasicPage,
  },
  {
    path: '/banner-prefixed',
    name: 'BannerPrefixed',
    component: fromPages.BannerPrefixedPage,
  },
  {
    path: '/button-example-form',
    name: 'Button Example Form',
    component: fromExamples.ButtonExampleForm,
  },
  {
    path: '/canvas-example',
    name: 'Canvas Example',
    component: fromExamples.CanvasExample,
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
    path: '/flyout-basic',
    name: 'FlyoutBasic',
    component: fromPages.FlyoutBasicPage,
  },
  {
    path: '/flyout-prefixed',
    name: 'FlyoutPrefixed',
    component: fromPages.FlyoutPrefixedPage,
  },
  {
    path: '/flyout-example',
    name: 'Flyout Example',
    component: fromExamples.FlyoutExample,
  },
  {
    path: '/flyout-multilevel-example',
    name: 'Flyout Multilevel Example',
    component: fromExamples.FlyoutMultilevelExample,
  },
  {
    path: '/flyout-multilevel-example-active-identifier',
    name: 'Flyout Multilevel Example Active Identifier',
    component: fromExamples.FlyoutMultilevelExampleActiveIdentifier,
  },
  {
    path: '/flyout-multilevel-example-custom-content',
    name: 'Flyout Multilevel Example Custom Content',
    component: fromExamples.FlyoutMultilevelExampleCustomContent,
  },
  {
    path: '/flyout-multilevel-basic',
    name: 'FlyoutMultilevelBasic',
    component: fromPages.FlyoutMultilevelBasicPage,
  },
  {
    path: '/flyout-multilevel-prefixed',
    name: 'FlyoutMultilevelPrefixed',
    component: fromPages.FlyoutMultilevelPrefixedPage,
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
    path: '/link-tile-product-example',
    name: 'Link Tile Product Example',
    component: fromExamples.LinkTileProductExample,
  },
  {
    path: '/modal-basic',
    name: 'ModalBasic',
    component: fromPages.ModalBasicPage,
  },
  {
    path: '/modal-prefixed',
    name: 'ModalPrefixed',
    component: fromPages.ModalPrefixedPage,
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
    path: '/pin-code-example',
    name: 'Pin Code Example',
    component: fromExamples.PinCodeExample,
  },
  {
    path: '/pin-code-example-controlled',
    name: 'Pin Code Example Controlled',
    component: fromExamples.PinCodeExampleControlled,
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
    path: '/select-example',
    name: 'Select Example',
    component: fromExamples.SelectExample,
  },
  {
    path: '/select-example-controlled',
    name: 'Select Example Controlled',
    component: fromExamples.SelectExampleControlled,
  },
  {
    path: '/select-example-dynamic',
    name: 'Select Example Dynamic',
    component: fromExamples.SelectExampleDynamic,
  },
  {
    path: '/select-example-required',
    name: 'Select Example Required',
    component: fromExamples.SelectExampleRequired,
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
