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
    component: fromExamples.AccordionExample,
  },
  {
    name: 'Inline Notification Example Events',
    path: 'inline-notification-example-events',
    component: fromExamples.InlineNotificationExampleEvents,
  },
  {
    name: 'Inline Notification Example Action Button',
    path: 'inline-notification-example-action-button',
    component: fromExamples.InlineNotificationExampleActionButton,
  },
  {
    name: 'Segmented Control Example',
    path: 'segmented-control-example',
    component: fromExamples.SegmentedControlExample,
  },
  {
    name: 'Stepper Horizontal Example',
    path: 'stepper-horizontal-example',
    component: fromExamples.StepperHorizontalExample,
  },
  {
    name: 'Table Example Basic',
    path: 'table-example-basic',
    component: fromExamples.TableExampleBasic,
  },
  {
    name: 'Table Example Sorting',
    path: 'table-example-sorting',
    component: fromExamples.TableExampleSorting,
  },
  {
    name: 'Table Example Advanced',
    path: 'table-example-advanced',
    component: fromExamples.TableExampleAdvanced,
  },
  {
    name: 'Tabs Bar Example',
    path: 'tabs-bar-example',
    component: fromExamples.TabsBarExample,
  },
  {
    name: 'Text Field Wrapper Example',
    path: 'text-field-wrapper-example',
    component: fromExamples.TextFieldWrapperExample,
  },
  {
    name: 'Toast Example',
    path: 'toast-example',
    component: fromExamples.ToastExample,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
