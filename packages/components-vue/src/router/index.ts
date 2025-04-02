import { kebabCase } from 'change-case';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import * as fromExamples from '../examples';
import * as fromPages from '../pages';
import * as fromStyles from '../styles';

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
    path: '/sheet-example',
    name: 'Sheet Example',
    component: fromExamples.SheetExample,
  },
  {
    path: '/ag-grid-example',
    name: 'AG Grid Example',
    component: fromExamples.AGGridExample,
  },
  {
    path: '/ag-grid-example-storefront',
    name: 'AG Grid Example Storefront',
    component: fromExamples.AGGridExampleStorefront,
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
    path: '/button-example-form-attribute',
    name: 'Button Example Form Attribute',
    component: fromExamples.ButtonExampleFormAttribute,
  },
  {
    path: '/button-pure-example-form',
    name: 'Button Pure Example Form',
    component: fromExamples.ButtonPureExampleForm,
  },
  {
    path: '/button-pure-example-form-attribute',
    name: 'Button Pure Example Form Attribute',
    component: fromExamples.ButtonPureExampleFormAttribute,
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
    path: '/carousel-example-focus-on-center-slide',
    name: 'Carousel Example Focus On Center Slide',
    component: fromExamples.CarouselExampleFocusOnCenterSlide,
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
    path: '/checkbox-example',
    name: 'Checkbox Example',
    component: fromExamples.CheckboxExample,
  },
  {
    path: '/checkbox-example-controlled',
    name: 'Checkbox Example Controlled',
    component: fromExamples.CheckboxExampleControlled,
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
    path: '/flyout-example-form',
    name: 'Flyout Example Form',
    component: fromExamples.FlyoutExampleForm,
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
    path: '/hidden-attribute-example',
    name: 'HiddenAttributeExample',
    component: fromExamples.HiddenAttributeExample,
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
    path: '/sheet-basic',
    name: 'SheetBasic',
    component: fromPages.SheetBasicPage,
  },
  {
    path: '/sheet-prefixed',
    name: 'SheetPrefixed',
    component: fromPages.SheetPrefixedPage,
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
    path: '/segmented-control-example-controlled',
    name: 'Segmented Control Example Controlled',
    component: fromExamples.SegmentedControlExampleControlled,
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
    path: '/textarea-example',
    name: 'Textarea Example',
    component: fromExamples.TextareaExample,
  },
  {
    path: '/textarea-example-controlled',
    name: 'Textarea Example Controlled',
    component: fromExamples.TextareaExampleControlled,
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
  {
    path: '/---',
    name: '---',
    isDisabled: true,
    children: [],
  },
  {
    name: 'Styles Border',
    path: '/styles-border',
    component: fromStyles.StylesBorderExample,
  },
  {
    name: 'Styles Drop Shadow',
    path: '/styles-drop-shadow',
    component: fromStyles.StylesDropShadowExample,
  },
  {
    name: 'Styles Flyout Grid',
    path: '/styles-flyout-grid',
    component: fromStyles.StylesFlyoutGridExample,
  },
  {
    name: 'Styles Focus',
    path: '/styles-focus',
    component: fromStyles.StylesFocusExample,
  },
  {
    name: 'Styles Frosted Glass',
    path: '/styles-frosted-glass',
    component: fromStyles.StylesFrostedGlassExample,
  },
  {
    name: 'Styles Gradient',
    path: '/styles-gradient',
    component: fromStyles.StylesGradientExample,
  },
  {
    name: 'Styles Grid',
    path: '/styles-grid',
    component: fromStyles.StylesGridExample,
  },
  {
    name: 'Styles Hover',
    path: '/styles-hover',
    component: fromStyles.StylesHoverExample,
  },
  {
    name: 'Styles Media Query',
    path: '/styles-media-query',
    component: fromStyles.StylesMediaQueryExample,
  },
  {
    name: 'Styles Motion',
    path: '/styles-motion',
    component: fromStyles.StylesMotionExample,
  },
  {
    name: 'Styles Skeleton',
    path: '/styles-skeleton',
    component: fromStyles.StylesSkeletonExample,
  },
  {
    name: 'Styles Spacing',
    path: '/styles-spacing',
    component: fromStyles.StylesSpacingExample,
  },
  {
    name: 'Styles Theme',
    path: '/styles-theme',
    component: fromStyles.StylesThemeExample,
  },
  {
    name: 'Styles Typography',
    path: '/styles-typography',
    component: fromStyles.StylesTypographyExample,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
