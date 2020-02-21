import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {AppBasicComponent} from "./app-basic/app-basic.component";
import {AppActionComponent} from "./app-action/app-action.component";
import {AppFeedbackComponent} from "./app-feedback/app-feedback.component";
import {AppIconComponent} from "./app-icon/app-icon.component";
import {AppLayoutComponent} from "./app-layout/app-layout.component";
import {AppNavigationComponent} from "./app-navigation/app-navigation.component";

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  },
  {
    path: 'basic',
    component: AppBasicComponent
  },
  {
    path: 'action',
    component: AppActionComponent
  },
  {
    path: 'feedback',
    component: AppFeedbackComponent
  },
  {
    path: 'icon',
    component: AppIconComponent
  },
  {
    path: 'layout',
    component: AppLayoutComponent
  },
  {
    path: 'navigation',
    component: AppNavigationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
