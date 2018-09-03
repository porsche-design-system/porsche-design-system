import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuiInputComponent } from './input.component';
import { PuiIconModule } from '../../../atoms/index';

@NgModule({
  imports: [CommonModule, PuiIconModule],
  declarations: [PuiInputComponent],
  exports: [PuiInputComponent]
})
export class PuiInputModule {}
