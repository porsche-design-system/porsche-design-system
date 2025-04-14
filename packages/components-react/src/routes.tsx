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
    name: 'Overview',
    path: '/overview',
    element: <fromPages.OverviewPage />,
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
    name: 'Theme Injection',
    path: '/theme-injection',
    element: <fromPages.ThemeInjectionPage />,
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
    element: <fromExamples.CheckboxControlledExamplePage />,
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
    element: <fromExamples.MultiSelectControlledExamplePage />,
  },
  {
    name: 'Multi-Select Example Dynamic',
    path: '/multi-select-example-dynamic',
    element: <fromExamples.MultiSelectDynamicExamplePage />,
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
    name: 'Select Example',
    path: '/select-example',
    element: <fromExamples.SelectExamplePage />,
  },
  {
    name: 'Select Example Controlled',
    path: '/select-example-controlled',
    element: <fromExamples.SelectControlledExamplePage />,
  },
  {
    name: 'Select Example Dynamic',
    path: '/select-example-dynamic',
    element: <fromExamples.SelectDynamicExamplePage />,
  },
  {
    name: 'Select Example Required',
    path: '/select-example-required',
    element: <fromExamples.SelectRequiredExamplePage />,
  },
  {
    name: 'Stepper Horizontal Example',
    path: '/stepper-horizontal-example',
    element: <fromExamples.StepperHorizontalExample />,
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
    element: <fromExamples.TextareaControlledExamplePage />,
  },
  {
    name: 'Text Field Wrapper Example IMask',
    path: '/text-field-wrapper-example-imask',
    element: <fromExamples.TextFieldWrapperExampleIMaskPage />,
  },
  {
    name: 'Text Field Wrapper Example Search',
    path: '/text-field-wrapper-example-search',
    element: <fromExamples.TextFieldWrapperExampleSearchPage />,
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
