import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PuiFooterComponent } from './footer.component';

const components = [PuiFooterComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components
})
export class PuiFooterModule {}
