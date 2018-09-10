import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuiPageHeaderComponent } from './page-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PuiPageHeaderComponent],
  exports: [PuiPageHeaderComponent]
})
export class PuiPageHeaderModule {
}
