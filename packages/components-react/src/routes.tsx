import { RouteProps } from 'react-router-dom';
import * as fromPages from './pages';
import * as fromExamples from './examples';
import { SegmentedControlExamplePage } from './examples/SegmentedControlExample';

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
    name: 'Inline Notification Example Events',
    path: '/inline-notification-example-events',
    element: <fromExamples.InlineNotificationExampleEventsPage />,
  },
  {
    name: 'Inline Notification Example Action Button',
    path: '/inline-notification-example-action-button',
    element: <fromExamples.InlineNotificationExampleActionButtonPage />,
  },
  {
    name: 'Segmented Control Example',
    path: '/segmented-control-example',
    element: <fromExamples.SegmentedControlExamplePage />,
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
    name: 'Tabs Bar Example',
    path: '/tabs-bar-example',
    element: <fromExamples.TabsBarExamplePage />,
  },
  {
    name: 'Text Field Wrapper Example',
    path: '/text-field-wrapper-example',
    element: <fromExamples.TextFieldWrapperExamplePage />,
  },
  {
    name: 'Toast Example',
    path: '/toast-example',
    element: <fromExamples.ToastExamplePage />,
  },
];
