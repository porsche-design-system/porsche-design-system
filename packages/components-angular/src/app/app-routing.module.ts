import { NgModule } from '@angular/core';
import { type Route, RouterModule } from '@angular/router';
import * as fromExamples from './examples';
import * as fromPages from './pages';
import * as fromStyles from './styles';

export type ExtendedRoute = Route & {
  name?: string; // optional to be filtered out for select options
  isDisabled?: boolean;
};

export const routes: ExtendedRoute[] = [
  ...fromPages.generatedRoutes.sort((a, b) => a.name!.toLowerCase().localeCompare(b.name!.toLowerCase())),
  {
    name: '---',
    path: '---',
    isDisabled: true,
    children: [],
  },
  {
    name: 'Overview',
    path: 'overview',
    component: fromPages.OverviewComponent,
  },
  {
    name: 'Core Initializer',
    path: 'core-initializer',
    component: fromPages.CoreInitializerComponent,
  },
  {
    name: 'Core Initializer Prefixed',
    path: 'core-initializer-prefixed',
    component: fromPages.CoreInitializerPrefixedComponent,
  },
  {
    name: 'Events',
    path: 'events',
    component: fromPages.EventsComponent,
  },
  {
    name: 'Form Wrapper Binding',
    path: 'form-wrapper-binding',
    component: fromPages.FormWrapperBindingComponent,
  },
  {
    name: 'Tabs Bar Navigation',
    path: 'tabs-bar-navigation',
    redirectTo: 'tabs-bar-navigation/page-1',
  },
  {
    path: 'tabs-bar-navigation',
    component: fromPages.TabsBarNavigationComponent,
    children: [
      { path: 'page-1', component: fromPages.TabsBarNavigationPage1Component },
      { path: 'page-2', component: fromPages.TabsBarNavigationPage2Component },
      { path: 'page-3', component: fromPages.TabsBarNavigationPage3Component },
    ],
  },
  {
    name: 'Tabs Bar Navigation Bug',
    path: 'tabs-bar-navigation-bug',
    redirectTo: 'tabs-bar-navigation-bug/page-1',
  },
  {
    path: 'tabs-bar-navigation-bug',
    children: [
      { path: 'page-1', component: fromPages.TabsBarNavigationBugPage1Component },
      { path: 'page-2', component: fromPages.TabsBarNavigationBugPage2Component },
      { path: 'page-3', component: fromPages.TabsBarNavigationBugPage3Component },
    ],
  },
  {
    name: 'Theme Injection',
    path: 'theme-injection',
    component: fromPages.ThemeInjectionComponent,
  },
  {
    name: 'Optional Properties',
    path: 'optional-properties',
    component: fromPages.OptionalPropertiesComponent,
  },
  {
    name: 'Utilities',
    path: 'utilities',
    component: fromPages.UtilitiesComponent,
  },
  {
    name: '---',
    path: '---',
    isDisabled: true,
    children: [],
  },
  {
    name: 'Accordion Example',
    path: 'accordion-example',
    component: fromExamples.AccordionExampleComponent,
  },
  {
    name: 'Sheet Example',
    path: 'sheet-example',
    component: fromExamples.SheetExampleComponent,
  },
  {
    name: 'AG Grid Example',
    path: 'ag-grid-example',
    component: fromExamples.AgGridExampleComponent,
  },
  {
    name: 'AG Grid Example Storefront',
    path: 'ag-grid-example-storefront',
    component: fromExamples.AgGridExampleStorefrontComponent,
  },
  {
    name: 'Banner Example',
    path: 'banner-example',
    component: fromExamples.BannerExampleComponent,
  },
  {
    name: 'Button Example Form',
    path: 'button-example-form',
    component: fromExamples.ButtonExampleFormComponent,
  },
  {
    name: 'Button Example Form Attribute',
    path: 'button-example-form-attribute',
    component: fromExamples.ButtonExampleFormAttributeComponent,
  },
  {
    name: 'Button Pure Example Form',
    path: 'button-pure-example-form',
    component: fromExamples.ButtonPureExampleFormComponent,
  },
  {
    name: 'Button Pure Example Form Attribute',
    path: 'button-pure-example-form-attribute',
    component: fromExamples.ButtonPureExampleFormAttributeComponent,
  },
  {
    name: 'Button Tile Example Hyphens',
    path: 'button-tile-example-hyphens',
    component: fromExamples.ButtonTileExampleHyphensComponent,
  },
  {
    name: 'Canvas Example',
    path: 'canvas-example',
    component: fromExamples.CanvasExampleComponent,
  },
  {
    name: 'Carousel Example Dynamic Slides',
    path: 'carousel-example-dynamic-slides',
    component: fromExamples.CarouselExampleDynamicSlidesComponent,
  },
  {
    name: 'Carousel Example Focus On Center Slide',
    path: 'carousel-example-focus-on-center-slide',
    component: fromExamples.CarouselExampleFocusOnCenterSlideComponent,
  },
  {
    name: 'Carousel Example Events',
    path: 'carousel-example-events',
    component: fromExamples.CarouselExampleEventsComponent,
  },
  {
    name: 'Carousel Example Jump to Slide',
    path: 'carousel-example-jump-to-slide',
    component: fromExamples.CarouselExampleJumpToSlideComponent,
  },
  {
    name: 'Flyout Example',
    path: 'flyout-example',
    component: fromExamples.FlyoutExampleComponent,
  },
  {
    name: 'Flyout Form Example',
    path: 'flyout-form-example',
    component: fromExamples.FlyoutExampleFormComponent,
  },
  {
    name: 'Drilldown Example',
    path: 'drilldown-example',
    component: fromExamples.DrilldownExampleComponent,
  },
  {
    name: 'Drilldown Example Active Identifier',
    path: 'drilldown-example-active-identifier',
    component: fromExamples.DrilldownExampleActiveIdentifierComponent,
  },
  {
    name: 'Drilldown Example Custom Content',
    path: 'drilldown-example-custom-content',
    component: fromExamples.DrilldownExampleCustomContentComponent,
  },
  {
    name: 'Hidden Attribute Example',
    path: 'hidden-attribute-example',
    component: fromExamples.HiddenAttributeExampleComponent,
  },
  {
    name: 'Inline Notification Example Action Button',
    path: 'inline-notification-example-action-button',
    component: fromExamples.InlineNotificationExampleActionButtonComponent,
  },
  {
    name: 'Inline Notification Example Events',
    path: 'inline-notification-example-events',
    component: fromExamples.InlineNotificationExampleEventsComponent,
  },
  {
    name: 'Input Password Example',
    path: 'input-password-example',
    component: fromExamples.InputPasswordExampleComponent,
  },
  {
    name: 'Input Password Example Controlled',
    path: 'input-password-controlled-example',
    component: fromExamples.InputPasswordExampleControlledComponent,
  },
  {
    name: 'Input Number Example',
    path: 'input-number-example',
    component: fromExamples.InputNumberExampleComponent,
  },
  {
    name: 'Input Number Example Controlled',
    path: 'input-number-controlled-example',
    component: fromExamples.InputNumberExampleControlledComponent,
  },
  {
    name: 'Input Date Example',
    path: 'input-date-example',
    component: fromExamples.InputDateExampleComponent,
  },
  {
    name: 'Input Date Example Controlled',
    path: 'input-date-controlled-example',
    component: fromExamples.InputDateExampleControlledComponent,
  },
  {
    name: 'Input Time Example',
    path: 'input-time-example',
    component: fromExamples.InputTimeExampleComponent,
  },
  {
    name: 'Input Time Example Controlled',
    path: 'input-time-controlled-example',
    component: fromExamples.InputTimeExampleControlledComponent,
  },
  {
    name: 'Input Text Example',
    path: 'input-text-example',
    component: fromExamples.InputTextExampleComponent,
  },
  {
    name: 'Input Text Example Controlled',
    path: 'input-text-controlled-example',
    component: fromExamples.InputTextExampleControlledComponent,
  },
  {
    name: 'Input Tel Example',
    path: 'input-tel-example',
    component: fromExamples.InputTelExampleComponent,
  },
  {
    name: 'Input Tel Example Controlled',
    path: 'input-tel-controlled-example',
    component: fromExamples.InputTelExampleControlledComponent,
  },
  {
    name: 'Input Email Example',
    path: 'input-email-example',
    component: fromExamples.InputEmailExampleComponent,
  },
  {
    name: 'Input Email Example Controlled',
    path: 'input-email-controlled-example',
    component: fromExamples.InputEmailExampleControlledComponent,
  },
  {
    name: 'Link Tile Example Hyphens',
    path: 'link-tile-example-hyphens',
    component: fromExamples.LinkTileExampleHyphensComponent,
  },
  {
    name: 'Link Tile Product Example',
    path: 'link-tile-product-example',
    component: fromExamples.LinkTileProductExampleComponent,
  },
  {
    name: 'Modal Example Accessibility',
    path: 'modal-example-accessibility',
    component: fromExamples.ModalExampleComponent,
  },
  {
    name: 'Multi-Select Example',
    path: 'multi-select-example',
    component: fromExamples.MultiSelectExampleComponent,
  },
  {
    name: 'Multi-Select Example Controlled',
    path: 'multi-select-example-controlled',
    component: fromExamples.MultiSelectExampleControlledComponent,
  },
  {
    name: 'Multi-Select Example Dynamic',
    path: 'multi-select-example-dynamic',
    component: fromExamples.MultiSelectExampleDynamicComponent,
  },
  {
    name: 'Pin Code Example',
    path: 'pin-code-example',
    component: fromExamples.PinCodeExampleComponent,
  },
  {
    name: 'Pin Code Example Controlled',
    path: 'pin-code-example-controlled',
    component: fromExamples.PinCodeExampleControlledComponent,
  },
  {
    name: 'Scroller Example',
    path: 'scroller-example',
    component: fromExamples.ScrollerExampleComponent,
  },
  {
    name: 'Segmented Control Example',
    path: 'segmented-control-example',
    component: fromExamples.SegmentedControlExampleComponent,
  },
  {
    name: 'Segmented Control Example Controlled',
    path: 'segmented-control-example-controlled',
    component: fromExamples.SegmentedControlExampleControlledComponent,
  },
  {
    name: 'Select Example',
    path: 'select-example',
    component: fromExamples.SelectExampleComponent,
  },
  {
    name: 'Select Example Controlled',
    path: 'select-example-controlled',
    component: fromExamples.SelectExampleControlledComponent,
  },
  {
    name: 'Select Example Dynamic',
    path: 'select-example-dynamic',
    component: fromExamples.SelectExampleDynamicComponent,
  },
  {
    name: 'Select Example Required',
    path: 'select-example-required',
    component: fromExamples.SelectExampleRequiredComponent,
  },
  {
    name: 'Stepper Horizontal Example',
    path: 'stepper-horizontal-example',
    component: fromExamples.StepperHorizontalExampleComponent,
  },
  {
    name: 'Stepper Horizontal Navigation Example Start',
    path: 'stepper-horizontal-navigation-example-start-component',
    component: fromExamples.StepperHorizontalNavigationExampleStartComponent,
  },
  {
    name: 'Stepper Horizontal Navigation Example Second',
    path: 'stepper-horizontal-navigation-example-second-component',
    component: fromExamples.StepperHorizontalNavigationExampleSecondComponent,
  },
  {
    name: 'Table Example Basic',
    path: 'table-example-basic',
    component: fromExamples.TableExampleBasicComponent,
  },
  {
    name: 'Table Example Sorting',
    path: 'table-example-sorting',
    component: fromExamples.TableExampleSortingComponent,
  },
  {
    name: 'Table Example Advanced',
    path: 'table-example-advanced',
    component: fromExamples.TableExampleAdvancedComponent,
  },
  {
    name: 'Tabs Bar Example Accessibility',
    path: 'tabs-bar-example-accessibility',
    component: fromExamples.TabsBarExampleAccessibilityComponent,
  },
  {
    name: 'Tabs Bar Example Basic',
    path: 'tabs-bar-example-basic',
    component: fromExamples.TabsBarExampleBasicComponent,
  },
  {
    name: 'Textarea Example',
    path: 'textarea-example',
    component: fromExamples.TextareaExampleComponent,
  },
  {
    name: 'Textarea Example Controlled',
    path: 'textarea-controlled-example',
    component: fromExamples.TextareaExampleControlledComponent,
  },
  {
    name: 'Checkbox Example',
    path: 'checkbox-example',
    component: fromExamples.CheckboxExampleComponent,
  },
  {
    name: 'Checkbox Example Controlled',
    path: 'checkbox-controlled-example',
    component: fromExamples.CheckboxExampleControlledComponent,
  },
  {
    name: 'Text Field Wrapper Example Search',
    path: 'text-field-wrapper-example-search',
    component: fromExamples.TextFieldWrapperExampleSearchComponent,
  },
  {
    name: 'Toast Example',
    path: 'toast-example',
    component: fromExamples.ToastExampleComponent,
  },
  {
    name: '---',
    path: '---',
    isDisabled: true,
    children: [],
  },
  {
    name: 'Styles Border Example',
    path: 'styles-border',
    component: fromStyles.StylesBorderExampleComponent,
  },
  {
    name: 'Styles Drop Shadow Example',
    path: 'styles-drop-shadow',
    component: fromStyles.StylesDropShadowExampleComponent,
  },
  {
    name: 'Styles Flyout Grid Example',
    path: 'styles-flyout-grid',
    component: fromStyles.StylesFlyoutGridExampleComponent,
  },
  {
    name: 'Styles Focus Example',
    path: 'styles-focus',
    component: fromStyles.StylesFocusExampleComponent,
  },
  {
    name: 'Styles Frosted Glass Example',
    path: 'styles-frosted-glass',
    component: fromStyles.StylesFrostedGlassExampleComponent,
  },
  {
    name: 'Styles Gradient Example',
    path: 'styles-gradient',
    component: fromStyles.StylesGradientExampleComponent,
  },
  {
    name: 'Styles Grid Example',
    path: 'styles-grid',
    component: fromStyles.StylesGridExampleComponent,
  },
  {
    name: 'Styles Hover Example',
    path: 'styles-hover',
    component: fromStyles.StylesHoverExampleComponent,
  },
  {
    name: 'Styles Media Query Example',
    path: 'styles-media-query',
    component: fromStyles.StylesMediaQueryExampleComponent,
  },
  {
    name: 'Styles Motion Example',
    path: 'styles-motion',
    component: fromStyles.StylesMotionExampleComponent,
  },
  {
    name: 'Styles Skeleton Example',
    path: 'styles-skeleton',
    component: fromStyles.StylesSkeletonExampleComponent,
  },
  {
    name: 'Styles Spacing Example',
    path: 'styles-spacing',
    component: fromStyles.StylesSpacingExampleComponent,
  },
  {
    name: 'Styles Theme Example',
    path: 'styles-theme',
    component: fromStyles.StylesThemeExampleComponent,
  },
  {
    name: 'Styles Typography Example',
    path: 'styles-typography',
    component: fromStyles.StylesTypographyExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
