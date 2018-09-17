import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuiCalloutComponent } from './callout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PuiCalloutComponent],
  exports: [PuiCalloutComponent]
})
export class PuiCalloutModule { }
