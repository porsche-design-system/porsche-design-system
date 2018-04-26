import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PuiButtonGhostComponent} from './button-ghost/button-ghost.component';
import { PuiButtonPrimaryComponent } from './button-primary';

const components = [PuiButtonGhostComponent, PuiButtonPrimaryComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components
})
export class PuiButtonModule {
}
