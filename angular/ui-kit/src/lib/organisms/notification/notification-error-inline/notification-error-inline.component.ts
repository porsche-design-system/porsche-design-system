import {Component, OnInit, Input} from '@angular/core';
import {PuiBaseComponent} from '../../../shared';

@Component({
  selector: 'pui-notification-error-inline',
  templateUrl: './notification-error-inline.component.html',
  styleUrls: ['../../../../../node_modules/@porsche/ui-kit-core/src/modules/notification/notification-error-inline.scss']
})
export class PuiNotificationErrorInlineComponent extends PuiBaseComponent {
  @Input() message: string;
}
