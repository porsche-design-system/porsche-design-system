import { RouteProps } from 'react-router-dom';
import * as fromPages from './pages';
import * as fromExamples from './examples';

export type RouteType = RouteProps & {
  name: string;
  path?: string; // override string | string[]
  isDisabled?: boolean;
};

export const routes: RouteType[] = [
  {
    name: 'Accordion',
    path: '/accordion',
    component: fromPages.AccordionPage,
  },
  {
    name: 'Banner',
    path: '/banner',
    component: fromPages.BannerPage,
  },
  {
    name: 'Button',
    path: '/button',
    component: fromPages.ButtonPage,
  },
  {
    name: 'Button Group',
    path: '/button-group',
    component: fromPages.ButtonGroupPage,
  },
  {
    name: 'Button Pure',
    path: '/button-pure',
    component: fromPages.ButtonPurePage,
  },
  {
    name: 'Checkbox',
    path: '/checkbox-wrapper',
    component: fromPages.CheckboxWrapperPage,
  },
  {
    name: 'Content Wrapper',
    path: '/content-wrapper',
    component: fromPages.ContentWrapperPage,
  },
  {
    name: 'Divider',
    path: '/divider',
    component: fromPages.DividerPage,
  },
  {
    name: 'Fieldset',
    path: '/fieldset-wrapper',
    component: fromPages.FieldsetWrapperPage,
  },
  {
    name: 'Flex',
    path: '/flex',
    component: fromPages.FlexPage,
  },
  {
    name: 'Grid',
    path: '/grid',
    component: fromPages.GridPage,
  },
  {
    name: 'Headline',
    path: '/headline',
    component: fromPages.HeadlinePage,
  },
  {
    name: 'Icon',
    path: '/icon',
    component: fromPages.IconPage,
  },
  {
    name: 'Inline Notification',
    path: '/inline-notification',
    component: fromPages.InlineNotificationPage,
  },
  {
    name: 'Link',
    path: '/link',
    component: fromPages.LinkPage,
  },
  {
    name: 'Link Pure',
    path: '/link-pure',
    component: fromPages.LinkPurePage,
  },
  {
    name: 'Link Social',
    path: '/link-social',
    component: fromPages.LinkSocialPage,
  },
  {
    name: 'Marque',
    path: '/marque',
    component: fromPages.MarquePage,
  },
  {
    name: 'Modal Basic',
    path: '/modal-basic',
    component: fromPages.ModalBasicPage,
  },
  {
    name: 'Modal Fullscreen',
    path: '/modal-fullscreen',
    component: fromPages.ModalFullscreenPage,
  },
  {
    name: 'Modal Fullscreen Breakpoint',
    path: '/modal-fullscreen-breakpoint',
    component: fromPages.ModalFullscreenBreakpointPage,
  },
  {
    name: 'Modal Full Width Slot',
    path: '/modal-full-width-slot',
    component: fromPages.ModalFullWidthSlot,
  },
  {
    name: 'Modal No Heading',
    path: '/modal-no-heading',
    component: fromPages.ModalNoHeading,
  },
  {
    name: 'Modal Prefixed',
    path: '/modal-prefixed',
    component: fromPages.ModalPrefixedPage,
  },
  {
    name: 'Modal Scrollable',
    path: '/modal-scrollable',
    component: fromPages.ModalScrollablePage,
  },
  {
    name: 'Pagination',
    path: '/pagination',
    component: fromPages.PaginationPage,
  },
  {
    name: 'Popover',
    path: '/popover',
    component: fromPages.PopoverPage,
  },
  {
    name: 'Radio Button',
    path: '/radio-button-wrapper',
    component: fromPages.RadioButtonWrapperPage,
  },
  {
    name: 'Select',
    path: '/select-wrapper',
    component: fromPages.SelectWrapperPage,
  },
  {
    name: 'Spinner',
    path: '/spinner',
    component: fromPages.SpinnerPage,
  },
  {
    name: 'Switch',
    path: '/switch',
    component: fromPages.SwitchPage,
  },
  {
    name: 'Table',
    path: '/table',
    component: fromPages.TablePage,
  },
  {
    name: 'Tabs',
    path: '/tabs',
    component: fromPages.TabsPage,
  },
  {
    name: 'Tabs Bar',
    path: '/tabs-bar',
    component: fromPages.TabsBarPage,
  },
  {
    name: 'Text',
    path: '/text',
    component: fromPages.TextPage,
  },
  {
    name: 'Text Field',
    path: '/text-field-wrapper',
    component: fromPages.TextFieldWrapperPage,
  },
  {
    name: 'Text List',
    path: '/text-list',
    component: fromPages.TextListPage,
  },
  {
    name: 'Textarea',
    path: '/textarea-wrapper',
    component: fromPages.TextareaWrapperPage,
  },
  {
    name: 'Toast Basic',
    path: '/toast-basic',
    component: fromPages.ToastBasicPage,
  },
  {
    name: 'Toast Basic Dark',
    path: '/toast-basic-dark',
    component: fromPages.ToastBasicDarkPage,
  },
  {
    name: 'Toast Basic Long Text',
    path: '/toast-basic-long-text',
    component: fromPages.ToastBasicLongTextPage,
  },
  {
    name: 'Toast Offset',
    path: '/toast-offset',
    component: fromPages.ToastOffsetPage,
  },
  {
    name: 'Toast Prefixed',
    path: '/toast-prefixed',
    component: fromPages.ToastPrefixedPage,
  },
  {
    name: 'Typography Fallback Strategy',
    path: '/typography-fallback-strategy',
    component: fromPages.TypographyFallbackStrategyPage,
  },
  {
    name: 'Typography Latin',
    component: fromPages.TypographyLatinPage,
    path: '/typography-latin',
  },
  {
    name: 'Typography Greek & Coptic',
    component: fromPages.TypographyGreekAndCopticPage,
    path: '/typography-greek-and-coptic',
  },
  {
    name: 'Typography Cyril',
    component: fromPages.TypographyCyrilPage,
    path: '/typography-cyril',
  },
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
    name: 'Toast Example',
    path: '/toast-example',
    component: fromExamples.ToastExamplePage,
  },
];
