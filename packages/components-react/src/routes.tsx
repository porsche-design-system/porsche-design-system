import type { RouteProps } from 'react-router-dom';
import * as fromExamples from './examples';
import * as fromPages from './pages';
import * as fromStyles from './styles';

export type RouteType = RouteProps & {
  name: string;
  path?: string; // override string | string[]
  isDisabled?: boolean;
};

export const routes: RouteType[] = [
  ...[
    {
      name: 'Table',
      path: '/table',
      element: <fromPages.TablePage />,
    },
    ...fromPages.generatedRoutes,
  ].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
  {
    name: '---',
    isDisabled: true,
  },
  {
    name: 'Core Initializer',
    path: '/core-initializer',
    element: <fromPages.CoreInitializerPage />,
  },
  {
    name: 'Core Class Names',
    path: '/core-class-names',
    element: <fromPages.CoreClassNamesPage />,
  },
  {
    name: 'Events',
    path: '/events',
    element: <fromPages.EventsPage />,
  },
  {
    name: 'Lifecycle Overlapping',
    path: '/lifecycle-overlapping',
    element: <fromPages.LifecycleOverlappingPage />,
  },
  {
    name: 'Modal Focus Cycle',
    path: '/modal-focus-cycle',
    element: <fromPages.ModalFocusCyclePage />,
  },
  {
    name: 'Stencil Lifecycle',
    path: '/stencil-lifecycles',
    element: <fromPages.StencilLifecyclesPage />,
  },
  {
    name: 'Utilities',
    path: '/utilities',
    element: <fromPages.UtilitiesPage />,
  },
  {
    name: '---',
    isDisabled: true,
  },
  {
    name: 'Accordion Example',
    path: '/accordion-example',
    element: <fromExamples.AccordionExamplePage />,
  },
  {
    name: 'Sheet Example',
    path: '/sheet-example',
    element: <fromExamples.SheetExamplePage />,
  },
  {
    name: 'AG Grid Example',
    path: '/aggrid-example',
    element: <fromExamples.AGGridExamplePage />,
  },
  {
    name: 'AG Grid Example Storefront',
    path: '/aggrid-example-storefront',
    element: <fromExamples.AGGridExampleStorefrontPage />,
  },
  {
    name: 'Banner Example',
    path: '/banner-example',
    element: <fromExamples.BannerExamplePage />,
  },
  {
    name: 'Button Example Form',
    path: '/button-example-form',
    element: <fromExamples.ButtonExampleFormPage />,
  },
  {
    name: 'Button Example Form Attribute',
    path: '/button-example-form-attribute',
    element: <fromExamples.ButtonExampleFormAttributePage />,
  },
  {
    name: 'Button Pure Example Form',
    path: '/button-pure-example-form',
    element: <fromExamples.ButtonPureExampleFormPage />,
  },
  {
    name: 'Button Pure Example Form Attribute',
    path: '/button-pure-example-form-attribute',
    element: <fromExamples.ButtonPureExampleFormAttributePage />,
  },
  {
    name: 'Button Tile Example Hyphens',
    path: '/button-tile-example-hyphens',
    element: <fromExamples.ButtonTileExampleHyphensPage />,
  },
  {
    name: 'Canvas Example',
    path: '/canvas-example',
    element: <fromExamples.CanvasExamplePage />,
  },
  {
    name: 'Carousel Example Dynamic Slides',
    path: '/carousel-example-dynamic-slides',
    element: <fromExamples.CarouselExampleDynamicSlidesPage />,
  },
  {
    name: 'Carousel Example Focus On Center Slide',
    path: '/carousel-example-focus-on-center-slide',
    element: <fromExamples.CarouselExampleFocusOnCenterSlidePage />,
  },
  {
    name: 'Carousel Example Events',
    path: '/carousel-example-events',
    element: <fromExamples.CarouselExampleEventsPage />,
  },
  {
    name: 'Carousel Example Jump to Slide',
    path: '/carousel-example-jump-to-slide',
    element: <fromExamples.CarouselExampleJumpToSlidePage />,
  },
  {
    name: 'Checkbox Example',
    path: '/checkbox-example',
    element: <fromExamples.CheckboxExamplePage />,
  },
  {
    name: 'Checkbox Example Controlled',
    path: '/checkbox-example-controlled',
    element: <fromExamples.CheckboxExampleControlledPage />,
  },
  {
    name: 'Checkbox Example Form',
    path: '/checkbox-example-form',
    element: <fromExamples.CheckboxExampleFormPage />,
  },
  {
    name: 'Flyout Example',
    path: '/flyout-example',
    element: <fromExamples.FlyoutExamplePage />,
  },
  {
    name: 'Flyout Example Form',
    path: '/flyout-example-form',
    element: <fromExamples.FlyoutExampleFormPage />,
  },
  {
    name: 'Flyout Example Conditional',
    path: '/flyout-example-conditional',
    element: <fromExamples.FlyoutExampleConditionalPage />,
  },
  {
    name: 'Drilldown Example',
    path: '/drilldown-example',
    element: <fromExamples.DrilldownExamplePage />,
  },
  {
    name: 'Drilldown Example Active Identifier',
    path: '/drilldown-example-active-identifier',
    element: <fromExamples.DrilldownExampleActiveIdentifierPage />,
  },
  {
    name: 'Drilldown Example Custom Content',
    path: '/drilldown-example-custom-content',
    element: <fromExamples.DrilldownExampleCustomContentPage />,
  },
  {
    name: 'Hidden Attribute Example',
    path: '/hidden-attribute-example',
    element: <fromExamples.HiddenAttributeExamplePage />,
  },
  {
    name: 'Inline Notification Example Action Button',
    path: '/inline-notification-example-action-button',
    element: <fromExamples.InlineNotificationExampleActionButtonPage />,
  },
  {
    name: 'Inline Notification Example Events',
    path: '/inline-notification-example-events',
    element: <fromExamples.InlineNotificationExampleEventsPage />,
  },
  {
    name: 'Input Password Example',
    path: '/input-password-example',
    element: <fromExamples.InputPasswordExamplePage />,
  },
  {
    name: 'Input Password Example Controlled',
    path: '/input-password-example-controlled',
    element: <fromExamples.InputPasswordControlledExamplePage />,
  },
  {
    name: 'Input Password Example Form',
    path: '/input-password-example-form',
    element: <fromExamples.InputPasswordExampleFormPage />,
  },
  {
    name: 'Input Number Example',
    path: '/input-number-example',
    element: <fromExamples.InputNumberExamplePage />,
  },
  {
    name: 'Input Number Example Controlled',
    path: '/input-number-example-controlled',
    element: <fromExamples.InputNumberControlledExamplePage />,
  },
  {
    name: 'Input Number Example Form',
    path: '/input-number-example-form',
    element: <fromExamples.InputNumberExampleFormPage />,
  },
  {
    name: 'Input Date Example',
    path: '/input-date-example',
    element: <fromExamples.InputDateExamplePage />,
  },
  {
    name: 'Input Date Example Controlled',
    path: '/input-date-example-controlled',
    element: <fromExamples.InputDateControlledExamplePage />,
  },
  {
    name: 'Input Date Example Form',
    path: '/input-date-example-form',
    element: <fromExamples.InputDateExampleFormPage />,
  },
  {
    name: 'Input Month Example',
    path: '/input-month-example',
    element: <fromExamples.InputMonthExamplePage />,
  },
  {
    name: 'Input Month Example Controlled',
    path: '/input-month-example-controlled',
    element: <fromExamples.InputMonthControlledExamplePage />,
  },
  {
    name: 'Input Month Example Form',
    path: '/input-month-example-form',
    element: <fromExamples.InputMonthExampleFormPage />,
  },
  {
    name: 'Input Week Example',
    path: '/input-week-example',
    element: <fromExamples.InputWeekExamplePage />,
  },
  {
    name: 'Input Week Example Controlled',
    path: '/input-week-example-controlled',
    element: <fromExamples.InputWeekControlledExamplePage />,
  },
  {
    name: 'Input Week Example Form',
    path: '/input-week-example-form',
    element: <fromExamples.InputWeekExampleFormPage />,
  },
  {
    name: 'Input Time Example',
    path: '/input-time-example',
    element: <fromExamples.InputTimeExamplePage />,
  },
  {
    name: 'Input Time Example Controlled',
    path: '/input-time-example-controlled',
    element: <fromExamples.InputTimeControlledExamplePage />,
  },
  {
    name: 'Input Time Example Form',
    path: '/input-time-example-form',
    element: <fromExamples.InputTimeExampleFormPage />,
  },
  {
    name: 'Input Text Example',
    path: '/input-text-example',
    element: <fromExamples.InputTextExamplePage />,
  },
  {
    name: 'Input Text Example Controlled',
    path: '/input-text-example-controlled',
    element: <fromExamples.InputTextControlledExamplePage />,
  },
  {
    name: 'Input Text Example Form',
    path: '/input-text-example-form',
    element: <fromExamples.InputTextExampleFormPage />,
  },
  {
    name: 'Input Email Example',
    path: '/input-email-example',
    element: <fromExamples.InputEmailExamplePage />,
  },
  {
    name: 'Input Email Example Controlled',
    path: '/input-email-example-controlled',
    element: <fromExamples.InputEmailControlledExamplePage />,
  },
  {
    name: 'Input Email Example Form',
    path: '/input-email-example-form',
    element: <fromExamples.InputEmailExampleFormPage />,
  },
  {
    name: 'Input Tel Example',
    path: '/input-tel-example',
    element: <fromExamples.InputTelExamplePage />,
  },
  {
    name: 'Input Tel Example Controlled',
    path: '/input-tel-example-controlled',
    element: <fromExamples.InputTelControlledExamplePage />,
  },
  {
    name: 'Input Tel Example Form',
    path: '/input-tel-example-form',
    element: <fromExamples.InputTelExampleFormPage />,
  },
  {
    name: 'Input Url Example',
    path: '/input-url-example',
    element: <fromExamples.InputUrlExamplePage />,
  },
  {
    name: 'Input Url Example Controlled',
    path: '/input-url-example-controlled',
    element: <fromExamples.InputUrlControlledExamplePage />,
  },
  {
    name: 'Input Url Example Form',
    path: '/input-url-example-form',
    element: <fromExamples.InputUrlExampleFormPage />,
  },
  {
    name: 'Input Search Example',
    path: '/input-search-example',
    element: <fromExamples.InputSearchExamplePage />,
  },
  {
    name: 'Input Search Example Controlled',
    path: '/input-search-example-controlled',
    element: <fromExamples.InputSearchControlledExamplePage />,
  },
  {
    name: 'Input Search Example Form',
    path: '/input-search-example-form',
    element: <fromExamples.InputSearchExampleFormPage />,
  },
  {
    name: 'Link Tile Example Hyphens',
    path: '/link-tile-example-hyphens',
    element: <fromExamples.LinkTileExampleHyphensPage />,
  },
  {
    name: 'Link Tile Product',
    path: '/link-tile-product-example',
    element: <fromExamples.LinkTileProductExamplePage />,
  },
  {
    name: 'Modal Example Accessibility',
    path: '/modal-example-accessibility',
    element: <fromExamples.ModalExampleAccessibilityPage />,
  },
  {
    name: 'Modal Example Conditional',
    path: '/modal-example-conditional',
    element: <fromExamples.ModalExampleConditionalPage />,
  },
  {
    name: 'Multi-Select Example',
    path: '/multi-select-example',
    element: <fromExamples.MultiSelectExamplePage />,
  },
  {
    name: 'Multi-Select Example Controlled',
    path: '/multi-select-example-controlled',
    element: <fromExamples.MultiSelectExampleControlledPage />,
  },
  {
    name: 'Multi-Select Example Dynamic',
    path: '/multi-select-example-dynamic',
    element: <fromExamples.MultiSelectExampleDynamicPage />,
  },
  {
    name: 'Multi-Select Example Form',
    path: '/multi-select-example-form',
    element: <fromExamples.MultiSelectExampleFormPage />,
  },
  {
    name: 'Multi Select Example Async',
    path: '/multi-select-example-async-filter',
    element: <fromExamples.MultiSelectExampleAsyncFilter />,
  },
  {
    name: 'Multi Select Selected Slot',
    path: '/multi-select-example-selected-slot',
    element: <fromExamples.MultiSelectExampleSelectedSlot />,
  },
  {
    name: 'Pin Code Example',
    path: '/pin-code-example',
    element: <fromExamples.PinCodeExamplePage />,
  },
  {
    name: 'Pin Code Example Controlled',
    path: '/pin-code-example-controlled',
    element: <fromExamples.PinCodeExampleControlledPage />,
  },
  {
    name: 'Pin Code Example Form',
    path: '/pin-code-example-form',
    element: <fromExamples.PinCodeExampleFormPage />,
  },
  {
    name: 'Scroller Example',
    path: '/scroller-example',
    element: <fromExamples.ScrollerExamplePage />,
  },
  {
    name: 'Segmented Control Example',
    path: '/segmented-control-example',
    element: <fromExamples.SegmentedControlExamplePage />,
  },
  {
    name: 'Segmented Control Example Controlled',
    path: '/segmented-control-example-controlled',
    element: <fromExamples.SegmentedControlExampleControlledPage />,
  },
  {
    name: 'Segmented Control Example Form',
    path: '/segmented-control-example-form',
    element: <fromExamples.SegmentedControlExampleFormPage />,
  },
  {
    name: 'Radio Group Example',
    path: '/radio-group-example',
    element: <fromExamples.RadioGroupExamplePage />,
  },
  {
    name: 'Radio Group Example Controlled',
    path: '/radio-group-example-controlled',
    element: <fromExamples.RadioGroupExampleControlledPage />,
  },
  {
    name: 'Radio Group Example Form',
    path: '/radio-group-example-form',
    element: <fromExamples.RadioGroupExampleFormPage />,
  },
  {
    name: 'Select Example',
    path: '/select-example',
    element: <fromExamples.SelectExamplePage />,
  },
  {
    name: 'Select Example Controlled',
    path: '/select-example-controlled',
    element: <fromExamples.SelectExampleControlledPage />,
  },
  {
    name: 'Select Example Dynamic',
    path: '/select-example-dynamic',
    element: <fromExamples.SelectExampleDynamicPage />,
  },
  {
    name: 'Select Example Form',
    path: '/select-example-form',
    element: <fromExamples.SelectExampleFormPage />,
  },
  {
    name: 'Select Example Required',
    path: '/select-example-required',
    element: <fromExamples.SelectExampleRequiredPage />,
  },
  {
    name: 'Select Example Async',
    path: '/select-example-async-filter',
    element: <fromExamples.SelectExampleAsyncFilter />,
  },
  {
    name: 'Select Example Selected Slot',
    path: '/select-example-async-selected-slot',
    element: <fromExamples.SelectExampleSelectedSlot />,
  },
  {
    name: 'Stepper Horizontal Example',
    path: '/stepper-horizontal-example',
    element: <fromExamples.StepperHorizontalExamplePage />,
  },
  {
    name: 'Table Example Basic',
    path: '/table-example-basic',
    element: <fromExamples.TableExampleBasicPage />,
  },
  {
    name: 'Table Example Sorting',
    path: '/table-example-sorting',
    element: <fromExamples.TableExampleSortingPage />,
  },
  {
    name: 'Table Example Advanced',
    path: '/table-example-advanced',
    element: <fromExamples.TableExampleAdvancedPage />,
  },
  {
    name: 'Tabs Bar Example Accessibility',
    path: '/tabs-bar-example-accessibility',
    element: <fromExamples.TabsBarExampleAccessibilityPage />,
  },
  {
    name: 'Tabs Bar Example Basic',
    path: '/tabs-bar-example-basic',
    element: <fromExamples.TabsBarExampleBasicPage />,
  },
  {
    name: 'Textarea Example',
    path: '/textarea-example',
    element: <fromExamples.TextareaExamplePage />,
  },
  {
    name: 'Textarea Example Controlled',
    path: '/textarea-example-controlled',
    element: <fromExamples.TextareaExampleControlledPage />,
  },
  {
    name: 'Textarea Example Form',
    path: '/textarea-example-form',
    element: <fromExamples.TextareaExampleFormPage />,
  },
  {
    name: 'Toast Example',
    path: '/toast-example',
    element: <fromExamples.ToastExamplePage />,
  },
  {
    name: '---',
    isDisabled: true,
  },
  {
    name: 'Styles Border',
    path: '/styles-border',
    element: <fromStyles.StylesBorderExample />,
  },
  {
    name: 'Styles Drop Shadow',
    path: '/styles-drop-shadow',
    element: <fromStyles.StylesDropShadowExample />,
  },
  {
    name: 'Styles Flyout Grid',
    path: '/styles-flyout-grid',
    element: <fromStyles.StylesFlyoutGridExample />,
  },
  {
    name: 'Styles Focus',
    path: '/styles-focus',
    element: <fromStyles.StylesFocusExample />,
  },
  {
    name: 'Styles Frosted Glass',
    path: '/styles-frosted-glass',
    element: <fromStyles.StylesFrostedGlassExample />,
  },
  {
    name: 'Styles Gradient',
    path: '/styles-gradient',
    element: <fromStyles.StylesGradientExample />,
  },
  {
    name: 'Styles Grid',
    path: '/styles-grid',
    element: <fromStyles.StylesGridExample />,
  },
  {
    name: 'Styles Hover',
    path: '/styles-hover',
    element: <fromStyles.StylesHoverExample />,
  },
  {
    name: 'Styles Media Query',
    path: '/styles-media-query',
    element: <fromStyles.StylesMediaQueryExample />,
  },
  {
    name: 'Styles Motion',
    path: '/styles-motion',
    element: <fromStyles.StylesMotionExample />,
  },
  {
    name: 'Styles Skeleton',
    path: '/styles-skeleton',
    element: <fromStyles.StylesSkeletonExample />,
  },
  {
    name: 'Styles Spacing',
    path: '/styles-spacing',
    element: <fromStyles.StylesSpacingExample />,
  },
  {
    name: 'Styles Theme',
    path: '/styles-theme',
    element: <fromStyles.StylesThemeExample />,
  },
  {
    name: 'Styles Typography',
    path: '/styles-typography',
    element: <fromStyles.StylesTypographyExample />,
  },
];
