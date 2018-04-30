import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  PuiTextSize1Component,
  PuiTextSize1Directive
} from './text-size-1';

import {
  PuiTextSize3Component,
  PuiTextSize3Directive
} from './text-size-3';

const declarations = [
  PuiTextSize1Component,
  PuiTextSize1Directive,
  PuiTextSize3Component,
  PuiTextSize3Directive
];

@NgModule({
  imports: [CommonModule],
  declarations: declarations,
  exports: declarations
})
export class PuiTextModule {}
