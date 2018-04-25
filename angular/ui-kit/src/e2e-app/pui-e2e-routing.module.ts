import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PuiE2eAtomsTextSizeComponent} from './pages/atoms/text/text-size.component';
import { PuiE2eAtomsIconComponent } from './pages/atoms/icon/icon.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'atoms',
        children: [
          {
            path: 'text',
            children: [
              {
                path: 'text-size',
                component: PuiE2eAtomsTextSizeComponent
              }
            ]
          },
          {
            path: 'icon',
            component: PuiE2eAtomsIconComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/atoms/text'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PuiE2eRoutingModule {
}
