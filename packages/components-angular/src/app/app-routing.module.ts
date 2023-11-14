import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import * as fromPages from './pages';
import * as fromExamples from './examples';
import * as fromStyles from './styles';

export type ExtendedRoute = Route & {
  name: string;
  isDisabled?: boolean;
};

export const routes: ExtendedRoute[] = [
  ...[...fromPages.generatedRoutes].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
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
    name: 'Overview Notifications',
    path: 'overview-notifications',
    component: fromPages.OverviewNotificationsComponent,
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
    name: 'Carousel Example Dynamic Slides',
    path: 'carousel-example-dynamic-slides',
    component: fromExamples.CarouselExampleDynamicSlidesComponent,
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
    name: 'Modal Example Accessibility',
    path: 'modal-example-accessibility',
    component: fromExamples.ModalExampleAccessibilityComponent,
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
    name: 'Text Field Wrapper Example IMask',
    path: 'text-field-wrapper-example-imask',
    component: fromExamples.TextFieldWrapperExampleImaskComponent,
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
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
