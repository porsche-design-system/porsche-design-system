import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PuiIconComponent } from './icon.component';
import { PuiIconDirective } from './icon.directive';

const declarations = [
  PuiIconComponent,
  PuiIconDirective
];

@NgModule({
  imports: [CommonModule],
  declarations: declarations,
  exports: declarations
})
export class PuiIconModule {}
