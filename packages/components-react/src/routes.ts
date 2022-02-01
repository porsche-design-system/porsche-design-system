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
    /* Auto Generated Start */
    {
      name: 'Accordion',
      component: fromPages.AccordionPage,
      path: '/accordion',
    },
    {
      name: 'Banner',
      component: fromPages.BannerPage,
      path: '/banner',
    },
    {
      name: 'Button',
      component: fromPages.ButtonPage,
      path: '/button',
    },
    {
      name: 'Button Group',
      component: fromPages.ButtonGroupPage,
      path: '/button-group',
    },
    {
      name: 'Button Pure',
      component: fromPages.ButtonPurePage,
      path: '/button-pure',
    },
    {
      name: 'Checkbox Wrapper',
      component: fromPages.CheckboxWrapperPage,
      path: '/checkbox-wrapper',
    },
    {
      name: 'Content Wrapper',
      component: fromPages.ContentWrapperPage,
      path: '/content-wrapper',
    },
    {
      name: 'Core Initializer',
      component: fromPages.CoreInitializerPage,
      path: '/core-initializer',
    },
    {
      name: 'Divider',
      component: fromPages.DividerPage,
      path: '/divider',
    },
    {
      name: 'Fieldset Wrapper',
      component: fromPages.FieldsetWrapperPage,
      path: '/fieldset-wrapper',
    },
    {
      name: 'Flex',
      component: fromPages.FlexPage,
      path: '/flex',
    },
    {
      name: 'Grid',
      component: fromPages.GridPage,
      path: '/grid',
    },
    {
      name: 'Headline',
      component: fromPages.HeadlinePage,
      path: '/headline',
    },
    {
      name: 'Icon',
      component: fromPages.IconPage,
      path: '/icon',
    },
    {
      name: 'Inline Notification',
      component: fromPages.InlineNotificationPage,
      path: '/inline-notification',
    },
    {
      name: 'Link',
      component: fromPages.LinkPage,
      path: '/link',
    },
    {
      name: 'Link Pure',
      component: fromPages.LinkPurePage,
      path: '/link-pure',
    },
    {
      name: 'Link Social',
      component: fromPages.LinkSocialPage,
      path: '/link-social',
    },
    {
      name: 'Marque',
      component: fromPages.MarquePage,
      path: '/marque',
    },
    {
      name: 'Modal Basic',
      component: fromPages.ModalBasicPage,
      path: '/modal-basic',
    },
    {
      name: 'Modal Fullscreen',
      component: fromPages.ModalFullscreenPage,
      path: '/modal-fullscreen',
    },
    {
      name: 'Modal Fullscreen Breakpoint',
      component: fromPages.ModalFullscreenBreakpointPage,
      path: '/modal-fullscreen-breakpoint',
    },
    {
      name: 'Modal Full Width Slot',
      component: fromPages.ModalFullWidthSlotPage,
      path: '/modal-full-width-slot',
    },
    {
      name: 'Modal No Heading',
      component: fromPages.ModalNoHeadingPage,
      path: '/modal-no-heading',
    },
    {
      name: 'Modal Prefixed',
      component: fromPages.ModalPrefixedPage,
      path: '/modal-prefixed',
    },
    {
      name: 'Modal Scrollable',
      component: fromPages.ModalScrollablePage,
      path: '/modal-scrollable',
    },
    {
      name: 'Modal Slotted Heading',
      component: fromPages.ModalSlottedHeadingPage,
      path: '/modal-slotted-heading',
    },
    {
      name: 'Overview',
      component: fromPages.OverviewPage,
      path: '/overview',
    },
    {
      name: 'Pagination',
      component: fromPages.PaginationPage,
      path: '/pagination',
    },
    {
      name: 'Popover',
      component: fromPages.PopoverPage,
      path: '/popover',
    },
    {
      name: 'Radio Button Wrapper',
      component: fromPages.RadioButtonWrapperPage,
      path: '/radio-button-wrapper',
    },
    {
      name: 'Select Wrapper',
      component: fromPages.SelectWrapperPage,
      path: '/select-wrapper',
    },
    {
      name: 'Spinner',
      component: fromPages.SpinnerPage,
      path: '/spinner',
    },
    {
      name: 'Switch',
      component: fromPages.SwitchPage,
      path: '/switch',
    },
    {
      name: 'Tabs',
      component: fromPages.TabsPage,
      path: '/tabs',
    },
    {
      name: 'Tabs Bar',
      component: fromPages.TabsBarPage,
      path: '/tabs-bar',
    },
    {
      name: 'Text',
      component: fromPages.TextPage,
      path: '/text',
    },
    {
      name: 'Textarea Wrapper',
      component: fromPages.TextareaWrapperPage,
      path: '/textarea-wrapper',
    },
    {
      name: 'Text Field Wrapper',
      component: fromPages.TextFieldWrapperPage,
      path: '/text-field-wrapper',
    },
    {
      name: 'Text List',
      component: fromPages.TextListPage,
      path: '/text-list',
    },
    {
      name: 'Toast Basic',
      component: fromPages.ToastBasicPage,
      path: '/toast-basic',
    },
    {
      name: 'Toast Basic Dark',
      component: fromPages.ToastBasicDarkPage,
      path: '/toast-basic-dark',
    },
    {
      name: 'Toast Basic Long Text',
      component: fromPages.ToastBasicLongTextPage,
      path: '/toast-basic-long-text',
    },
    {
      name: 'Toast Offset',
      component: fromPages.ToastOffsetPage,
      path: '/toast-offset',
    },
    {
      name: 'Toast Prefixed',
      component: fromPages.ToastPrefixedPage,
      path: '/toast-prefixed',
    },
    {
      name: 'Typography Cyril',
      component: fromPages.TypographyCyrilPage,
      path: '/typography-cyril',
    },
    {
      name: 'Typography Fallback Strategy',
      component: fromPages.TypographyFallbackStrategyPage,
      path: '/typography-fallback-strategy',
    },
    {
      name: 'Typography Greek And Coptic',
      component: fromPages.TypographyGreekAndCopticPage,
      path: '/typography-greek-and-coptic',
    },
    {
      name: 'Typography Latin',
      component: fromPages.TypographyLatinPage,
      path: '/typography-latin',
    },
    /* Auto Generated End */
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
