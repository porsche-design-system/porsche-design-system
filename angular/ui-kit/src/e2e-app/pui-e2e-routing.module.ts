import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PuiE2eAtomsTextSizeComponent} from './pages/atoms/text/text-size.component';
import { PuiE2eAtomsIconComponent } from './pages/atoms/icon/icon.component';
import { PuiE2eOrganismsNotificationComponent } from './pages/organisms/notification/notification.component';
import {PuiE2eMoleculesLinkIconTextComponent} from './pages/molecules/link-icon-text/link-icon-text.component';
import {PuiE2eMoleculesImageCoverComponent} from './pages/molecules/image-cover/image.cover.component';
import {PuiE2eMoleculesLoaderBaseComponent} from './pages/molecules/loader-base/loader-base-component';
import { PuiE2eMoleculesButtonPrimaryComponent } from './pages/molecules/button/button-primary/button-primary.component';
import { PuiE2eMoleculesButtonGhostComponent } from './pages/molecules/button/button-ghost/button-ghost.component';

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
      },
      {
        path: 'molecules',
        children: [
          {
            path: 'button',
            children: [
              {
                path: 'button-ghost',
                component: PuiE2eMoleculesButtonGhostComponent
              },
              {
                path: 'button-primary',
                component: PuiE2eMoleculesButtonPrimaryComponent
              }
            ]
          },
          {
            path: 'image',
            children: [
              {
                path: 'image-cover',
                component: PuiE2eMoleculesImageCoverComponent
              }
            ]
          },
          {
            path: 'link',
            children: [
              {
                path: 'link-icon-text',
                component: PuiE2eMoleculesLinkIconTextComponent
              }
            ]
          },
          {
            path: 'loader',
            children: [
              {
                path: 'loader-base',
                component: PuiE2eMoleculesLoaderBaseComponent
              }
            ]
          }
        ]
      },
      {
        path: 'organisms',
        children: [
          {
            path: 'notification',
            children: [
              {
                path: 'notification-error-inline',
                component: PuiE2eOrganismsNotificationComponent
              }
            ]
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
