import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PuiLinkIconTextComponent} from './link-icon-text.component';
import {PuiIconModule} from '../../../atoms/icon/index';

@NgModule({
  imports: [
    CommonModule,
    PuiIconModule
  ],
  declarations: [PuiLinkIconTextComponent],
  exports: [PuiLinkIconTextComponent]
})
export class PuiLinkIconTextModule {
}
