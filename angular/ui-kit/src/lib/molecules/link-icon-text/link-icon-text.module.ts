import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  PuiLinkIconTextComponent,
} from './index';
import {PuiIconModule} from "../../atoms/icon";

@NgModule({
  imports: [
    CommonModule,
    PuiIconModule
  ],
  declarations: [PuiLinkIconTextComponent]
})
export class PuiLinkIconTextModule {
}
