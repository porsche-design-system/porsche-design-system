import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {PuiE2eRoutingModule} from './pui-e2e-routing.module';

import { PuiE2eComponent } from './pui-e2e.component';
import {PuiTextModule} from '../public_api';
import {PuiE2eAtomsTextSizeComponent} from './pages/atoms/text/text-size.component';
import {PuiLinkIconTextModule} from "../public_api";
import {PuiE2eMoleculesLinkIconTextComponent} from "./pages/molecules/link-icon-text/link-icon-text.component";


@NgModule({
  declarations: [
    PuiE2eComponent,
    PuiE2eAtomsTextSizeComponent,
    PuiE2eMoleculesLinkIconTextComponent
  ],
  imports: [
    BrowserModule,
    PuiE2eRoutingModule,
    PuiTextModule,
    PuiLinkIconTextModule
  ],
  bootstrap: [PuiE2eComponent]
})
export class PuiE2eModule { }
