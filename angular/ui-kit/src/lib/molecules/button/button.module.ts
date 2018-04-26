import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PuiButtonGhostComponent} from './button-ghost/button-ghost.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PuiButtonGhostComponent],
  exports:[PuiButtonGhostComponent]
})
export class PuiButtonModule {
}
