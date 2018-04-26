import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PuiButtonGhostComponent} from './button-ghost/button-ghost.component';
import {PuiLoaderModule} from "../loader";
import {PuiIconModule} from "../../atoms/icon";

@NgModule({
  imports: [
    CommonModule,
    PuiLoaderModule,
    PuiIconModule
  ],
  declarations: [PuiButtonGhostComponent],
  exports:[PuiButtonGhostComponent]
})
export class PuiButtonModule {
}
