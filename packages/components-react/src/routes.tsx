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
    name: 'Overview Notifications',
    path: '/overview-notifications',
    element: <fromPages.OverviewNotificationsPage />,
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
    name: 'Carousel Example Events',
    path: '/carousel-example-events',
    element: <fromExamples.CarouselExampleEventsPage />,
  },
  {
    name: 'Carousel Example Dynamic Slides',
    path: '/carousel-example-dynamic-slides',
    element: <fromExamples.CarouselExampleDynamicSlidesPage />,
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
    name: 'Modal Example Accessibility',
    path: '/modal-example-accessibility',
    element: <fromExamples.ModalExampleAccessibilityPage />,
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
    name: 'Utilities Border Example',
    path: '/utilities-border-example',
    element: <fromExamples.UtilitiesBorderExample />,
  },
  {
    name: 'Utilities Drop Shadow Example',
    path: '/utilities-drop-shadow-example',
    element: <fromExamples.UtilitiesDropShadowExample />,
  },
  {
    name: 'Utilities Focus Example',
    path: '/utilities-focus-example',
    element: <fromExamples.UtilitiesFocusExample />,
  },
  {
    name: 'Utilities Frosted Glass Example',
    path: '/utilities-frosted-glass-example',
    element: <fromExamples.UtilitiesFrostedGlassExample />,
  },
  {
    name: 'Utilities Gradient Example',
    path: '/utilities-gradient-example',
    element: <fromExamples.UtilitiesGradientExample />,
  },
  {
    name: 'Utilities Grid Example',
    path: '/utilities-grid-example',
    element: <fromExamples.UtilitiesGridExample />,
  },
  {
    name: 'Utilities Media Query Example',
    path: '/utilities-media-query-example',
    element: <fromExamples.UtilitiesMediaQueryExample />,
  },
  {
    name: 'Utilities Spacing Example',
    path: '/utilities-spacing-example',
    element: <fromExamples.UtilitiesSpacingExample />,
  },
  {
    name: 'Utilities Theme Example',
    path: '/utilities-theme-example',
    element: <fromExamples.UtilitiesThemeExample />,
  },
  {
    name: 'Utilities Typography Example',
    path: '/utilities-typography-example',
    element: <fromExamples.UtilitiesTypographyExample />,
  },
];
