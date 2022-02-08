import { RouteProps } from 'react-router-dom';
import * as fromPages from './pages';
import * as fromExamples from './examples';

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
      component: fromPages.TablePage,
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
    component: fromPages.OverviewPage,
  },
  {
    name: 'Core Initializer',
    path: '/core-initializer',
    component: fromPages.CoreInitializerPage,
  },
  {
    name: 'Core Class Names',
    path: '/core-class-names',
    component: fromPages.CoreClassNamesPage,
  },
  {
    name: 'Events',
    path: '/events',
    component: fromPages.EventsPage,
  },
  {
    name: 'Stencil Lifecycle',
    path: '/stencil-lifecycles',
    component: fromPages.StencilLifecyclesPage,
  },
  {
    name: '---',
    isDisabled: true,
  },
  {
    name: 'Accordion Example',
    path: '/accordion-example',
    component: fromExamples.AccordionExamplePage,
  },
  {
    name: 'Inline Notification Example Events',
    path: '/inline-notification-example-events',
    component: fromExamples.InlineNotificationExampleEventsPage,
  },
  {
    name: 'Inline Notification Example Action Button',
    path: '/inline-notification-example-action-button',
    component: fromExamples.InlineNotificationExampleActionButtonPage,
  },
  {
    name: 'Table Example Basic',
    path: '/table-example-basic',
    component: fromExamples.TableExampleBasicPage,
  },
  {
    name: 'Table Example Sorting',
    path: '/table-example-sorting',
    component: fromExamples.TableExampleSortingPage,
  },
  {
    name: 'Table Example Advanced',
    path: '/table-example-advanced',
    component: fromExamples.TableExampleAdvancedPage,
  },
  {
    name: 'Tabs Bar Example',
    path: '/tabs-bar-example',
    component: fromExamples.TabsBarExamplePage,
  },
  {
    name: 'Toast Example',
    path: '/toast-example',
    component: fromExamples.ToastExamplePage,
  },
];
