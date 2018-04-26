import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {PuiE2eRoutingModule} from './pui-e2e-routing.module';

import { PuiE2eComponent } from './pui-e2e.component';
import {PuiTextModule, PuiIconModule, PuiLinkIconTextModule, PuiImageCoverModule} from '../public_api';
import {PuiE2eAtomsTextSizeComponent} from './pages/atoms/text/text-size.component';
import { PuiE2eAtomsIconComponent } from './pages/atoms/icon/icon.component';
import {PuiE2eMoleculesLinkIconTextComponent} from "./pages/molecules/link-icon-text/link-icon-text.component";
import {PuiE2eMoleculesImageCoverComponent} from "./pages/molecules/image-cover/image.cover.component";


@NgModule({
  declarations: [
    PuiE2eComponent,
    PuiE2eAtomsTextSizeComponent,
    PuiE2eAtomsIconComponent,
    PuiE2eMoleculesLinkIconTextComponent,
    PuiE2eMoleculesImageCoverComponent
  ],
  imports: [
    BrowserModule,
    PuiE2eRoutingModule,
    PuiTextModule,
    PuiIconModule,
    PuiLinkIconTextModule,
    PuiImageCoverModule
  ],
  bootstrap: [PuiE2eComponent]
})
export class PuiE2eModule { }
