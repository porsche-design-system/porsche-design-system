import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import * as fromPages from './pages';
import * as fromExamples from './examples';

export type ExtendedRoute = Route & {
  name?: string;
  isDisabled?: boolean;
};

export const routes: ExtendedRoute[] = [
  {
    path: '',
    children: [],
    pathMatch: 'full',
  },
  ...[
    {
      name: 'Table',
      path: 'table',
      component: fromPages.TableComponent,
    },
    ...fromPages.generatedRoutes,
  ].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
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
    name: 'Inline Notification Example Events',
    path: 'inline-notification-example-events',
    component: fromExamples.InlineNotificationExampleEventsComponent,
  },
  {
    name: 'Inline Notification Example Action Button',
    path: 'inline-notification-example-action-button',
    component: fromExamples.InlineNotificationExampleActionButtonComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
