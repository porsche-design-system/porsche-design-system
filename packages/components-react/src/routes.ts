import { RouteProps } from 'react-router-dom';
import * as fromPages from './pages';

export type RouteType = RouteProps & {
  name: string;
  path: string; // override string | string[]
};

export const routes: RouteType[] = [
  {
    name: 'Button',
    path: '/button',
    component: fromPages.ButtonPage
  },
  {
    name: 'Button Pure',
    path: '/button-pure',
    component: fromPages.ButtonPurePage
  },
  {
    name: 'Checkbox',
    path: '/checkbox-wrapper',
    component: fromPages.CheckboxWrapperPage
  },
  {
    name: 'Content Wrapper',
    path: '/content-wrapper',
    component: fromPages.ContentWrapperPage
  },
  {
    name: 'Divider',
    path: '/divider',
    component: fromPages.DividerPage
  },
  {
    name: 'Fieldset',
    path: '/fieldset-wrapper',
    component: fromPages.FieldsetWrapperPage
  },
  {
    name: 'Flex',
    path: '/flex',
    component: fromPages.FlexPage
  },
  {
    name: 'Grid',
    path: '/grid',
    component: fromPages.GridPage
  },
  {
    name: 'Headline',
    path: '/headline',
    component: fromPages.HeadlinePage
  },
  {
    name: 'Icon',
    path: '/icon',
    component: fromPages.IconPage
  },
  {
    name: 'Link',
    path: '/link',
    component: fromPages.LinkPage
  },
  {
    name: 'LinkPure',
    path: '/link-pure',
    component: fromPages.LinkPurePage
  },
  {
    name: 'LinkSocial',
    path: '/link-social',
    component: fromPages.LinkSocialPage
  },
  {
    name: 'Marque',
    path: '/marque',
    component: fromPages.MarquePage
  },
  {
    name: 'Overview',
    path: '/overview',
    component: fromPages.OverviewPage
  },
  {
    name: 'Pagination',
    path: '/pagination',
    component: fromPages.PaginationPage
  },
  {
    name: 'Radio Button',
    path: '/radio-button-wrapper',
    component: fromPages.RadioButtonWrapperPage
  },
  {
    name: 'Select',
    path: '/select-wrapper',
    component: fromPages.SelectWrapperPage
  }
];
