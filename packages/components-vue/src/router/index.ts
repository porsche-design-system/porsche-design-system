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
  } as RouteType;
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
    path: '/checkbox-example-controlled-model',
    name: 'Checkbox Example Controlled Model',
    component: fromExamples.CheckboxExampleControlledModel,
  },
  {
    path: '/checkbox-example-form',
    name: 'Checkbox Example Form',
    component: fromExamples.CheckboxExampleForm,
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
    path: '/input-password-example-controlled-model',
    name: 'Input Password Example Controlled Model',
    component: fromExamples.InputPasswordExampleControlledModel,
  },
  {
    path: '/input-password-example-form',
    name: 'Input Password Example Form',
    component: fromExamples.InputPasswordExampleForm,
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
    path: '/input-number-example-controlled-model',
    name: 'Input Number Example Controlled Model',
    component: fromExamples.InputNumberExampleControlledModel,
  },
  {
    path: '/input-number-example-form',
    name: 'Input Number Example Form',
    component: fromExamples.InputNumberExampleForm,
  },
  {
    path: '/input-date-example',
    name: 'Input Date Example',
    component: fromExamples.InputDateExample,
  },
  {
    path: '/input-date-example-controlled',
    name: 'Input Date Example Controlled',
    component: fromExamples.InputDateExampleControlled,
  },
  {
    path: '/input-date-example-controlled-model',
    name: 'Input Date Example Controlled Model',
    component: fromExamples.InputDateExampleControlledModel,
  },
  {
    path: '/input-date-example-form',
    name: 'Input Date Example Form',
    component: fromExamples.InputDateExampleForm,
  },
  {
    path: '/input-month-example',
    name: 'Input Month Example',
    component: fromExamples.InputMonthExample,
  },
  {
    path: '/input-month-example-controlled',
    name: 'Input Month Example Controlled',
    component: fromExamples.InputMonthExampleControlled,
  },
  {
    path: '/input-month-example-controlled-model',
    name: 'Input Month Example Controlled Model',
    component: fromExamples.InputMonthExampleControlledModel,
  },
  {
    path: '/input-month-example-form',
    name: 'Input Month Example Form',
    component: fromExamples.InputMonthExampleForm,
  },

  {
    path: '/input-week-example',
    name: 'Input Week Example',
    component: fromExamples.InputWeekExample,
  },
  {
    path: '/input-week-example-controlled',
    name: 'Input Week Example Controlled',
    component: fromExamples.InputWeekExampleControlled,
  },
  {
    path: '/input-week-example-controlled-model',
    name: 'Input Week Example Controlled Model',
    component: fromExamples.InputWeekExampleControlledModel,
  },
  {
    path: '/input-week-example-form',
    name: 'Input Week Example Form',
    component: fromExamples.InputWeekExampleForm,
  },
  {
    path: '/input-time-example',
    name: 'Input Time Example',
    component: fromExamples.InputTimeExample,
  },
  {
    path: '/input-time-example-controlled',
    name: 'Input Time Example Controlled',
    component: fromExamples.InputTimeExampleControlled,
  },
  {
    path: '/input-time-example-controlled-model',
    name: 'Input Time Example Controlled Model',
    component: fromExamples.InputTimeExampleControlledModel,
  },
  {
    path: '/input-time-example-form',
    name: 'Input Time Example Form',
    component: fromExamples.InputTimeExampleForm,
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
    path: '/input-text-example-controlled-model',
    name: 'Input Text Example Controlled Model',
    component: fromExamples.InputTextExampleControlledModel,
  },
  {
    path: '/input-text-example-form',
    name: 'Input Text Example Form',
    component: fromExamples.InputTextExampleForm,
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
    path: '/input-email-example-controlled-model',
    name: 'Input Email Example Controlled Model',
    component: fromExamples.InputEmailExampleControlledModel,
  },
  {
    path: '/input-email-example-form',
    name: 'Input Email Example Form',
    component: fromExamples.InputEmailExampleForm,
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
    path: '/input-tel-example-controlled-model',
    name: 'Input Tel Example Controlled Model',
    component: fromExamples.InputTelExampleControlledModel,
  },
  {
    path: '/input-tel-example-form',
    name: 'Input Tel Example Form',
    component: fromExamples.InputTelExampleForm,
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
    path: '/input-url-example-controlled-model',
    name: 'Input Url Example Controlled Model',
    component: fromExamples.InputUrlExampleControlledModel,
  },
  {
    path: '/input-url-example-form',
    name: 'Input Url Example Form',
    component: fromExamples.InputUrlExampleForm,
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
    path: '/input-search-example-controlled-model',
    name: 'Input Search Example Controlled Model',
    component: fromExamples.InputSearchExampleControlledModel,
  },
  {
    path: '/input-search-example-form',
    name: 'Input Search Example Form',
    component: fromExamples.InputSearchExampleForm,
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
    path: '/multi-select-example-controlled-model',
    name: 'Multi-Select Example Controlled Model',
    component: fromExamples.MultiSelectExampleControlledModel,
  },
  {
    path: '/multi-select-example-dynamic',
    name: 'Multi-Select Example Dynamic',
    component: fromExamples.MultiSelectExampleDynamic,
  },
  {
    path: '/multi-select-example-form',
    name: 'Multi-Select Example Form',
    component: fromExamples.MultiSelectExampleForm,
  },
  {
    path: '/multi-select-example-async-filter',
    name: 'Multi Select Example Async',
    component: fromExamples.MultiSelectExampleAsyncFilter,
  },
  {
    path: '/multi-select-example-selected-slot',
    name: 'Multi Select Example Selected Slot',
    component: fromExamples.MultiSelectExampleSelectedSlot,
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
    path: '/pin-code-example-controlled-model',
    name: 'Pin Code Example Controlled Model',
    component: fromExamples.PinCodeExampleControlledModel,
  },
  {
    path: '/pin-code-example-form',
    name: 'Pin Code Example Form',
    component: fromExamples.PinCodeExampleForm,
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
    path: '/segmented-control-example-controlled-model',
    name: 'Segmented Control Example Controlled Model',
    component: fromExamples.SegmentedControlExampleControlledModel,
  },
  {
    path: '/segmented-control-example-form',
    name: 'Segmented Control Example Form',
    component: fromExamples.SegmentedControlExampleForm,
  },
  {
    path: '/radio-group-example',
    name: 'Radio Group Example',
    component: fromExamples.RadioGroupExample,
  },
  {
    path: '/radio-group-example-controlled',
    name: 'Radio Group Example Controlled',
    component: fromExamples.RadioGroupExampleControlled,
  },
  {
    path: '/radio-group-example-controlled-model',
    name: 'Radio Group Example Controlled Model',
    component: fromExamples.RadioGroupExampleControlledModel,
  },
  {
    path: '/radio-group-example-form',
    name: 'Radio Group Example Form',
    component: fromExamples.RadioGroupExampleForm,
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
    path: '/select-example-controlled-model',
    name: 'Select Example Controlled Model',
    component: fromExamples.SelectExampleControlledModel,
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
    path: '/select-example-form',
    name: 'Select Example Form',
    component: fromExamples.SelectExampleForm,
  },
  {
    path: '/select-example-async-filter',
    name: 'Select Example Async',
    component: fromExamples.SelectExampleAsyncFilter,
  },
  {
    path: '/select-example-selected-slot',
    name: 'Select Example Selected Slot',
    component: fromExamples.SelectExampleSelectedSlot,
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
    path: '/textarea-example-controlled-model',
    name: 'Textarea Example Controlled Model',
    component: fromExamples.TextareaExampleControlledModel,
  },
  {
    path: '/textarea-example-form',
    name: 'Textarea Example Form',
    component: fromExamples.TextareaExampleForm,
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
