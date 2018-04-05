import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {PuiE2eRoutingModule} from './pui-e2e-routing.module';

import { PuiE2eComponent } from './pui-e2e.component';
import {PuiTextModule} from '../public_api';
import {PuiE2eAtomsTextComponent} from './pages/atoms/text/text';


@NgModule({
  declarations: [
    PuiE2eComponent,
    PuiE2eAtomsTextComponent
  ],
  imports: [
    BrowserModule,
    PuiE2eRoutingModule,
    PuiTextModule
  ],
  bootstrap: [PuiE2eComponent]
})
export class PuiE2eModule { }
