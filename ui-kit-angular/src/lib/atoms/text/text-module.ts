import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  PuiHeadline1Component,
  PuiHeadline1Directive
} from './h1';

import {
  PuiHeadline2Component,
  PuiHeadline2Directive
} from './h2';

import {
  PuiHeadline3Component,
  PuiHeadline3Directive
} from './h3';

const declarations = [
  PuiHeadline1Component,
  PuiHeadline1Directive,
  PuiHeadline2Component,
  PuiHeadline2Directive,
  PuiHeadline3Component,
  PuiHeadline3Directive
];

@NgModule({
  imports: [CommonModule],
  declarations: declarations,
  exports: declarations
})
export class PuiTextModule {}
