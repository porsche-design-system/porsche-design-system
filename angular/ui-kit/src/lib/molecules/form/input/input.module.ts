import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiInputComponent } from './input.component';
import { PuiIconModule } from '../../../atoms/index';

@NgModule({
  imports: [CommonModule, FormsModule, PuiIconModule],
  declarations: [PuiInputComponent],
  exports: [PuiInputComponent]
})
export class PuiInputModule {}
