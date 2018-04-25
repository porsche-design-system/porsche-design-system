import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  PuiIconComponent,
  PuiIconDirective
} from './icon';

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
