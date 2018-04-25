import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PuiE2eAtomsTextSizeComponent} from './pages/atoms/text/text-size.component';
import {PuiLinkIconTextComponent} from "../lib/molecules/link-icon-text";

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
          }
        ]
      },
      {
        path: 'molecules',
        children: [
          {
            path: 'link-icon-text',
            component: PuiLinkIconTextComponent
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
