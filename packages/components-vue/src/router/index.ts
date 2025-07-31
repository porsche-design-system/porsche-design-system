import { kebabCase } from 'change-case';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import * as fromExamples from '../examples';
import * as fromPages from '../pages';
import * as fromTailwindStyles from '../tailwind';
import * as fromVanillaExtractStyles from '../vanilla-extract';

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
    path: '/button-tile-example-hyphens',
    name: 'Button Tile Example Hyphens',
    component: fromExamples.ButtonTileExampleHyphens,
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
    path: '/drilldown-example',
    name: 'Drilldown Example',
    component: fromExamples.DrilldownExample,
  },
  {
    path: '/drilldown-example-active-identifier',
    name: 'Drilldown Example Active Identifier',
    component: fromExamples.DrilldownExampleActiveIdentifier,
  },
  {
    path: '/drilldown-example-custom-content',
    name: 'Drilldown Example Custom Content',
    component: fromExamples.DrilldownExampleCustomContent,
  },
  {
    path: '/drilldown-basic',
    name: 'DrilldownBasic',
    component: fromPages.DrilldownBasicPage,
  },
  {
    path: '/drilldown-prefixed',
    name: 'DrilldownPrefixed',
    component: fromPages.DrilldownPrefixedPage,
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
    path: '/input-password-example',
    name: 'Input Password Example',
    component: fromExamples.InputPasswordExample,
  },
  {
    path: '/input-password-example-controlled',
    name: 'Input Password Example Controlled',
    component: fromExamples.InputPasswordExampleControlled,
  },
  {
    path: '/input-number-example',
    name: 'Input Number Example',
    component: fromExamples.InputNumberExample,
  },
  {
    path: '/input-number-example-controlled',
    name: 'Input Number Example Controlled',
    component: fromExamples.InputNumberExampleControlled,
  },
  {
    path: '/input-text-example',
    name: 'Input Text Example',
    component: fromExamples.InputTextExample,
  },
  {
    path: '/input-text-example-controlled',
    name: 'Input Text Example Controlled',
    component: fromExamples.InputTextExampleControlled,
  },
  {
    path: '/input-email-example',
    name: 'Input Email Example',
    component: fromExamples.InputEmailExample,
  },
  {
    path: '/input-email-example-controlled',
    name: 'Input Email Example Controlled',
    component: fromExamples.InputEmailExampleControlled,
  },
  {
    path: '/input-tel-example',
    name: 'Input Tel Example',
    component: fromExamples.InputTelExample,
  },
  {
    path: '/input-tel-example-controlled',
    name: 'Input Tel Example Controlled',
    component: fromExamples.InputTelExampleControlled,
  },
  {
    path: '/input-url-example',
    name: 'Input Url Example',
    component: fromExamples.InputUrlExample,
  },
  {
    path: '/input-url-example-controlled',
    name: 'Input Url Example Controlled',
    component: fromExamples.InputUrlExampleControlled,
  },
  {
    path: '/input-search-example',
    name: 'Input Search Example',
    component: fromExamples.InputSearchExample,
  },
  {
    path: '/input-search-example-controlled',
    name: 'Input Search Example Controlled',
    component: fromExamples.InputSearchExampleControlled,
  },
  {
    path: '/link-tile-example-hyphens',
    name: 'Link Tile Example Hyphens',
    component: fromExamples.LinkTileExampleHyphens,
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
    name: 'Vanilla Extract Styles Border',
    path: '/vanilla-extract-styles-border',
    component: fromVanillaExtractStyles.StylesBorderExample,
  },
  {
    name: 'Vanilla Extract Styles Drop Shadow',
    path: '/vanilla-extract-styles-drop-shadow',
    component: fromVanillaExtractStyles.StylesDropShadowExample,
  },
  {
    name: 'Vanilla Extract Styles Flyout Grid',
    path: '/vanilla-extract-styles-flyout-grid',
    component: fromVanillaExtractStyles.StylesFlyoutGridExample,
  },
  {
    name: 'Vanilla Extract Styles Focus',
    path: '/vanilla-extract-styles-focus',
    component: fromVanillaExtractStyles.StylesFocusExample,
  },
  {
    name: 'Vanilla Extract Styles Frosted Glass',
    path: '/vanilla-extract-styles-frosted-glass',
    component: fromVanillaExtractStyles.StylesFrostedGlassExample,
  },
  {
    name: 'Vanilla Extract Styles Gradient',
    path: '/vanilla-extract-styles-gradient',
    component: fromVanillaExtractStyles.StylesGradientExample,
  },
  {
    name: 'Vanilla Extract Styles Grid',
    path: '/vanilla-extract-styles-grid',
    component: fromVanillaExtractStyles.StylesGridExample,
  },
  {
    name: 'Vanilla Extract Styles Hover',
    path: '/vanilla-extract-styles-hover',
    component: fromVanillaExtractStyles.StylesHoverExample,
  },
  {
    name: 'Vanilla Extract Styles Media Query',
    path: '/vanilla-extract-styles-media-query',
    component: fromVanillaExtractStyles.StylesMediaQueryExample,
  },
  {
    name: 'Vanilla Extract Styles Motion',
    path: '/vanilla-extract-styles-motion',
    component: fromVanillaExtractStyles.StylesMotionExample,
  },
  {
    name: 'Vanilla Extract Styles Skeleton',
    path: '/vanilla-extract-styles-skeleton',
    component: fromVanillaExtractStyles.StylesSkeletonExample,
  },
  {
    name: 'Vanilla Extract Styles Spacing',
    path: '/vanilla-extract-styles-spacing',
    component: fromVanillaExtractStyles.StylesSpacingExample,
  },
  {
    name: 'Vanilla Extract Styles Theme',
    path: '/vanilla-extract-styles-theme',
    component: fromVanillaExtractStyles.StylesThemeExample,
  },
  {
    name: 'Vanilla Extract Styles Typography',
    path: '/vanilla-extract-styles-typography',
    component: fromVanillaExtractStyles.StylesTypographyExample,
  },
  {
    path: '/---',
    name: '---',
    isDisabled: true,
    children: [],
  },
  {
    name: 'Tailwind Styles Border',
    path: '/tailwind-styles-border',
    component: fromTailwindStyles.TailwindStylesBorderExample,
  },
  {
    name: 'Tailwind Styles Drop Shadow',
    path: '/tailwind-styles-drop-shadow',
    component: fromTailwindStyles.TailwindStylesDropShadowExample,
  },
  {
    name: 'Tailwind Styles Focus',
    path: '/tailwind-styles-focus',
    component: fromTailwindStyles.TailwindStylesFocusExample,
  },
  {
    name: 'Tailwind Styles Frosted Glass',
    path: '/tailwind-styles-frosted-glass',
    component: fromTailwindStyles.TailwindStylesFrostedGlassExample,
  },
  {
    name: 'Tailwind Styles Gradient',
    path: '/tailwind-styles-gradient',
    component: fromTailwindStyles.TailwindStylesGradientExample,
  },
  {
    name: 'Tailwind Styles Grid',
    path: '/tailwind-styles-grid',
    component: fromTailwindStyles.TailwindStylesGridExample,
  },
  {
    name: 'Tailwind Styles Media Query',
    path: '/tailwind-styles-media-query',
    component: fromTailwindStyles.TailwindStylesMediaQueryExample,
  },
  {
    name: 'Tailwind Styles Motion',
    path: '/tailwind-styles-motion',
    component: fromTailwindStyles.TailwindStylesMotionExample,
  },
  {
    name: 'Tailwind Styles Skeleton',
    path: '/tailwind-styles-skeleton',
    component: fromTailwindStyles.TailwindStylesSkeletonExample,
  },
  {
    name: 'Tailwind Styles Spacing',
    path: '/tailwind-styles-spacing',
    component: fromTailwindStyles.TailwindStylesSpacingExample,
  },
  {
    name: 'Tailwind Styles Theme',
    path: '/tailwind-styles-theme',
    component: fromTailwindStyles.TailwindStylesThemeExample,
  },
  {
    name: 'Tailwind Styles Typography',
    path: '/tailwind-styles-typography',
    component: fromTailwindStyles.TailwindStylesTypographyExample,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
