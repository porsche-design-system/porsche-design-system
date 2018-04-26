import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {PuiE2eRoutingModule} from './pui-e2e-routing.module';

import { PuiE2eComponent } from './pui-e2e.component';
import {PuiTextModule, PuiIconModule, PuiNotificationModule, PuiLinkIconTextModule, PuiImageCoverModule, PuiLoaderModule, PuiButtonModule} from '../public_api';
import {PuiE2eAtomsTextSizeComponent} from './pages/atoms/text/text-size.component';
import { PuiE2eAtomsIconComponent } from './pages/atoms/icon/icon.component';
import { PuiE2eOrganismsNotificationComponent } from './pages/organisms/notification/notification.component';
import {PuiE2eMoleculesLinkIconTextComponent} from "./pages/molecules/link-icon-text/link-icon-text.component";
import {PuiE2eMoleculesImageCoverComponent} from "./pages/molecules/image-cover/image.cover.component";
import {PuiE2eMoleculesLoaderBaseComponent} from "./pages/molecules/loader-base/loader-base-component";
import {PuiE2eMoleculesButtonGhostComponent} from "./pages/molecules/button/button-ghost/button-ghost.component";


@NgModule({
  declarations: [
    PuiE2eComponent,
    PuiE2eAtomsTextSizeComponent,
    PuiE2eOrganismsNotificationComponent,
    PuiE2eAtomsIconComponent,
    PuiE2eMoleculesLinkIconTextComponent,
    PuiE2eMoleculesImageCoverComponent,
    PuiE2eMoleculesLoaderBaseComponent,
    PuiE2eMoleculesButtonGhostComponent
  ],
  imports: [
    BrowserModule,
    PuiE2eRoutingModule,
    PuiTextModule,
    PuiIconModule,
    PuiNotificationModule,
    PuiIconModule,
    PuiLinkIconTextModule,
    PuiImageCoverModule,
    PuiLoaderModule,
    PuiButtonModule
  ],
  bootstrap: [PuiE2eComponent]
})
export class PuiE2eModule { }
