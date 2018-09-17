import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PuiE2eRoutingModule } from './pui-e2e-routing.module';

import { PuiE2eComponent } from './pui-e2e.component';
import {
  PuiTextModule,
  PuiIconModule,
  PuiNotificationModule,
  PuiLinkIconTextModule,
  PuiImageCoverModule,
  PuiLoaderModule,
  PuiButtonModule,
  PuiFooterModule,
  PuiPageHeaderModule,
  PuiInputModule,
  PuiCalloutModule
} from '../public_api';
import { PuiE2eAtomsTextSizeComponent } from './pages/atoms/text/text-size.component';
import { PuiE2eAtomsIconComponent } from './pages/atoms/icon/icon.component';
import { PuiE2eOrganismsNotificationComponent } from './pages/organisms/notification/notification.component';
import { PuiE2eOrganismsFooterComponent } from './pages/organisms/footer/footer.component';
import { PuiE2eOrganismsPageHeaderComponent } from './pages/organisms/page-header/page-header.component';
import { PuiE2eMoleculesLinkIconTextComponent } from './pages/molecules/link-icon-text/link-icon-text.component';
import { PuiE2eMoleculesImageCoverComponent } from './pages/molecules/image-cover/image.cover.component';
import { PuiE2eMoleculesLoaderBaseComponent } from './pages/molecules/loader-base/loader-base-component';
import { PuiE2eMoleculesButtonPrimaryComponent } from './pages/molecules/button/button-primary/button-primary.component';
import { PuiE2eMoleculesButtonGhostComponent } from './pages/molecules/button/button-ghost/button-ghost.component';
import { PuiE2eMoleculesFormInputComponent } from './pages/molecules/form/input/input.component';
import { PuiE2eMoleculesCalloutComponent } from './pages/molecules/callout/callout.component';

const puiModules = [
  PuiE2eRoutingModule,
  PuiTextModule,
  PuiIconModule,
  PuiNotificationModule,
  PuiIconModule,
  PuiLinkIconTextModule,
  PuiImageCoverModule,
  PuiLoaderModule,
  PuiButtonModule,
  PuiFooterModule,
  PuiPageHeaderModule,
  PuiInputModule,
  PuiCalloutModule
];

const e2ePages = [
  PuiE2eAtomsTextSizeComponent,
  PuiE2eAtomsIconComponent,
  PuiE2eMoleculesLinkIconTextComponent,
  PuiE2eMoleculesImageCoverComponent,
  PuiE2eMoleculesLoaderBaseComponent,
  PuiE2eMoleculesButtonGhostComponent,
  PuiE2eMoleculesButtonPrimaryComponent,
  PuiE2eOrganismsNotificationComponent,
  PuiE2eOrganismsFooterComponent,
  PuiE2eOrganismsPageHeaderComponent,
  PuiE2eMoleculesFormInputComponent,
  PuiE2eMoleculesCalloutComponent
];

@NgModule({
  declarations: [PuiE2eComponent, ...e2ePages],
  imports: [BrowserModule, ...puiModules],
  bootstrap: [PuiE2eComponent]
})
export class PuiE2eModule {}
