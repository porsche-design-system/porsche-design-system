import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasicComponent } from "./pages/basic/basic.component";
import { ActionComponent } from "./pages/action/action.component";
import { FormComponent } from "./pages/form/form.component";
import { FeedbackComponent } from "./pages/feedback/feedback.component";
import { IconComponent } from "./pages/icon/icon.component";
import { LayoutComponent } from "./pages/layout/layout.component";
import { NavigationComponent } from "./pages/navigation/navigation.component";

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
