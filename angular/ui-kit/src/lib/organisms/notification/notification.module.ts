import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { PuiNotificationErrorInlineComponent } from './notification-error-inline';

const components = [PuiNotificationErrorInlineComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components
})
export class PuiNotificationModule {}
