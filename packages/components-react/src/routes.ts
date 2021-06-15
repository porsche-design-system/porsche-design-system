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
    name: 'Typography',
    path: '/typography',
    component: fromPages.TypographyPage,
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
    name: '---',
    isDisabled: true,
  },
  {
    name: 'Table Example',
    path: '/table-example',
    component: fromExamples.TableExamplePage,
  },
];
