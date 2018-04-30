import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuiImageCoverComponent } from './image-cover.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PuiImageCoverComponent],
  exports: [PuiImageCoverComponent]
})
export class PuiImageCoverModule {
}
