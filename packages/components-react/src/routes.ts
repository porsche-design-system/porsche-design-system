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
    name: 'Content',
    path: '/content',
    component: fromPages.ContentPage
  },
  {
    name: 'Form',
    path: '/form',
    component: fromPages.FormPage
  },
  {
    name: 'Feedback',
    path: '/feedback',
    component: fromPages.FeedbackPage
  },
  {
    name: 'Icon',
    path: '/icon',
    component: fromPages.IconPage
  },
  {
    name: 'Layout',
    path: '/layout',
    component: fromPages.LayoutPage
  },
  {
    name: 'Navigation',
    path: '/navigation',
    component: fromPages.NavigationPage
  },
  {
    name: 'Overview',
    path: '/overview',
    component: fromPages.OverviewPrefixedPage
  }
];
