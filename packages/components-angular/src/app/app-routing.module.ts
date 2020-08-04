import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromPages from './pages';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'basic',
    pathMatch: 'full'
  },
  {
    path: 'basic',
    component: fromPages.BasicComponent
  },
  {
    path: 'action',
    component: fromPages.ActionComponent
  },
  {
    path: 'content',
    component: fromPages.ContentComponent
  },
  {
    path: 'form',
    component: fromPages.FormComponent
  },
  {
    path: 'feedback',
    component: fromPages.FeedbackComponent
  },
  {
    path: 'icon',
    component: fromPages.IconComponent
  },
  {
    path: 'layout',
    component: fromPages.LayoutComponent
  },
  {
    path: 'navigation',
    component: fromPages.NavigationComponent
  },
  {
    path: 'overview-prefixed',
    component: fromPages.OverviewPrefixedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
