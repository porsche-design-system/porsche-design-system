import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PuiLoaderBaseComponent} from './loader-base/loader-base.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PuiLoaderBaseComponent],
  exports: [PuiLoaderBaseComponent]
})
export class PuiLoaderModule {
}
