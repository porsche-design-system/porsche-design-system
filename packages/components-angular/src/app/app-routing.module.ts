import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasicComponent } from "./pages/basic.component";
import { ActionComponent } from "./pages/action.component";
import { ContentComponent } from "./pages/content.component";
import { FormComponent } from './pages/form.component';
import { FeedbackComponent } from "./pages/feedback.component";
import { IconComponent } from "./pages/icon.component";
import { LayoutComponent } from "./pages/layout.component";
import { NavigationComponent } from "./pages/navigation.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'basic',
    pathMatch: 'full'
  },
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'action',
    component: ActionComponent
  },
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'icon',
    component: IconComponent
  },
  {
    path: 'layout',
    component: LayoutComponent
  },
  {
    path: 'navigation',
    component: NavigationComponent
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

export class AppRoutingModule {
}
