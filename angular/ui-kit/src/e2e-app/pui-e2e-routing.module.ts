import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PuiE2eAtomsTextComponent} from './pages/atoms/text/text';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'atoms',
        children: [
          {
            path: 'text',
            component: PuiE2eAtomsTextComponent
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
