import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PuiBaseComponent } from './pui-base.component';

const components = [PuiBaseComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components
})
export class PuiSharedModule {}
