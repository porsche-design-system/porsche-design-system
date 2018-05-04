import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PuiTextSize1Component,
  PuiTextSize1Directive
} from './text-size-1/index';

import {
  PuiTextSize3Component,
  PuiTextSize3Directive
} from './text-size-3/index';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PuiTextSize1Component,
    PuiTextSize1Directive,
    PuiTextSize3Component,
    PuiTextSize3Directive
  ],
  exports: [
    PuiTextSize1Component,
    PuiTextSize1Directive,
    PuiTextSize3Component,
    PuiTextSize3Directive
  ]
})
export class PuiTextModule {
}
