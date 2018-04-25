import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {PuiE2eRoutingModule} from './pui-e2e-routing.module';

import { PuiE2eComponent } from './pui-e2e.component';
import {PuiTextModule, PuiIconModule} from '../public_api';
import {PuiE2eAtomsTextSizeComponent} from './pages/atoms/text/text-size.component';
import { PuiE2eAtomsIconComponent } from './pages/atoms/icon/icon.component';


@NgModule({
  declarations: [
    PuiE2eComponent,
    PuiE2eAtomsTextSizeComponent,
    PuiE2eAtomsIconComponent
  ],
  imports: [
    BrowserModule,
    PuiE2eRoutingModule,
    PuiTextModule,
    PuiIconModule
  ],
  bootstrap: [PuiE2eComponent]
})
export class PuiE2eModule { }
