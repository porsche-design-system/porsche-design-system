import { NgModule } from '@angular/core';
import { type Route, RouterModule } from '@angular/router';
import * as fromExamples from './examples';
import * as fromPages from './pages';

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
    name: 'Checkbox Example',
    path: 'checkbox-example',
    component: fromExamples.CheckboxExampleComponent,
  },
  {
    name: 'Checkbox Example Controlled',
    path: 'checkbox-example-controlled',
    component: fromExamples.CheckboxExampleControlledComponent,
  },
  {
    name: 'Checkbox Example Reactive Form',
    path: 'checkbox-example-reactive-form',
    component: fromExamples.CheckboxExampleReactiveFormComponent,
  },
  {
    name: 'Checkbox Example Form',
    path: 'checkbox-example-form',
    component: fromExamples.CheckboxExampleFormComponent,
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
    path: 'input-password-example-controlled',
    component: fromExamples.InputPasswordExampleControlledComponent,
  },
  {
    name: 'Input Password Example Form',
    path: 'input-password-example-form',
    component: fromExamples.InputPasswordExampleFormComponent,
  },
  {
    name: 'Input Password Example Reactive Form',
    path: 'input-password-example-reactive-form',
    component: fromExamples.InputPasswordExampleReactiveFormComponent,
  },
  {
    name: 'Input Number Example',
    path: 'input-number-example',
    component: fromExamples.InputNumberExampleComponent,
  },
  {
    name: 'Input Number Example Controlled',
    path: 'input-number-example-controlled',
    component: fromExamples.InputNumberExampleControlledComponent,
  },
  {
    name: 'Input Number Example Form',
    path: 'input-number-example-form',
    component: fromExamples.InputNumberExampleFormComponent,
  },
  {
    name: 'Input Number Example Reactive Form',
    path: 'input-number-example-reactive-form',
    component: fromExamples.InputNumberExampleReactiveFormComponent,
  },
  {
    name: 'Input Date Example',
    path: 'input-date-example',
    component: fromExamples.InputDateExampleComponent,
  },
  {
    name: 'Input Date Example Controlled',
    path: 'input-date-example-controlled',
    component: fromExamples.InputDateExampleControlledComponent,
  },
  {
    name: 'Input Date Example Form',
    path: 'input-date-example-form',
    component: fromExamples.InputDateExampleFormComponent,
  },
  {
    name: 'Input Date Example Reactive Form',
    path: 'input-date-example-reactive-form',
    component: fromExamples.InputDateExampleReactiveFormComponent,
  },
  {
    name: 'Input Month Example',
    path: 'input-month-example',
    component: fromExamples.InputMonthExampleComponent,
  },
  {
    name: 'Input Month Example Controlled',
    path: 'input-month-example-controlled',
    component: fromExamples.InputMonthExampleControlledComponent,
  },
  {
    name: 'Input Month Example Form',
    path: 'input-month-example-form',
    component: fromExamples.InputMonthExampleFormComponent,
  },
  {
    name: 'Input Month Example Reactive Form',
    path: 'input-month-example-reactive-form',
    component: fromExamples.InputMonthExampleReactiveFormComponent,
  },
  {
    name: 'Input Week Example',
    path: 'input-week-example',
    component: fromExamples.InputWeekExampleComponent,
  },
  {
    name: 'Input Week Example Controlled',
    path: 'input-week-example-controlled',
    component: fromExamples.InputWeekExampleControlledComponent,
  },
  {
    name: 'Input Week Example Form',
    path: 'input-week-example-form',
    component: fromExamples.InputWeekExampleFormComponent,
  },
  {
    name: 'Input Week Example Reactive Form',
    path: 'input-week-example-reactive-form',
    component: fromExamples.InputWeekExampleReactiveFormComponent,
  },
  {
    name: 'Input Search Example',
    path: 'input-search-example',
    component: fromExamples.InputSearchExampleComponent,
  },
  {
    name: 'Input Search Example Controlled',
    path: 'input-search-example-controlled',
    component: fromExamples.InputSearchExampleControlledComponent,
  },
  {
    name: 'Input Search Example Form',
    path: 'input-search-example-form',
    component: fromExamples.InputSearchExampleFormComponent,
  },
  {
    name: 'Input Search Example Reactive Form',
    path: 'input-search-example-reactive-form',
    component: fromExamples.InputSearchExampleReactiveFormComponent,
  },
  {
    name: 'Input Time Example',
    path: 'input-time-example',
    component: fromExamples.InputTimeExampleComponent,
  },
  {
    name: 'Input Time Example Controlled',
    path: 'input-time-example-controlled',
    component: fromExamples.InputTimeExampleControlledComponent,
  },
  {
    name: 'Input Time Example Form',
    path: 'input-time-example-form',
    component: fromExamples.InputTimeExampleFormComponent,
  },
  {
    name: 'Input Time Example Reactive Form',
    path: 'input-time-example-reactive-form',
    component: fromExamples.InputTimeExampleReactiveFormComponent,
  },
  {
    name: 'Input Text Example',
    path: 'input-text-example',
    component: fromExamples.InputTextExampleComponent,
  },
  {
    name: 'Input Text Example Controlled',
    path: 'input-text-example-controlled',
    component: fromExamples.InputTextExampleControlledComponent,
  },
  {
    name: 'Input Text Example Form',
    path: 'input-text-example-form',
    component: fromExamples.InputTextExampleFormComponent,
  },
  {
    name: 'Input Text Example Reactive Form',
    path: 'input-text-example-reactive-form',
    component: fromExamples.InputTextExampleReactiveFormComponent,
  },
  {
    name: 'Input Tel Example',
    path: 'input-tel-example',
    component: fromExamples.InputTelExampleComponent,
  },
  {
    name: 'Input Tel Example Controlled',
    path: 'input-tel-example-controlled',
    component: fromExamples.InputTelExampleControlledComponent,
  },
  {
    name: 'Input Tel Example Form',
    path: 'input-tel-example-form',
    component: fromExamples.InputTelExampleFormComponent,
  },
  {
    name: 'Input Tel Example Reactive Form',
    path: 'input-tel-example-reactive-form',
    component: fromExamples.InputTelExampleReactiveFormComponent,
  },
  {
    name: 'Input Url Example',
    path: 'input-url-example',
    component: fromExamples.InputUrlExampleComponent,
  },
  {
    name: 'Input Url Example Controlled',
    path: 'input-url-example-controlled',
    component: fromExamples.InputUrlExampleControlledComponent,
  },
  {
    name: 'Input Url Example Form',
    path: 'input-url-example-form',
    component: fromExamples.InputUrlExampleFormComponent,
  },
  {
    name: 'Input Url Example Reactive Form',
    path: 'input-url-example-reactive-form',
    component: fromExamples.InputUrlExampleReactiveFormComponent,
  },
  {
    name: 'Input Email Example',
    path: 'input-email-example',
    component: fromExamples.InputEmailExampleComponent,
  },
  {
    name: 'Input Email Example Controlled',
    path: 'input-email-example-controlled',
    component: fromExamples.InputEmailExampleControlledComponent,
  },
  {
    name: 'Input Email Example Form',
    path: 'input-email-example-form',
    component: fromExamples.InputEmailExampleFormComponent,
  },
  {
    name: 'Input Email Example Reactive Form',
    path: 'input-email-example-reactive-form',
    component: fromExamples.InputEmailExampleReactiveFormComponent,
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
    name: 'Multi-Select Example Form',
    path: 'multi-select-example-form',
    component: fromExamples.MultiSelectExampleFormComponent,
  },
  {
    name: 'Multi-Select Example Reactive Form',
    path: 'multi-select-example-reactive-form',
    component: fromExamples.MultiSelectExampleReactiveFormComponent,
  },
  {
    name: 'Multi Select Example Async',
    path: 'multi-select-example-async-filter',
    component: fromExamples.MultiSelectExampleAsyncFilterComponent,
  },
  {
    name: 'Multi Select Example Selected Slot',
    path: 'multi-select-example-selected-slot',
    component: fromExamples.MultiSelectExampleSelectedSlotComponent,
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
    name: 'Pin Code Example Form',
    path: 'pin-code-example-form',
    component: fromExamples.PinCodeExampleFormComponent,
  },
  {
    name: 'Pin Code Example Reactive Form',
    path: 'pin-code-example-reactive-form',
    component: fromExamples.PinCodeExampleReactiveFormComponent,
  },
  {
    name: 'Radio Group Example',
    path: 'radio-group-example',
    component: fromExamples.RadioGroupExampleComponent,
  },
  {
    name: 'Radio Group Example Controlled',
    path: 'radio-group-example-controlled',
    component: fromExamples.RadioGroupExampleControlledComponent,
  },
  {
    name: 'Radio Group Example Form',
    path: 'radio-group-example-form',
    component: fromExamples.RadioGroupExampleFormComponent,
  },
  {
    name: 'Radio Group Example Reactive Form',
    path: 'radio-group-example-reactive-form',
    component: fromExamples.RadioGroupExampleReactiveFormComponent,
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
    name: 'Segmented Control Example Form',
    path: 'segmented-control-example-form',
    component: fromExamples.SegmentedControlExampleFormComponent,
  },
  {
    name: 'Segmented Control Example Reactive Form',
    path: 'segmented-control-example-reactive-form',
    component: fromExamples.SegmentedControlExampleReactiveFormComponent,
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
    name: 'Select Example Form',
    path: 'select-example-form',
    component: fromExamples.SelectExampleFormComponent,
  },
  {
    name: 'Select Example Reactive Form',
    path: 'select-example-reactive-form',
    component: fromExamples.SelectExampleReactiveFormComponent,
  },
  {
    name: 'Select Example Required',
    path: 'select-example-required',
    component: fromExamples.SelectExampleRequiredComponent,
  },
  {
    name: 'Select Example Async',
    path: 'select-example-async-filter',
    component: fromExamples.SelectExampleAsyncFilterComponent,
  },
  {
    name: 'Select Example Selected Slot',
    path: 'select-example-selected-slot',
    component: fromExamples.SelectExampleSelectedSlotComponent,
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
    path: 'textarea-example-controlled',
    component: fromExamples.TextareaExampleControlledComponent,
  },
  {
    name: 'Textarea Example Form',
    path: 'textarea-example-form',
    component: fromExamples.TextareaExampleFormComponent,
  },
  {
    name: 'Textarea Example Reactive Form',
    path: 'textarea-example-reactive-form',
    component: fromExamples.TextareaExampleReactiveFormComponent,
  },
  {
    name: 'Toast Example',
    path: 'toast-example',
    component: fromExamples.ToastExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
