import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuiLoaderModule } from '../loader/index';
import { PuiIconModule } from '../../atoms/icon/index';
import { PuiButtonGhostComponent } from './button-ghost/button-ghost.component';
import { PuiButtonPrimaryComponent } from './button-primary/button-primary.component';


const components = [PuiButtonGhostComponent, PuiButtonPrimaryComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    PuiLoaderModule,
    PuiIconModule
  ]
})
export class PuiButtonModule {
}
